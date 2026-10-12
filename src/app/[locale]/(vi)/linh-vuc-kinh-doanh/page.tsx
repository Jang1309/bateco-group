import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

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

  return <BusinessView />
}

export default BusinessPage
