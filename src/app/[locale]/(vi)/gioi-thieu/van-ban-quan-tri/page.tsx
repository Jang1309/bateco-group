import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import AboutGovernanceView from '@/views/about-governance'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ 'danh-muc'?: string; trang?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (locale === 'en') {
    return {
      title: 'Governance Documents | Bateco Group',
      description:
        'Company charter, internal governance regulations, board and audit committee operating rules, and information disclosure policy.',
    }
  }
  return {
    title: 'Văn bản quản trị | Bateco Group',
    description:
      'Điều lệ công ty, quy chế nội bộ về quản trị, quy chế HĐQT, UBKT, kiểm toán nội bộ và công bố thông tin của Bateco Group.',
  }
}

const AboutGovernancePage = async ({ params, searchParams }: Props) => {
  const { locale } = await params
  setRequestLocale(locale)

  const { 'danh-muc': categoryId, trang } = await searchParams
  const page = Number.parseInt(trang ?? '1', 10) || 1

  return (
    <AboutGovernanceView
      categoryId={categoryId}
      page={page}
    />
  )
}

export default AboutGovernancePage
