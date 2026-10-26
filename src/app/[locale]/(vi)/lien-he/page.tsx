import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { assertPageLocale } from '@/i18n/assert-locale'
import contactService from '@/services/contact'
import ContactView from '@/views/contact'

export function generateStaticParams() {
  return [{ locale: 'vi' as const }]
}
type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return {
    title: t('contactTitle'),
    description: t('contactDesc'),
  }
}

const ContactPage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'vi')
  setRequestLocale(locale)

  const pageResponse = await contactService.getContactPage(locale).catch(() => null)

  return <ContactView content={pageResponse?.acf} />
}

export default ContactPage
