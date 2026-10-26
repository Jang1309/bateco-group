import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { assertPageLocale } from '@/i18n/assert-locale'
import newsService from '@/services/news'
import siteSettingService from '@/services/site-setting'
import NewsDetailView from '@/views/news/detail'
import { mapPostListItems } from '@/views/news/map-post'
import { mapPostDetail } from '@/views/news/map-post-detail'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const response = await newsService.getPosts({
      lang: 'en',
      limit: 50,
      paged: 1,
    })
    const posts = response?.data ?? []

    return posts
      .map((item) => item.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({ locale: 'en', slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params

  try {
    const response = await newsService.getDetail(slug, locale)
    const article = mapPostDetail(response?.data, locale)
    if (!article) return {}

    return {
      title: `${article.title} | Bateco Group`,
      description: article.excerpt || undefined,
      openGraph: { images: [article.image] },
    }
  } catch {
    return {}
  }
}

const NewsDetailPage = async ({ params }: Props) => {
  const { locale, slug } = await params
  assertPageLocale(locale, 'en')
  setRequestLocale(locale)

  const [detailResult, siteSetting] = await Promise.all([
    newsService.getDetail(slug, locale).catch(() => null),
    siteSettingService.getSiteSettings(locale).catch(() => null),
  ])

  const article = mapPostDetail(detailResult?.data, locale)
  if (!article) notFound()

  let related = mapPostListItems(
    (
      await newsService
        .getPosts({
          lang: locale,
          limit: 7,
          paged: 1,
          category: article.category || undefined,
        })
        .catch(() => null)
    )?.data,
    locale,
  ).filter((item) => item.id !== article.id)

  if (related.length < 3) {
    related = mapPostListItems(
      (await newsService.getPosts({ lang: locale, limit: 7, paged: 1 }).catch(() => null))?.data,
      locale,
    ).filter((item) => item.id !== article.id)
  }

  return (
    <NewsDetailView
      article={article}
      related={related.slice(0, 6)}
      contact={siteSetting?.data?.contact}
    />
  )
}

export default NewsDetailPage
