import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/shared/json-ld'
import endpoints from '@/configs/endpoints'
import ENV from '@/configs/env'
import { resolveTranslatedDetail } from '@/configs/resolve-translated-detail'
import { detailLocalePaths, hrefFor } from '@/configs/routes'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import { assertPageLocale } from '@/i18n/assert-locale'
import { LocaleAlternateSync } from '@/i18n/locale-alternate'
import { routing } from '@/i18n/routing'
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
      lang: routing.defaultLocale,
      limit: 50,
      paged: 1,
    })
    const posts = response?.data ?? []

    return posts
      .map((item) => item.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({ locale: 'vi' as const, slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const detail = await newsService.getDetail(slug, locale).catch(() => null)
  const currentSlug = detail?.data?.slug || slug
  const { path, alternatePath } = detailLocalePaths({
    detailKey: 'newsDetail',
    listingKey: 'news',
    locale,
    slug: currentSlug,
    translations: detail?.data?.translations,
  })
  const rankPath =
    endpoints.news.rank_math_detail[locale as keyof typeof endpoints.news.rank_math_detail]
  const res = await getMetaDataRankMath(rankPath(slug))
  return metadataValues(res, { locale, path, alternatePath })
}

const NewsDetailPage = async ({ params }: Props) => {
  const { locale, slug } = await params
  assertPageLocale(locale, 'vi')
  setRequestLocale(locale)

  const [detailResult, siteSetting] = await Promise.all([
    resolveTranslatedDetail({
      slug,
      locale,
      detailKey: 'newsDetail',
      listingKey: 'news',
      fetchDetail: (s, lang) => newsService.getDetail(s, lang),
    }),
    siteSettingService.getSiteSettings(locale).catch(() => null),
  ])

  const article = mapPostDetail(detailResult?.data, locale)
  if (!article) notFound()

  const t = await getTranslations({ locale, namespace: 'Meta' })
  const { path, paths } = detailLocalePaths({
    detailKey: 'newsDetail',
    listingKey: 'news',
    locale,
    slug: article.id,
    translations: detailResult?.data?.translations,
  })
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
      <LocaleAlternateSync paths={paths} />
      <JsonLd
        data={schemaGraph(
          newsArticleSchema({
            domain: ENV.DOMAIN,
            locale: 'vi',
            path,
            title: article.title,
            description: article.excerpt,
            image: article.image,
            datePublished: detailResult?.data?.published,
          }),
          breadcrumbSchema(ENV.DOMAIN, 'vi', [
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
