import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { assertPageLocale } from '@/i18n/assert-locale'
import businessFieldService from '@/services/business-field'
import BusinessView from '@/views/business'

export function generateStaticParams() {
  return [{ locale: 'en' as const }]
}
type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return {
    title: t('businessTitle'),
    description: t('businessDesc'),
  }
}

const BusinessPage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'en')
  setRequestLocale(locale)

  const [pageResponse, sectorsResponse] = await Promise.all([
    businessFieldService.getBusinessField(locale),
    businessFieldService.getSectors(locale),
  ])

  return (
    <BusinessView
      content={pageResponse?.acf}
      sectors={sectorsResponse?.data ?? []}
    />
  )
}

export default BusinessPage
