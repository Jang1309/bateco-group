import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import newsService from '@/services/news'
import NewsView from '@/views/news'
import { buildCategoryBlocks, mapNewsCategories } from '@/views/news/build-category-blocks'
import { mapPostListItems } from '@/views/news/map-post'

export const metadata: Metadata = {
  title: 'Tin tức | Bateco Group',
  description:
    'Tin tức mới nhất về hoạt động, dự án, giải thưởng và văn hóa doanh nghiệp của Bateco Group.',
}

type Props = {
  params: Promise<{ locale: string }>
}

const NewsPage = async ({ params }: Props) => {
  const { locale } = await params
  setRequestLocale(locale)

  const [pageResponse, categoriesResponse, postsResponse] = await Promise.all([
    newsService.getNewsPage(locale).catch(() => null),
    newsService.getCategories(locale).catch(() => null),
    newsService.getPosts({ limit: 50, paged: 1, lang: locale }).catch(() => null),
  ])

  const categories = mapNewsCategories(categoriesResponse?.data)
  const articles = mapPostListItems(postsResponse?.data)
  const categoryBlocks = buildCategoryBlocks(categories, articles)

  return (
    <NewsView
      content={pageResponse?.acf}
      categoryBlocks={categoryBlocks}
    />
  )
}

export default NewsPage
