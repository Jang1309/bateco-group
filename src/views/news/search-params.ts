import { parseAsInteger, parseAsString } from 'nuqs'

const pageParser = parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true })

/** VI: ?chuyen-muc=&trang= — EN: ?category=&page= */
export const newsSearchParamsVi = {
  'chuyen-muc': parseAsString,
  trang: pageParser,
}

export const newsSearchParamsEn = {
  category: parseAsString,
  page: pageParser,
}

export function newsSearchParams(locale: string) {
  return locale === 'en' ? newsSearchParamsEn : newsSearchParamsVi
}

type NewsFilterQuery = {
  'chuyen-muc'?: string | null
  trang?: number
  category?: string | null
  page?: number
}

export function getNewsFilter(locale: string, query: NewsFilterQuery) {
  if (locale === 'en') {
    return { categorySlug: query.category ?? null, page: query.page ?? 1 }
  }
  return { categorySlug: query['chuyen-muc'] ?? null, page: query.trang ?? 1 }
}

export function setNewsCategory(locale: string, slug?: string | null) {
  if (locale === 'en') {
    return { category: slug ?? null, page: 1 }
  }
  return { 'chuyen-muc': slug ?? null, trang: 1 }
}

export function setNewsPage(locale: string, page: number) {
  const next = page <= 1 ? 1 : page
  return locale === 'en' ? { page: next } : { trang: next }
}

/** Query key used when building category listing hrefs. */
export function newsCategoryQueryKey(locale: string) {
  return locale === 'en' ? 'category' : 'chuyen-muc'
}
