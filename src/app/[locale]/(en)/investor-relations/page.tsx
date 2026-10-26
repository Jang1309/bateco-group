import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/shared/json-ld'
import endpoints from '@/configs/endpoints'
import ENV from '@/configs/env'
import { hrefFor } from '@/configs/routes'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import { assertPageLocale } from '@/i18n/assert-locale'
import { collectionPageGraph } from '@/lib/schema'
import investorRelationsService from '@/services/investor-relations'
import metadataValues from '@/utils/metadataValues'
import InvestorRelationsView from '@/views/investor-relations'

export function generateStaticParams() {
  return [{ locale: 'en' as const }]
}
type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    endpoints.investorRelations.rank_math[
      locale as keyof typeof endpoints.investorRelations.rank_math
    ],
  )
  const t = await getTranslations({ locale, namespace: 'Meta' })
  return metadataValues(res, { locale, description: t('investorDesc') })
}

const InvestorPage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'en')
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const path = hrefFor('investor', locale)

  const [pageResponse, categoriesResponse] = await Promise.all([
    investorRelationsService.getInvestorRelations(locale),
    investorRelationsService.getCategories(locale),
  ])

  return (
    <>
      <JsonLd
        data={collectionPageGraph({
          domain: ENV.DOMAIN,
          locale: 'en',
          path,
          name: t('investorTitle'),
          description: t('investorDesc'),
          crumbName: t('investorTitle').split('|')[0]!.trim(),
        })}
      />
      <InvestorRelationsView
        locale={locale}
        content={pageResponse?.acf}
        categories={categoriesResponse?.data ?? []}
      />
    </>
  )
}

export default InvestorPage
