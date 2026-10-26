import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { localePathsFor } from '@/configs/routes'
import { assertPageLocale } from '@/i18n/assert-locale'
import newsService from '@/services/news'
import metadataValues from '@/utils/metadataValues'
import { mapNewsCategories } from '@/views/news/build-category-blocks'
import NewsCategoryView from '@/views/news/category'

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
    ...metadataValues(null, {
      locale,
      description: t('newsCategoryDesc'),
      ...localePathsFor('newsCategory', locale),
    }),
    title: t('newsCategoryTitle'),
    robots: 'noindex, follow',
  }
}

const NewsCategoryListingPage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'en')
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
