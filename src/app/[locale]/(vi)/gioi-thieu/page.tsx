import { assertPageLocale } from '@/i18n/assert-locale'
import introductionService from '@/services/introduction'
import AboutView from '@/views/about'

export function generateStaticParams() {
  return [{ locale: 'vi' as const }]
}
type Props = {
  params: Promise<{ locale: string }>
}

const AboutPage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'vi')
  const introductionResponse = await introductionService.getIntroduction(locale)

  return (
    <AboutView
      locale={locale}
      content={introductionResponse?.acf}
    />
  )
}

export default AboutPage
