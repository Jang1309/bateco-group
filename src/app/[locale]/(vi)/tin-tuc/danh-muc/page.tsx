import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import newsService from '@/services/news'
import { mapNewsCategories } from '@/views/news/build-category-blocks'
import NewsCategoryView from '@/views/news/category'

export const metadata: Metadata = {
  title: 'Danh mục tin tức | Bateco Group',
  description: 'Tin tức theo chuyên mục của Bateco Group.',
}

type Props = {
  params: Promise<{ locale: string }>
}

const NewsCategoryListingPage = async ({ params }: Props) => {
  const { locale } = await params
  setRequestLocale(locale)

  const [categoriesResponse, pageResponse] = await Promise.all([
    newsService.getCategories(locale).catch(() => null),
    newsService.getNewsPage(locale).catch(() => null),
  ])

  const categories = mapNewsCategories(categoriesResponse?.data)

  return (
    <NewsCategoryView
      locale={locale}
      categories={categories}
      banner={pageResponse?.acf?.banner}
    />
  )
}

export default NewsCategoryListingPage
