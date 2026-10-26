import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/shared/json-ld'
import endpoints from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import { webPageSchema } from '@/lib/schema'
import homepageService from '@/services/homepage'
import metadataValues from '@/utils/metadataValues'
import HomePageView from '@/views/homepage'

type Props = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    endpoints.homepage.rank_math[locale as keyof typeof endpoints.homepage.rank_math],
  )
  const t = await getTranslations({ locale, namespace: 'Meta' })
  return metadataValues(res, { locale, description: t('homeDesc') })
}

const HomePage = async ({ params }: Props) => {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const lang = locale === 'en' ? 'en' : 'vi'

  const [homepageResponse, postListResponse, sectorsResponse, projectsResponse] = await Promise.all(
    [
      homepageService.getHomepage(locale),
      homepageService.getPostList(locale),
      homepageService.getSectors(locale),
      homepageService.getProjects(locale),
    ],
  )

  return (
    <>
      <JsonLd
        data={webPageSchema({
          domain: ENV.DOMAIN,
          locale: lang,
          path: '/',
          name: t('homeTitle'),
          description: t('homeDesc'),
        })}
      />
      <HomePageView
        homepage={homepageResponse?.acf}
        postList={postListResponse?.data}
        sectors={sectorsResponse?.data}
        projects={projectsResponse?.data}
      />
    </>
  )
}

export default HomePage
