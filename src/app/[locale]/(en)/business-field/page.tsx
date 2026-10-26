import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/shared/json-ld'
import endpoints from '@/configs/endpoints'
import ENV from '@/configs/env'
import { hrefFor } from '@/configs/routes'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import { assertPageLocale } from '@/i18n/assert-locale'
import { collectionPageGraph } from '@/lib/schema'
import businessFieldService from '@/services/business-field'
import metadataValues from '@/utils/metadataValues'
import BusinessView from '@/views/business'

export function generateStaticParams() {
  return [{ locale: 'en' as const }]
}
type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    endpoints.businessField.rank_math[locale as keyof typeof endpoints.businessField.rank_math],
  )
  const t = await getTranslations({ locale, namespace: 'Meta' })
  return metadataValues(res, { locale, description: t('businessDesc') })
}

const BusinessPage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'en')
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const path = hrefFor('business', locale)

  const [pageResponse, sectorsResponse] = await Promise.all([
    businessFieldService.getBusinessField(locale),
    businessFieldService.getSectors(locale),
  ])

  return (
    <>
      <JsonLd
        data={collectionPageGraph({
          domain: ENV.DOMAIN,
          locale: 'en',
          path,
          name: t('businessTitle'),
          description: t('businessDesc'),
          crumbName: t('businessTitle').split('|')[0]!.trim(),
        })}
      />
      <BusinessView
        content={pageResponse?.acf}
        sectors={sectorsResponse?.data ?? []}
      />
    </>
  )
}

export default BusinessPage
