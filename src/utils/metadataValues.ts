import type { Metadata } from 'next'

import { absolutePublicUrl, type AppLocale } from '@/lib/sitemap'

const SITE_NAME = 'Bateco Group'
const DEFAULT_IMAGE = '/default.jpg'
const DEFAULT_DESCRIPTION_VI =
  'Bateco Group — tập đoàn đầu tư đa ngành, phát triển bằng năng lực thực thi và giá trị bền vững.'
const DEFAULT_DESCRIPTION_EN =
  'Bateco Group — a multi-sector investment group growing through execution capability and lasting value.'

/** Shape returned by `parseRankMathHead` (and null when RankMath fetch fails). */
export type RankMathHead = {
  title?: string | null
  description?: string | null
  canonical?: string | null
  openGraph?: {
    title?: string | null
    description?: string | null
    url?: string | null
    siteName?: string | null
    locale?: string | null
    type?: string | null
    image?: {
      url?: string | null
      width?: string | null
      height?: string | null
      alt?: string | null
    }
  }
  twitter?: {
    card?: string | null
    title?: string | null
    description?: string | null
    image?: string | string[] | null
  }
}

export type MetadataValuesOptions = {
  locale?: string
  /**
   * Public path for this page (no `/vi` or `/en` prefix), e.g. `/gioi-thieu`.
   * Required for a correct absolute canonical (avoids next-intl internal `/vi/...`).
   */
  path?: string
  /** Public path of the alternate locale when slugs differ (e.g. `/introduction`). */
  alternatePath?: string
  description?: string
  domain?: string
}

function resolveDomain(domain?: string): string {
  const value = domain || process.env.NEXT_PUBLIC_DOMAIN || ''
  if (!value) {
    throw new Error('NEXT_PUBLIC_DOMAIN is required for metadataBase')
  }
  return value
}

function resolveLocale(locale?: string): AppLocale {
  return locale === 'en' ? 'en' : 'vi'
}

function buildAlternates(
  domain: string,
  locale: AppLocale,
  path: string,
  alternatePath?: string,
): NonNullable<Metadata['alternates']> {
  const otherPath = alternatePath ?? path
  const viPath = locale === 'vi' ? path : otherPath
  const enPath = locale === 'en' ? path : otherPath
  const viUrl = absolutePublicUrl(domain, 'vi', viPath)
  const enUrl = absolutePublicUrl(domain, 'en', enPath)
  const canonical = locale === 'en' ? enUrl : viUrl

  return {
    canonical,
    languages: {
      vi: viUrl,
      en: enUrl,
      'x-default': viUrl,
    },
  }
}

/**
 * Map RankMath parsed head → Next.js `Metadata`.
 * Pass `path` (public URL path) so canonical/og:url never resolve to internal `/vi/...`.
 */
export default function metadataValues(
  res?: RankMathHead | null,
  options: MetadataValuesOptions = {},
): Metadata {
  const domain = resolveDomain(options.domain)
  const metadataBase = new URL(domain)
  const locale = resolveLocale(options.locale)
  const fallbackDesc = locale === 'en' ? DEFAULT_DESCRIPTION_EN : DEFAULT_DESCRIPTION_VI
  const description = res?.description?.trim() || options.description?.trim() || fallbackDesc
  const ogLocale = options.locale === 'en' ? 'en_US' : options.locale === 'vi' ? 'vi_VN' : undefined

  const alternates = options.path
    ? buildAlternates(domain, locale, options.path, options.alternatePath)
    : undefined
  const canonicalUrl = typeof alternates?.canonical === 'string' ? alternates.canonical : undefined

  if (!res) {
    return {
      metadataBase,
      title: SITE_NAME,
      description,
      ...(alternates ? { alternates } : {}),
      authors: [{ name: SITE_NAME }],
      robots: 'index, follow',
    }
  }

  const ogImages: NonNullable<NonNullable<Metadata['openGraph']>['images']> = []
  if (res.openGraph?.image?.url) {
    ogImages.push({
      url: res.openGraph.image.url,
      width: res.openGraph.image.width ? Number(res.openGraph.image.width) : 1200,
      height: res.openGraph.image.height ? Number(res.openGraph.image.height) : 630,
      alt: res.openGraph.image.alt || res.title || SITE_NAME,
    })
  }
  if (ogImages.length === 0) {
    ogImages.push({
      url: DEFAULT_IMAGE,
      width: 1200,
      height: 630,
      alt: SITE_NAME,
    })
  }

  const twitterImages: { url: string }[] = []
  if (res.twitter?.image) {
    if (Array.isArray(res.twitter.image)) {
      for (const url of res.twitter.image) {
        if (url) twitterImages.push({ url })
      }
    } else {
      twitterImages.push({ url: res.twitter.image })
    }
  }
  if (twitterImages.length === 0) {
    twitterImages.push({ url: DEFAULT_IMAGE })
  }

  const ogType = res.openGraph?.type
  const openGraphType =
    ogType === 'article' ||
    ogType === 'website' ||
    ogType === 'book' ||
    ogType === 'profile' ||
    ogType === 'music.song' ||
    ogType === 'music.album' ||
    ogType === 'music.playlist' ||
    ogType === 'music.radio_station' ||
    ogType === 'video.movie' ||
    ogType === 'video.episode' ||
    ogType === 'video.tv_show' ||
    ogType === 'video.other'
      ? ogType
      : undefined

  return {
    metadataBase,
    title: res.title || SITE_NAME,
    description,
    ...(alternates ? { alternates } : {}),
    authors: [{ name: SITE_NAME }],
    robots: 'index, follow',
    openGraph: {
      title: res.openGraph?.title || res.title || SITE_NAME,
      description: res.openGraph?.description || description,
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      siteName: SITE_NAME,
      images: ogImages,
      locale: ogLocale || res.openGraph?.locale || undefined,
      type: openGraphType,
    },
    twitter: {
      card:
        (res.twitter?.card as 'summary_large_image' | 'summary' | undefined) ||
        'summary_large_image',
      title: res.twitter?.title || res.title || SITE_NAME,
      description: res.twitter?.description || description,
      creator: SITE_NAME,
      images: twitterImages,
    },
  }
}
