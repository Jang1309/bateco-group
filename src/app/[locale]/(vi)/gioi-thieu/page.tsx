import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import AboutView from '@/views/about'
import { ABOUT_CONTENT } from '@/views/about/data'

export const metadata: Metadata = {
  title: 'Giới thiệu | Bateco Group',
  description:
    'Bateco Group: tập đoàn đầu tư đa ngành, phát triển bằng năng lực thực thi và giá trị bền vững. Tầm nhìn, sứ mệnh, ban lãnh đạo, lịch sử và hệ sinh thái Bateco.',
}

type Props = {
  params: Promise<{ locale: string }>
}

const AboutPage = async ({ params }: Props) => {
  const { locale } = await params
  setRequestLocale(locale)

  return <AboutView content={ABOUT_CONTENT} />
}

export default AboutPage
