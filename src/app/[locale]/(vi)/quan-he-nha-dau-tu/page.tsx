import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import investorRelationsService from '@/services/investor-relations'
import InvestorRelationsView from '@/views/investor-relations'

export const metadata: Metadata = {
  title: 'Quan hệ nhà đầu tư | Bateco Group',
  description:
    'Tài liệu Đại hội đồng cổ đông, hồ sơ công ty, công bố thông tin, thư viện và sự kiện nhà đầu tư của Bateco Group.',
}

type Props = {
  params: Promise<{ locale: string }>
}

const InvestorPage = async ({ params }: Props) => {
  const { locale } = await params
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
