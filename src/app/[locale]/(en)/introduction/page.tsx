import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { assertPageLocale } from '@/i18n/assert-locale'
import introductionService from '@/services/introduction'
import AboutView from '@/views/about'

export const metadata: Metadata = {
  title: 'About | Bateco Group',
  description:
    'Learn about Bateco Group — vision, leadership, history and our multi-sector ecosystem.',
}

export function generateStaticParams() {
  return [{ locale: 'en' as const }]
}
type Props = {
  params: Promise<{ locale: string }>
}

const AboutPage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'en')
  setRequestLocale(locale)

  const introductionResponse = await introductionService.getIntroduction(locale)

  return (
    <AboutView
      locale={locale}
      content={introductionResponse?.acf}
    />
  )
}

export default AboutPage
