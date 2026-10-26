import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { assertPageLocale } from '@/i18n/assert-locale'
import newsService from '@/services/news'
import { mapNewsCategories } from '@/views/news/build-category-blocks'
import NewsCategoryView from '@/views/news/category'

export function generateStaticParams() {
  return [{ locale: 'vi' as const }]
}
type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return {
    title: t('newsCategoryTitle'),
    description: t('newsCategoryDesc'),
  }
}

const NewsCategoryListingPage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'vi')
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
