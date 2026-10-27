import { parseAsInteger, parseAsString } from 'nuqs'

const pageParser = parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true })

/** VI: ?danh-muc=&trang= — EN: ?category=&page= */
export const documentFilterParamsVi = {
  'danh-muc': parseAsString,
  trang: pageParser,
}

export const documentFilterParamsEn = {
  category: parseAsString,
  page: pageParser,
}

export function documentFilterParams(locale: string) {
  return locale === 'en' ? documentFilterParamsEn : documentFilterParamsVi
}

type FilterQuery = {
  'danh-muc'?: string | null
  trang?: number
  category?: string | null
  page?: number
}

export function getDocumentFilter(locale: string, query: FilterQuery) {
  if (locale === 'en') {
    return { categorySlug: query.category ?? null, page: query.page ?? 1 }
  }
  return { categorySlug: query['danh-muc'] ?? null, page: query.trang ?? 1 }
}

export function setDocumentCategory(locale: string, slug: string) {
  return locale === 'en' ? { category: slug, page: 1 } : { 'danh-muc': slug, trang: 1 }
}

export function setDocumentCategoryOnly(locale: string, slug: string) {
  return locale === 'en' ? { category: slug } : { 'danh-muc': slug }
}

export function setDocumentPage(locale: string, page: number) {
  const next = page <= 1 ? 1 : page
  return locale === 'en' ? { page: next } : { trang: next }
}
