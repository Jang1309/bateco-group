import { parseAsInteger, parseAsString, parseAsStringLiteral } from 'nuqs'

/** Canonical sort used in UI / API mapping. */
export const PROJECT_SORT_VALUES = ['moi-nhat', 'cu-nhat'] as const
export type ProjectSort = (typeof PROJECT_SORT_VALUES)[number]

const EN_SORT_VALUES = ['newest', 'oldest'] as const
type EnProjectSort = (typeof EN_SORT_VALUES)[number]

const pageParser = parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true })

const sortParserVi = parseAsStringLiteral(PROJECT_SORT_VALUES)
  .withDefault('moi-nhat')
  .withOptions({ clearOnDefault: true })

const sortParserEn = parseAsStringLiteral(EN_SORT_VALUES)
  .withDefault('newest')
  .withOptions({ clearOnDefault: true })

/** VI: ?linh-vuc=&q=&sap-xep=&trang= — EN: ?sector=&q=&sort=&page= */
export const projectsSearchParamsVi = {
  'linh-vuc': parseAsString,
  q: parseAsString,
  'sap-xep': sortParserVi,
  trang: pageParser,
}

export const projectsSearchParamsEn = {
  sector: parseAsString,
  q: parseAsString,
  sort: sortParserEn,
  page: pageParser,
}

export function projectsSearchParams(locale: string) {
  return locale === 'en' ? projectsSearchParamsEn : projectsSearchParamsVi
}

type ProjectsFilterQuery = {
  'linh-vuc'?: string | null
  q?: string | null
  'sap-xep'?: ProjectSort
  trang?: number
  sector?: string | null
  sort?: EnProjectSort
  page?: number
}

const toCanonicalSort = (locale: string, query: ProjectsFilterQuery): ProjectSort => {
  if (locale === 'en') {
    return query.sort === 'oldest' ? 'cu-nhat' : 'moi-nhat'
  }
  return query['sap-xep'] === 'cu-nhat' ? 'cu-nhat' : 'moi-nhat'
}

const toUrlSort = (locale: string, sort: ProjectSort) => {
  if (locale === 'en') {
    return sort === 'cu-nhat' ? ('oldest' as const) : ('newest' as const)
  }
  return sort
}

export function getProjectsFilter(locale: string, query: ProjectsFilterQuery) {
  if (locale === 'en') {
    return {
      sector: query.sector ?? null,
      q: query.q ?? null,
      sort: toCanonicalSort(locale, query),
      page: query.page ?? 1,
    }
  }
  return {
    sector: query['linh-vuc'] ?? null,
    q: query.q ?? null,
    sort: toCanonicalSort(locale, query),
    page: query.trang ?? 1,
  }
}

export function setProjectsSector(locale: string, sector?: string | null) {
  if (locale === 'en') return { sector: sector ?? null, page: 1 }
  return { 'linh-vuc': sector ?? null, trang: 1 }
}

export function setProjectsSearch(locale: string, q?: string | null) {
  const next = q?.trim() ? q.trim() : null
  if (locale === 'en') return { q: next, page: 1 }
  return { q: next, trang: 1 }
}

export function setProjectsSort(locale: string, sort: ProjectSort) {
  if (locale === 'en') return { sort: toUrlSort(locale, sort), page: 1 }
  return { 'sap-xep': sort, trang: 1 }
}

export function setProjectsPage(locale: string, page: number) {
  const next = page <= 1 ? 1 : page
  return locale === 'en' ? { page: next } : { trang: next }
}
