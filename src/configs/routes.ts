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
