import { NextResponse } from 'next/server'

import { cacheOption, cacheTagsForApi, isAllowedCmsApiPath } from '@/configs/cache'
import fetchData from '@/fetches/fetchData'

export const runtime = 'nodejs'

/**
 * Server proxy for client SWR so listing requests hit Next Data Cache
 * instead of calling the WordPress CMS from the browser.
 *
 * GET /api/cms?api=api/v1/get-all/post?...
 */
export async function GET(request: Request) {
  const api = new URL(request.url).searchParams.get('api')?.trim()

  if (!api || !isAllowedCmsApiPath(api)) {
    return NextResponse.json({ ok: false, message: 'Invalid api path' }, { status: 400 })
  }

  try {
    const data = await fetchData({
      api,
      option: cacheOption(...cacheTagsForApi(api)),
    })
    return NextResponse.json(data, {
      headers: {
        // Align browser cache hint with ISR window (optional; Data Cache is source of truth)
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'CMS fetch failed'
    return NextResponse.json({ ok: false, message }, { status: 502 })
  }
}
