import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { assertPageLocale } from '@/i18n/assert-locale'
import newsService from '@/services/news'
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
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return {
    title: t('newsTitle'),
    description: t('newsDesc'),
  }
}

const NewsPage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'en')
  setRequestLocale(locale)

  const [pageResponse, categoriesResponse, postsResponse] = await Promise.all([
    newsService.getNewsPage(locale).catch(() => null),
    newsService.getCategories(locale).catch(() => null),
    newsService.getPosts({ limit: 50, paged: 1, lang: locale }).catch(() => null),
  ])

  const categories = mapNewsCategories(categoriesResponse?.data)
  const articles = mapPostListItems(postsResponse?.data, locale)
  const categoryBlocks = buildCategoryBlocks(categories, articles)

  return (
    <NewsView
      content={pageResponse?.acf}
      categoryBlocks={categoryBlocks}
    />
  )
}

export default NewsPage
