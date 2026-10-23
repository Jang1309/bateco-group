import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { routing } from '@/i18n/routing'
import { ARTICLE_SLUGS, getNewsDetail } from '@/views/news/data'
import NewsDetailView from '@/views/news/detail'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => ARTICLE_SLUGS.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  // TODO: fetch SEO/content theo locale từ CMS/API
  const article = getNewsDetail(slug)
  if (!article) return {}

  return {
    title: `${article.title} | Bateco Group`,
    description: article.excerpt,
    openGraph: { images: [article.image] },
  }
}

const NewsDetailPage = async ({ params }: Props) => {
  const { locale, slug } = await params
  setRequestLocale(locale)

  // TODO: fetch article theo `locale` từ CMS/API
  const article = getNewsDetail(slug)
  if (!article) notFound()

  return <NewsDetailView article={article} />
}

export default NewsDetailPage
