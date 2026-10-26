import { PATHS, type AppLocale, type RouteKey } from '@/configs/routes'

/** Static segment pairs (no [slug]) for locale switching. */
const STATIC_PAIRS: { key: RouteKey; vi: string; en: string }[] = (
  Object.entries(PATHS) as [RouteKey, { vi: string; en: string }][]
)
  .filter(([, paths]) => !paths.vi.includes('[') && !paths.en.includes('['))
  .map(([key, paths]) => ({ key, vi: paths.vi, en: paths.en }))

type DynamicPair = {
  vi: RegExp
  en: RegExp
  toEn: (m: RegExpMatchArray) => string
  toVi: (m: RegExpMatchArray) => string
}

/** Dynamic patterns: '/tin-tuc/[slug]' ↔ '/news/[slug]' */
const DYNAMIC_PAIRS: DynamicPair[] = [
  {
    vi: /^\/linh-vuc-kinh-doanh\/([^/]+)$/,
    en: /^\/business-field\/([^/]+)$/,
    toEn: (m) => `/business-field/${m[1]}`,
    toVi: (m) => `/linh-vuc-kinh-doanh/${m[1]}`,
  },
  {
    vi: /^\/du-an\/([^/]+)$/,
    en: /^\/projects\/([^/]+)$/,
    toEn: (m) => `/projects/${m[1]}`,
    toVi: (m) => `/du-an/${m[1]}`,
  },
  {
    vi: /^\/tin-tuc\/danh-muc\/([^/]+)$/,
    en: /^\/news\/category\/([^/]+)$/,
    toEn: (m) => `/news/category/${m[1]}`,
    toVi: (m) => `/tin-tuc/danh-muc/${m[1]}`,
  },
  {
    vi: /^\/tin-tuc\/([^/]+)$/,
    en: /^\/news\/([^/]+)$/,
    toEn: (m) => `/news/${m[1]}`,
    toVi: (m) => `/tin-tuc/${m[1]}`,
  },
  {
    vi: /^\/co-hoi-nghe-nghiep\/([^/]+)$/,
    en: /^\/careers\/([^/]+)$/,
    toEn: (m) => `/careers/${m[1]}`,
    toVi: (m) => `/co-hoi-nghe-nghiep/${m[1]}`,
  },
]

/**
 * Map a pathname from one locale to the other (same content, localized URL).
 * Returns home if no pair matches.
 */
export function switchLocalePath(pathname: string, nextLocale: AppLocale): string {
  const normalized = pathname.replace(/\/$/, '') || '/'

  for (const pair of STATIC_PAIRS) {
    if (normalized === pair.vi || normalized === pair.en) {
      return nextLocale === 'en' ? pair.en : pair.vi
    }
  }

  for (const pair of DYNAMIC_PAIRS) {
    const viMatch = normalized.match(pair.vi)
    if (viMatch) return nextLocale === 'en' ? pair.toEn(viMatch) : pair.toVi(viMatch)
    const enMatch = normalized.match(pair.en)
    if (enMatch) return nextLocale === 'en' ? pair.toEn(enMatch) : pair.toVi(enMatch)
  }

  return '/'
}

export function assertLocale(locale: string, expected: AppLocale): locale is AppLocale {
  return locale === expected
}
