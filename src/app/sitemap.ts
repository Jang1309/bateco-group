import type { MetadataRoute } from 'next'

import ENV from '@/configs/env'
import { hrefFor, type RouteKey } from '@/configs/routes'
import {
  absolutePublicUrl,
  buildLocalizedSitemapEntry,
  collectPaginatedItems,
  pairTranslatedSlugs,
  type AppLocale,
} from '@/lib/sitemap'
import businessFieldService from '@/services/business-field'
import careersService from '@/services/careers'
import newsService from '@/services/news'
import projectsService from '@/services/projects'

/** Static indexable routes (exclude redirect-only category slug pages). */
const STATIC_ROUTES: RouteKey[] = [
  'home',
  'about',
  'aboutGovernance',
  'business',
  'investor',
  'projects',
  'news',
  'careers',
  'contact',
]

const PAGE_SIZE = 100

/** Revalidate sitemap hourly; CMS fetch tags also cover underlying data. */
export const revalidate = 3600

function urlFor(locale: AppLocale, path: string): string {
  return absolutePublicUrl(ENV.DOMAIN, locale, path)
}

function staticEntries(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map((key) => {
    const viPath = hrefFor(key, 'vi')
    const enPath = hrefFor(key, 'en')
    return buildLocalizedSitemapEntry({
      viUrl: urlFor('vi', viPath),
      enUrl: urlFor('en', enPath),
    })
  })
}

function pairedDetailEntries(
  routeKey: 'businessDetail' | 'projectDetail' | 'newsDetail' | 'careerDetail',
  viItems: Array<{
    slug?: string
    published?: string
    translations?: Record<string, { slug?: string }>
  }>,
  enItems: Array<{
    slug?: string
    published?: string
    translations?: Record<string, { slug?: string }>
  }>,
): MetadataRoute.Sitemap {
  const { paired, enOnly, viOnly } = pairTranslatedSlugs(viItems, enItems)
  const entries: MetadataRoute.Sitemap = []

  for (const pair of paired) {
    entries.push(
      buildLocalizedSitemapEntry({
        viUrl: urlFor('vi', hrefFor(routeKey, 'vi', { slug: pair.viSlug })),
        enUrl: urlFor('en', hrefFor(routeKey, 'en', { slug: pair.enSlug })),
        lastModified: pair.lastModified,
      }),
    )
  }

  for (const item of viOnly) {
    entries.push({
      url: urlFor('vi', hrefFor(routeKey, 'vi', { slug: item.slug })),
      lastModified: item.lastModified,
    })
  }

  for (const item of enOnly) {
    if (!item.slug) continue
    entries.push({
      url: urlFor('en', hrefFor(routeKey, 'en', { slug: item.slug })),
      lastModified: item.published,
    })
  }

  return entries
}

async function sectorEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const [viRes, enRes] = await Promise.all([
      businessFieldService.getSectors('vi'),
      businessFieldService.getSectors('en'),
    ])
    return pairedDetailEntries('businessDetail', viRes?.data ?? [], enRes?.data ?? [])
  } catch {
    return []
  }
}

async function projectEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const [viItems, enItems] = await Promise.all([
      collectPaginatedItems((paged) =>
        projectsService.getProjectsList({ lang: 'vi', limit: PAGE_SIZE, paged }),
      ),
      collectPaginatedItems((paged) =>
        projectsService.getProjectsList({ lang: 'en', limit: PAGE_SIZE, paged }),
      ),
    ])
    return pairedDetailEntries('projectDetail', viItems, enItems)
  } catch {
    return []
  }
}

async function newsEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const [viItems, enItems] = await Promise.all([
      collectPaginatedItems((paged) =>
        newsService.getPosts({ lang: 'vi', limit: PAGE_SIZE, paged }),
      ),
      collectPaginatedItems((paged) =>
        newsService.getPosts({ lang: 'en', limit: PAGE_SIZE, paged }),
      ),
    ])
    return pairedDetailEntries('newsDetail', viItems, enItems)
  } catch {
    return []
  }
}

async function careerEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const [viItems, enItems] = await Promise.all([
      collectPaginatedItems((paged) =>
        careersService.getCareers({ lang: 'vi', limit: PAGE_SIZE, paged }),
      ),
      collectPaginatedItems((paged) =>
        careersService.getCareers({ lang: 'en', limit: PAGE_SIZE, paged }),
      ),
    ])

    // Careers list payload has no translations map — emit each locale separately.
    return [
      ...viItems
        .filter((item): item is { slug: string; published?: string } => Boolean(item.slug))
        .map((item) => ({
          url: urlFor('vi', hrefFor('careerDetail', 'vi', { slug: item.slug })),
          lastModified: item.published,
        })),
      ...enItems
        .filter((item): item is { slug: string; published?: string } => Boolean(item.slug))
        .map((item) => ({
          url: urlFor('en', hrefFor('careerDetail', 'en', { slug: item.slug })),
          lastModified: item.published,
        })),
    ]
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [sectors, projects, news, careers] = await Promise.all([
    sectorEntries(),
    projectEntries(),
    newsEntries(),
    careerEntries(),
  ])

  return [...staticEntries(), ...sectors, ...projects, ...news, ...careers]
}
