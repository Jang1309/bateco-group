import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import NewsView from '@/views/news'

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

  return <NewsView />
}

export default NewsPage
