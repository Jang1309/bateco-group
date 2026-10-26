import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { assertPageLocale } from '@/i18n/assert-locale'
import investorRelationsService from '@/services/investor-relations'
import InvestorRelationsView from '@/views/investor-relations'

export function generateStaticParams() {
  return [{ locale: 'vi' as const }]
}
type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return {
    title: t('investorTitle'),
    description: t('investorDesc'),
  }
}

const InvestorPage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'vi')
  setRequestLocale(locale)

  const [pageResponse, categoriesResponse] = await Promise.all([
    investorRelationsService.getInvestorRelations(locale),
    investorRelationsService.getCategories(locale),
  ])

  return (
    <InvestorRelationsView
      locale={locale}
      content={pageResponse?.acf}
      categories={categoriesResponse?.data ?? []}
    />
  )
}

export default InvestorPage
