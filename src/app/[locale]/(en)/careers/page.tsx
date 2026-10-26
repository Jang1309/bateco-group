import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/shared/json-ld'
import endpoints from '@/configs/endpoints'
import ENV from '@/configs/env'
import { hrefFor, localePathsFor } from '@/configs/routes'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import { assertPageLocale } from '@/i18n/assert-locale'
import { collectionPageGraph } from '@/lib/schema'
import careersService from '@/services/careers'
import metadataValues from '@/utils/metadataValues'
import CareersView from '@/views/careers'

export function generateStaticParams() {
  return [{ locale: 'en' as const }]
}
type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    endpoints.careers.rank_math[locale as keyof typeof endpoints.careers.rank_math],
  )
  const t = await getTranslations({ locale, namespace: 'Meta' })
  return metadataValues(res, {
    locale,
    description: t('careersDesc'),
    ...localePathsFor('careers', locale),
  })
}

const CareersPage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'en')
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const path = hrefFor('careers', locale)

  const [pageResponse, departmentsResponse, locationsResponse] = await Promise.all([
    careersService.getCareersPage(locale).catch(() => null),
    careersService.getDepartments(locale).catch(() => null),
    careersService.getLocations(locale).catch(() => null),
  ])

  return (
    <>
      <JsonLd
        data={collectionPageGraph({
          domain: ENV.DOMAIN,
          locale: 'en',
          path,
          name: t('careersTitle'),
          description: t('careersDesc'),
          crumbName: t('careersTitle').split('|')[0]!.trim(),
        })}
      />
      <CareersView
        locale={locale}
        content={pageResponse?.acf}
        departments={departmentsResponse?.data ?? []}
        locations={locationsResponse?.data ?? []}
      />
    </>
  )
}

export default CareersPage
