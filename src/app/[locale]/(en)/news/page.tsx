import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/shared/json-ld'
import endpoints from '@/configs/endpoints'
import ENV from '@/configs/env'
import { hrefFor } from '@/configs/routes'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import { assertPageLocale } from '@/i18n/assert-locale'
import { collectionPageGraph } from '@/lib/schema'
import newsService from '@/services/news'
import metadataValues from '@/utils/metadataValues'
import NewsView from '@/views/news'
import { buildCategoryBlocks, mapNewsCategories } from '@/views/news/build-category-blocks'
import { mapPostListItems } from '@/views/news/map-post'

export function generateStaticParams() {
  return [{ locale: 'en' as const }]
}
type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    endpoints.news.rank_math[locale as keyof typeof endpoints.news.rank_math],
  )
  const t = await getTranslations({ locale, namespace: 'Meta' })
  return metadataValues(res, { locale, description: t('newsDesc') })
}

const NewsPage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'en')
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const path = hrefFor('news', locale)

  const [pageResponse, categoriesResponse, postsResponse] = await Promise.all([
    newsService.getNewsPage(locale).catch(() => null),
    newsService.getCategories(locale).catch(() => null),
    newsService.getPosts({ limit: 50, paged: 1, lang: locale }).catch(() => null),
  ])

  const categories = mapNewsCategories(categoriesResponse?.data)
  const articles = mapPostListItems(postsResponse?.data, locale)
  const categoryBlocks = buildCategoryBlocks(categories, articles)

  return (
    <>
      <JsonLd
        data={collectionPageGraph({
          domain: ENV.DOMAIN,
          locale: 'en',
          path,
          name: t('newsTitle'),
          description: t('newsDesc'),
          crumbName: t('newsTitle').split('|')[0]!.trim(),
        })}
      />
      <NewsView
        content={pageResponse?.acf}
        categoryBlocks={categoryBlocks}
      />
    </>
  )
}

export default NewsPage
