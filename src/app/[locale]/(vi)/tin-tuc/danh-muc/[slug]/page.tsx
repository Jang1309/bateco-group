import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { routing } from '@/i18n/routing'
import NewsCategoryView from '@/views/news/category'
import { getCategoryTitle, NEWS_CATEGORIES } from '@/views/news/data'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    NEWS_CATEGORIES.map((category) => ({ locale, slug: category.id })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const title = getCategoryTitle(slug)
  if (!title) return {}

  return {
    title: `${title} | Tin tức | Bateco Group`,
    description: `Tin tức chuyên mục ${title} của Bateco Group.`,
  }
}

const NewsCategoryPage = async ({ params }: Props) => {
  const { locale, slug } = await params
  setRequestLocale(locale)

  if (!getCategoryTitle(slug)) notFound()

  return <NewsCategoryView categoryId={slug} />
}

export default NewsCategoryPage
