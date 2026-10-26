export type AppLocale = 'vi' | 'en'

export type SitemapEntry = {
  url: string
  lastModified?: string | Date
  alternates?: {
    languages?: Record<string, string>
  }
}

type TranslatableItem = {
  slug?: string
  published?: string
  translations?: Record<string, { slug?: string } | undefined>
}

type PaginatedResponse<T> = {
  data?: T[]
  totalPages?: number
}

/** Absolute public URL for a locale path (`as-needed`: vi bare, en under `/en`). */
export function absolutePublicUrl(domain: string, locale: AppLocale, path: string): string {
  const base = domain.replace(/\/+$/, '')
  const normalized = path.startsWith('/') ? path : `/${path}`
  const bare = normalized === '/' ? '' : normalized

  if (locale === 'en') {
    return bare ? `${base}/en${bare}` : `${base}/en`
  }

  return bare ? `${base}${bare}` : base
}

export function buildLocalizedSitemapEntry(input: {
  viUrl: string
  enUrl: string
  lastModified?: string | Date
}): SitemapEntry {
  const entry: SitemapEntry = {
    url: input.viUrl,
    alternates: {
      languages: {
        vi: input.viUrl,
        en: input.enUrl,
        'x-default': input.viUrl,
      },
    },
  }

  if (input.lastModified) {
    entry.lastModified = input.lastModified
  }

  return entry
}

export function pairTranslatedSlugs<T extends TranslatableItem>(
  viItems: T[],
  enItems: T[],
): {
  paired: Array<{ viSlug: string; enSlug: string; lastModified?: string }>
  enOnly: T[]
  viOnly: Array<{ slug: string; lastModified?: string }>
} {
  const pairedEnSlugs = new Set<string>()
  const paired: Array<{ viSlug: string; enSlug: string; lastModified?: string }> = []
  const viOnly: Array<{ slug: string; lastModified?: string }> = []

  for (const item of viItems) {
    const viSlug = item.slug
    if (!viSlug) continue

    const enSlug = item.translations?.en?.slug
    if (enSlug) {
      pairedEnSlugs.add(enSlug)
      paired.push({
        viSlug,
        enSlug,
        ...(item.published ? { lastModified: item.published } : {}),
      })
    } else {
      viOnly.push({
        slug: viSlug,
        ...(item.published ? { lastModified: item.published } : {}),
      })
    }
  }

  const enOnly = enItems.filter((item) => item.slug && !pairedEnSlugs.has(item.slug))

  return { paired, enOnly, viOnly }
}

const MAX_PAGES = 50

export async function collectPaginatedItems<T>(
  fetchPage: (paged: number) => Promise<PaginatedResponse<T>>,
): Promise<T[]> {
  const items: T[] = []
  let paged = 1
  let totalPages = 1

  while (paged <= totalPages && paged <= MAX_PAGES) {
    const response = await fetchPage(paged)
    const pageItems = response.data ?? []
    if (pageItems.length === 0) break

    items.push(...pageItems)
    totalPages = Math.max(1, response.totalPages ?? 1)
    paged += 1
  }

  return items
}
