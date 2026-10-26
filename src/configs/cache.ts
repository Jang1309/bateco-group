/** Default ISR window for CMS GETs (seconds). */
export const CACHE_REVALIDATE = 300

/** Shared cache tags — pass to `revalidateTag` / CMS webhook. */
export const CACHE_TAGS = {
  cms: 'cms',
  homepage: 'homepage',
  news: 'news',
  projects: 'projects',
  careers: 'careers',
  business: 'business',
  contact: 'contact',
  investor: 'investor',
  governance: 'governance',
  introduction: 'introduction',
  siteSettings: 'site-settings',
  rankmath: 'rankmath',
  sitemap: 'sitemap',
} as const

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS]

/** `fetch` `next` options: TTL + tags (always includes `cms`). */
export function cacheNext(...tags: CacheTag[]) {
  const unique = Array.from(new Set<CacheTag>([CACHE_TAGS.cms, ...tags]))
  return {
    revalidate: CACHE_REVALIDATE,
    tags: unique,
  }
}

/** Full `option` bag for `fetchData`. */
export function cacheOption(...tags: CacheTag[]) {
  return { next: cacheNext(...tags) }
}

/** Allow only CMS API path prefixes through the public proxy. */
export function isAllowedCmsApiPath(api: string): boolean {
  const path = api.split('?')[0] ?? ''
  return path.startsWith('api/v1/') || path.startsWith('wp/v2/') || path.startsWith('rankmath/v1/')
}

/** Best-effort domain tags from a CMS api path (for the SWR proxy). */
export function cacheTagsForApi(api: string): CacheTag[] {
  const path = (api.split('?')[0] ?? '').toLowerCase()

  if (path.includes('/post') || path.includes('/category')) return [CACHE_TAGS.news]
  if (path.includes('projects') || path.includes('/sectors')) {
    return path.includes('projects')
      ? [CACHE_TAGS.projects, CACHE_TAGS.business]
      : [CACHE_TAGS.business]
  }
  if (path.includes('careers') || path.includes('locations') || path.includes('departments')) {
    return [CACHE_TAGS.careers]
  }
  if (path.includes('investor')) return [CACHE_TAGS.investor]
  if (path.includes('ad-document')) return [CACHE_TAGS.governance]
  if (path.includes('rankmath')) return [CACHE_TAGS.rankmath]

  return []
}
