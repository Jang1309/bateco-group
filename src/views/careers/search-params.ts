import { parseAsInteger, parseAsString } from 'nuqs'

const pageParser = parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true })

/** VI: ?phong-ban=&dia-diem=&q=&trang= — EN: ?department=&location=&q=&page= */
export const careersSearchParamsVi = {
  'phong-ban': parseAsString,
  'dia-diem': parseAsString,
  q: parseAsString,
  trang: pageParser,
}

export const careersSearchParamsEn = {
  department: parseAsString,
  location: parseAsString,
  q: parseAsString,
  page: pageParser,
}

export function careersSearchParams(locale: string) {
  return locale === 'en' ? careersSearchParamsEn : careersSearchParamsVi
}

type CareersFilterQuery = {
  'phong-ban'?: string | null
  'dia-diem'?: string | null
  q?: string | null
  trang?: number
  department?: string | null
  location?: string | null
  page?: number
}

export function getCareersFilter(locale: string, query: CareersFilterQuery) {
  if (locale === 'en') {
    return {
      department: query.department ?? null,
      location: query.location ?? null,
      q: query.q ?? null,
      page: query.page ?? 1,
    }
  }
  return {
    department: query['phong-ban'] ?? null,
    location: query['dia-diem'] ?? null,
    q: query.q ?? null,
    page: query.trang ?? 1,
  }
}

export function setCareersDepartment(locale: string, value?: string | null) {
  if (locale === 'en') return { department: value ?? null, page: 1 }
  return { 'phong-ban': value ?? null, trang: 1 }
}

export function setCareersLocation(locale: string, value?: string | null) {
  if (locale === 'en') return { location: value ?? null, page: 1 }
  return { 'dia-diem': value ?? null, trang: 1 }
}

export function setCareersSearch(locale: string, q?: string | null) {
  const next = q?.trim() ? q.trim() : null
  if (locale === 'en') return { q: next, page: 1 }
  return { q: next, trang: 1 }
}

export function setCareersPage(locale: string, page: number) {
  const next = page <= 1 ? 1 : page
  return locale === 'en' ? { page: next } : { trang: next }
}
