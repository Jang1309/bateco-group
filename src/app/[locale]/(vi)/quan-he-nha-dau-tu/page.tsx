import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import GovernanceView from '@/views/governance'

export const metadata: Metadata = {
  title: 'Quan hệ nhà đầu tư | Bateco Group',
  description:
    'Tài liệu Đại hội đồng cổ đông, hồ sơ công ty, công bố thông tin, thư viện và sự kiện nhà đầu tư của Bateco Group.',
}

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ 'danh-muc'?: string; trang?: string }>
}

const InvestorPage = async ({ params, searchParams }: Props) => {
  const { locale } = await params
  setRequestLocale(locale)

  const { 'danh-muc': categoryId, trang } = await searchParams
  const page = Number.parseInt(trang ?? '1', 10) || 1

  return (
    <GovernanceView
      categoryId={categoryId}
      page={page}
    />
  )
}

export default InvestorPage
