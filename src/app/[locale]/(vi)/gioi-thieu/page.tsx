import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import AboutView from '@/views/about'
import { ABOUT_CONTENT } from '@/views/about/data'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  // TODO: fetch SEO theo locale từ CMS/API
  if (locale === 'en') {
    return {
      title: 'About | Bateco Group',
      description:
        'Bateco Group: a multi-sector investment group built on execution capability and lasting value.',
    }
  }
  return {
    title: 'Giới thiệu | Bateco Group',
    description:
      'Bateco Group: tập đoàn đầu tư đa ngành, phát triển bằng năng lực thực thi và giá trị bền vững. Tầm nhìn, sứ mệnh, ban lãnh đạo, lịch sử và hệ sinh thái Bateco.',
  }
}

const AboutPage = async ({ params }: Props) => {
  const { locale } = await params
  setRequestLocale(locale)

  // TODO: fetch content theo locale từ CMS/API
  return <AboutView content={ABOUT_CONTENT} />
}

export default AboutPage
