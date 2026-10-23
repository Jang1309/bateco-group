import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import ContactView from '@/views/contact'

export const metadata: Metadata = {
  title: 'Liên hệ | Bateco Group',
  description:
    'Liên hệ Bateco Group — trụ sở Hà Nội và các chi nhánh. Kết nối với đội ngũ để được tư vấn nhanh chóng, bảo mật thông tin.',
}

type Props = {
  params: Promise<{ locale: string }>
}

const ContactPage = async ({ params }: Props) => {
  const { locale } = await params
  setRequestLocale(locale)

  return <ContactView />
}

export default ContactPage
