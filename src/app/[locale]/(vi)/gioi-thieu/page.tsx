import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import JsonLd from '@/components/shared/json-ld'
import endpoints from '@/configs/endpoints'
import ENV from '@/configs/env'
import { hrefFor } from '@/configs/routes'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import { assertPageLocale } from '@/i18n/assert-locale'
import { breadcrumbSchema, schemaGraph, webPageSchema } from '@/lib/schema'
import introductionService from '@/services/introduction'
import metadataValues from '@/utils/metadataValues'
import AboutView from '@/views/about'

export function generateStaticParams() {
  return [{ locale: 'vi' as const }]
}
type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    endpoints.introduction.rank_math[locale as keyof typeof endpoints.introduction.rank_math],
  )
  const t = await getTranslations({ locale, namespace: 'Meta' })
  return metadataValues(res, { locale, description: t('homeDesc') })
}

const AboutPage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'vi')
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const path = hrefFor('about', locale)
  const introductionResponse = await introductionService.getIntroduction(locale)

  return (
    <>
      <JsonLd
        data={schemaGraph(
          webPageSchema({
            domain: ENV.DOMAIN,
            locale: 'vi',
            path,
            name: 'Giới thiệu | Bateco Group',
            description: t('homeDesc'),
            type: 'AboutPage',
          }),
          breadcrumbSchema(ENV.DOMAIN, 'vi', [
            { name: 'Bateco Group', path: '/' },
            { name: 'Giới thiệu', path },
          ]),
        )}
      />
      <AboutView
        locale={locale}
        content={introductionResponse?.acf}
      />
    </>
  )
}

export default AboutPage
