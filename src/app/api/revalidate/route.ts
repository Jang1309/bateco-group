import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

import { CACHE_TAGS, type CacheTag } from '@/configs/cache'
import ENV from '@/configs/env'

export const runtime = 'nodejs'

type Body = {
  secret?: string
  /** Cache tags to invalidate. Use `cms` to purge all tagged CMS fetches. */
  tags?: string[]
  /** App paths to invalidate, e.g. `/`, `/tin-tuc`, `/en/news`. */
  paths?: string[]
}

const KNOWN_TAGS = new Set<string>(Object.values(CACHE_TAGS))

function authorize(request: Request, bodySecret?: string): boolean {
  const expected = ENV.REVALIDATE_SECRET
  if (!expected) return false

  const header =
    request.headers.get('x-revalidate-secret') ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '')

  return header === expected || bodySecret === expected
}

export async function POST(request: Request) {
  let body: Body = {}
  try {
    body = (await request.json()) as Body
  } catch {
    body = {}
  }

  if (!authorize(request, body.secret)) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 })
  }

  const tags = (body.tags?.length ? body.tags : [CACHE_TAGS.cms]).filter((tag) =>
    KNOWN_TAGS.has(tag),
  ) as CacheTag[]

  if (tags.length === 0 && !(body.paths && body.paths.length > 0)) {
    return NextResponse.json(
      { ok: false, message: 'No valid tags or paths', knownTags: [...KNOWN_TAGS] },
      { status: 400 },
    )
  }

  for (const tag of tags) {
    // 'max' = stale-while-revalidate (Next 16)
    revalidateTag(tag, 'max')
  }

  const paths = body.paths?.filter((path) => typeof path === 'string' && path.startsWith('/')) ?? []

  // CMS content changes should refresh the sitemap route as well
  if (tags.includes(CACHE_TAGS.cms) || tags.includes(CACHE_TAGS.sitemap)) {
    paths.push('/sitemap.xml')
  }

  const uniquePaths = Array.from(new Set(paths))
  for (const path of uniquePaths) {
    revalidatePath(path)
  }

  return NextResponse.json({
    ok: true,
    revalidated: { tags, paths: uniquePaths },
    now: Date.now(),
  })
}
