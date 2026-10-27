import { redirect } from 'next/navigation'

import { detailLocalePaths, localePath, type RouteKey } from '@/configs/routes'

type TranslationMap = Record<string, { slug?: string } | undefined> | undefined

type DetailPayload = {
  success?: boolean
  data?: {
    id?: number
    title?: string
    slug?: string
    translations?: TranslationMap
  } | null
} | null

export function isUsableDetail(payload: DetailPayload): boolean {
  return Boolean(payload?.success && payload.data?.id && payload.data?.slug)
}

type ResolveArgs = {
  slug: string
  locale: string
  detailKey: RouteKey
  listingKey: RouteKey
  fetchDetail: (slug: string, locale: string) => Promise<DetailPayload>
}

/**
 * Load detail for the current locale. If the slug belongs to the other locale,
 * redirect to the translated path instead of hard-404.
 */
export async function resolveTranslatedDetail({
  slug,
  locale,
  detailKey,
  listingKey,
  fetchDetail,
}: ResolveArgs): Promise<NonNullable<DetailPayload>> {
  const primary = await fetchDetail(slug, locale).catch(() => null)
  if (isUsableDetail(primary)) return primary!

  const opposite = locale === 'en' ? 'vi' : 'en'
  const other = await fetchDetail(slug, opposite).catch(() => null)
  if (!isUsableDetail(other)) {
    return primary ?? { success: false, data: null }
  }

  const { paths } = detailLocalePaths({
    detailKey,
    listingKey,
    locale: opposite,
    slug: other!.data!.slug!,
    translations: other!.data!.translations,
  })

  const target = paths[locale === 'en' ? 'en' : 'vi']
  redirect(localePath(locale, target))
}
