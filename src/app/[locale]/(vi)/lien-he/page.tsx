import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import contactService from '@/services/contact'
import ContactView from '@/views/contact'

export const metadata: Metadata = {
  title: 'Liên hệ | Bateco Group',
  description:
    'Liên hệ Bateco Group — trụ sở Hà Nội và các chi nhánh. Kết nối với đội ngũ để được tư vấn nhanh chóng.',
}

type Props = {
  params: Promise<{ locale: string }>
}

const ContactPage = async ({ params }: Props) => {
  const { locale } = await params
  setRequestLocale(locale)

  const pageResponse = await contactService.getContactPage(locale).catch(() => null)

  return <ContactView content={pageResponse?.acf} />
}

export default ContactPage
