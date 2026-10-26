import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/shared/json-ld'
import endpoints from '@/configs/endpoints'
import ENV from '@/configs/env'
import { hrefFor, localePathsFor } from '@/configs/routes'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import { assertPageLocale } from '@/i18n/assert-locale'
import { breadcrumbSchema, newsArticleSchema, schemaGraph } from '@/lib/schema'
import newsService from '@/services/news'
import siteSettingService from '@/services/site-setting'
import metadataValues from '@/utils/metadataValues'
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
  const pathFor =
    endpoints.news.rank_math_detail[locale as keyof typeof endpoints.news.rank_math_detail]
  const res = await getMetaDataRankMath(pathFor(slug))
  return metadataValues(res, { locale, ...localePathsFor('newsDetail', locale, { slug }) })
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

  const t = await getTranslations({ locale, namespace: 'Meta' })
  const path = hrefFor('newsDetail', locale, { slug: article.id })
  const newsPath = hrefFor('news', locale)

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
    <>
      <JsonLd
        data={schemaGraph(
          newsArticleSchema({
            domain: ENV.DOMAIN,
            locale: 'en',
            path,
            title: article.title,
            description: article.excerpt,
            image: article.image,
            datePublished: detailResult?.data?.published,
          }),
          breadcrumbSchema(ENV.DOMAIN, 'en', [
            { name: 'Bateco Group', path: '/' },
            { name: t('newsTitle').split('|')[0]!.trim(), path: newsPath },
            { name: article.title, path },
          ]),
        )}
      />
      <NewsDetailView
        article={article}
        related={related.slice(0, 6)}
        contact={siteSetting?.data?.contact}
      />
    </>
  )
}

export default NewsDetailPage
