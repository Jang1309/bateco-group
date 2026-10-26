import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import endpoints from '@/configs/endpoints'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import { assertPageLocale } from '@/i18n/assert-locale'
import administrativeDocumentService from '@/services/administrative-document'
import metadataValues from '@/utils/metadataValues'
import AboutGovernanceView from '@/views/about-governance'

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
    endpoints.administrativeDocument.rank_math[
      locale as keyof typeof endpoints.administrativeDocument.rank_math
    ],
  )
  const t = await getTranslations({ locale, namespace: 'Meta' })
  return metadataValues(res, { locale, description: t('governanceDesc') })
}

const AboutGovernancePage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'vi')

  const [pageResponse, categoriesResponse] = await Promise.all([
    administrativeDocumentService.getAdministrativeDocument(locale),
    administrativeDocumentService.getCategories(locale),
  ])

  return (
    <AboutGovernanceView
      locale={locale}
      content={pageResponse?.acf}
      categories={categoriesResponse?.data ?? []}
    />
  )
}

export default AboutGovernancePage
