import introductionService from '@/services/introduction'
import AboutView from '@/views/about'

type Props = {
  params: Promise<{ locale: string }>
}

const AboutPage = async ({ params }: Props) => {
  const { locale } = await params
  const introductionResponse = await introductionService.getIntroduction(locale)

  return <AboutView content={introductionResponse?.acf} />
}

export default AboutPage
