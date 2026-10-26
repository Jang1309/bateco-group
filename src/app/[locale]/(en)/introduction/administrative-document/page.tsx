import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { assertPageLocale } from '@/i18n/assert-locale'
import administrativeDocumentService from '@/services/administrative-document'
import AboutGovernanceView from '@/views/about-governance'

export const metadata: Metadata = {
  title: 'Governance Documents | Bateco Group',
  description: 'Corporate governance documents and policies of Bateco Group.',
}

export function generateStaticParams() {
  return [{ locale: 'en' as const }]
}
type Props = {
  params: Promise<{ locale: string }>
}

const AboutGovernancePage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'en')
  setRequestLocale(locale)

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
