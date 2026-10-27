/** Public path per locale. App Router folders: (vi)=vi paths, (en)=en paths. */
export const PATHS = {
  home: { vi: '/', en: '/' },
  about: { vi: '/gioi-thieu', en: '/introduction' },
  aboutGovernance: {
    vi: '/gioi-thieu/van-ban-quan-tri',
    en: '/introduction/administrative-document',
  },
  business: { vi: '/linh-vuc-kinh-doanh', en: '/business-field' },
  businessDetail: {
    vi: '/linh-vuc-kinh-doanh/[slug]',
    en: '/business-field/[slug]',
  },
  investor: { vi: '/quan-he-nha-dau-tu', en: '/investor-relations' },
  projects: { vi: '/du-an', en: '/projects' },
  projectDetail: { vi: '/du-an/[slug]', en: '/projects/[slug]' },
  news: { vi: '/tin-tuc', en: '/news' },
  newsDetail: { vi: '/tin-tuc/[slug]', en: '/news/[slug]' },
  newsCategory: { vi: '/tin-tuc/danh-muc', en: '/news/category' },
  newsCategorySlug: {
    vi: '/tin-tuc/danh-muc/[slug]',
    en: '/news/category/[slug]',
  },
  careers: { vi: '/co-hoi-nghe-nghiep', en: '/careers' },
  careerDetail: {
    vi: '/co-hoi-nghe-nghiep/[slug]',
    en: '/careers/[slug]',
  },
  contact: { vi: '/lien-he', en: '/contact' },
} as const

export type AppLocale = 'vi' | 'en'
export type RouteKey = keyof typeof PATHS

export function pathFor(key: RouteKey, locale: string = 'vi'): string {
  const entry = PATHS[key]
  return entry[(locale === 'en' ? 'en' : 'vi') as AppLocale]
}

/**
 * Public pathname with locale prefix (`as-needed`: vi bare, en under `/en`).
 * Use for `next/navigation` redirects — next-intl Link already prefixes itself.
 */
export function localePath(locale: string, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === 'en') {
    return normalized === '/' ? '/en' : `/en${normalized}`
  }
  return normalized
}

/** Legacy `/news/category/[slug]` (and vi twin) → listing with filter query. */
export function newsCategoryListingHref(locale: string, slug: string): string {
  const listing = pathFor('newsCategory', locale)
  const key = locale === 'en' ? 'category' : 'chuyen-muc'
  return `${localePath(locale, listing)}?${key}=${encodeURIComponent(slug)}`
}

/** Resolve a route key to a concrete href, substituting `[slug]` etc. */
export function hrefFor(
  key: RouteKey,
  locale: string = 'vi',
  params?: Record<string, string>,
): string {
  let path = pathFor(key, locale)
  if (params) {
    for (const [name, value] of Object.entries(params)) {
      path = path.replace(`[${name}]`, value)
    }
  }
  return path
}

/** This-locale path + alternate-locale path for metadata canonical/hreflang. */
export function localePathsFor(
  key: RouteKey,
  locale: string = 'vi',
  params?: Record<string, string>,
): { path: string; alternatePath: string } {
  const other = locale === 'en' ? 'vi' : 'en'
  return {
    path: hrefFor(key, locale, params),
    alternatePath: hrefFor(key, other, params),
  }
}

type TranslationMap = Record<string, { slug?: string } | undefined> | undefined

export function resolveTranslatedSlug(
  currentLocale: string,
  currentSlug: string,
  targetLocale: AppLocale,
  translations?: TranslationMap,
): string | null {
  const locale = currentLocale === 'en' ? 'en' : 'vi'
  if (locale === targetLocale) return currentSlug
  return translations?.[targetLocale]?.slug ?? null
}

/**
 * Build public paths for both locales on detail pages.
 * Missing translation → fall back to the listing page (avoids 404 on switch).
 */
export function detailLocalePaths(input: {
  detailKey: RouteKey
  listingKey: RouteKey
  locale: string
  slug: string
  translations?: TranslationMap
}): { path: string; alternatePath: string; paths: Record<AppLocale, string> } {
  const viSlug = resolveTranslatedSlug(input.locale, input.slug, 'vi', input.translations)
  const enSlug = resolveTranslatedSlug(input.locale, input.slug, 'en', input.translations)

  const viPath = viSlug
    ? hrefFor(input.detailKey, 'vi', { slug: viSlug })
    : pathFor(input.listingKey, 'vi')
  const enPath = enSlug
    ? hrefFor(input.detailKey, 'en', { slug: enSlug })
    : pathFor(input.listingKey, 'en')

  const locale = input.locale === 'en' ? 'en' : 'vi'
  return {
    path: locale === 'en' ? enPath : viPath,
    alternatePath: locale === 'en' ? viPath : enPath,
    paths: { vi: viPath, en: enPath },
  }
}

/** True when URL is (or ends with) a contact page path in either locale. */
export function isContactPath(url?: string): boolean {
  if (!url) return false
  try {
    const path = url.startsWith('http') ? new URL(url).pathname : url
    return (
      path === PATHS.contact.vi ||
      path === PATHS.contact.en ||
      path.endsWith(PATHS.contact.vi) ||
      path.endsWith(PATHS.contact.en)
    )
  } catch {
    return false
  }
}

/**
 * Locale-aware contact href. Remaps CMS `/lien-he` or `/contact` (and absolute
 * variants) so EN never lands on `/en/lien-he`.
 */
export function contactHrefFor(locale: string = 'vi', cmsUrl?: string): string {
  if (!cmsUrl || isContactPath(cmsUrl)) return hrefFor('contact', locale)
  return cmsUrl
}

/** @deprecated Prefer pathFor(key, locale). Defaults to vi public paths. */
const ROUTES = {
  home: PATHS.home.vi,
  about: PATHS.about.vi,
  aboutGovernance: PATHS.aboutGovernance.vi,
  business: PATHS.business.vi,
  investor: PATHS.investor.vi,
  projects: PATHS.projects.vi,
  news: PATHS.news.vi,
  careers: PATHS.careers.vi,
  contact: PATHS.contact.vi,
} as const

export default ROUTES
