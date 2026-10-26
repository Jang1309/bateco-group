import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import homepageService from '@/services/homepage'
import HomePageView from '@/views/homepage'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return {
    title: t('homeTitle'),
    description: t('homeDesc'),
  }
}

const HomePage = async ({ params }: Props) => {
  const { locale } = await params
  setRequestLocale(locale)

  const [homepageResponse, postListResponse, sectorsResponse, projectsResponse] = await Promise.all(
    [
      homepageService.getHomepage(locale),
      homepageService.getPostList(locale),
      homepageService.getSectors(locale),
      homepageService.getProjects(locale),
    ],
  )

  return (
    <HomePageView
      homepage={homepageResponse?.acf}
      postList={postListResponse?.data}
      sectors={sectorsResponse?.data}
      projects={projectsResponse?.data}
    />
  )
}

export default HomePage
