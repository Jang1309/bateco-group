import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { assertPageLocale } from '@/i18n/assert-locale'
import careersService from '@/services/careers'
import CareersView from '@/views/careers'

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
    title: t('careersTitle'),
    description: t('careersDesc'),
  }
}

const CareersPage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'en')
  setRequestLocale(locale)

  const [pageResponse, departmentsResponse, locationsResponse] = await Promise.all([
    careersService.getCareersPage(locale).catch(() => null),
    careersService.getDepartments(locale).catch(() => null),
    careersService.getLocations(locale).catch(() => null),
  ])

  return (
    <CareersView
      locale={locale}
      content={pageResponse?.acf}
      departments={departmentsResponse?.data ?? []}
      locations={locationsResponse?.data ?? []}
    />
  )
}

export default CareersPage
