import administrativeDocumentService from '@/services/administrative-document'
import AboutGovernanceView from '@/views/about-governance'

type Props = {
  params: Promise<{ locale: string }>
}

const AboutGovernancePage = async ({ params }: Props) => {
  const { locale } = await params

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
