import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import businessFieldService from '@/services/business-field'
import BusinessView from '@/views/business'

export const metadata: Metadata = {
  title: 'Lĩnh vực kinh doanh | Bateco Group',
  description:
    'Hệ sinh thái đa ngành của Bateco Group: Dịch vụ công nghiệp, Bất động sản - Hạ tầng công nghiệp, An ninh - Quốc phòng, Kinh tế xanh và Sản xuất - Vật liệu mới.',
}

type Props = {
  params: Promise<{ locale: string }>
}

const BusinessPage = async ({ params }: Props) => {
  const { locale } = await params
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
