import type { Metadata } from 'next'

const SITE_NAME = 'Bateco Group'
const DEFAULT_IMAGE = '/default.jpg'

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

function resolveDomain(domain?: string): string {
  const value = domain || process.env.NEXT_PUBLIC_DOMAIN || ''
  if (!value) {
    throw new Error('NEXT_PUBLIC_DOMAIN is required for metadataBase')
  }
  return value
}

/**
 * Map RankMath parsed head → Next.js `Metadata`.
 * `description` is used when RankMath has none (avoids duplicate meta); `locale` sets
 * og:locale since RankMath reports the CMS default for every language.
 * Pass `domain` in tests; production uses `NEXT_PUBLIC_DOMAIN`.
 */
export default function metadataValues(
  res?: RankMathHead | null,
  options: { locale?: string; description?: string; domain?: string } = {},
): Metadata {
  const metadataBase = new URL(resolveDomain(options.domain))
  const description = res?.description || options.description || SITE_NAME
  const ogLocale = options.locale === 'en' ? 'en_US' : options.locale === 'vi' ? 'vi_VN' : undefined

  if (!res) {
    return {
      metadataBase,
      title: SITE_NAME,
      description,
      alternates: { canonical: './' },
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
    alternates: { canonical: './' },
    authors: [{ name: SITE_NAME }],
    robots: 'index, follow',
    openGraph: {
      title: res.openGraph?.title || res.title || SITE_NAME,
      description: res.openGraph?.description || description,
      url: './',
      siteName: res.openGraph?.siteName || SITE_NAME,
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
