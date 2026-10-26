import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/shared/json-ld'
import endpoints from '@/configs/endpoints'
import ENV from '@/configs/env'
import { hrefFor, localePathsFor } from '@/configs/routes'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import { assertPageLocale } from '@/i18n/assert-locale'
import { breadcrumbSchema, schemaGraph, webPageSchema } from '@/lib/schema'
import contactService from '@/services/contact'
import metadataValues from '@/utils/metadataValues'
import ContactView from '@/views/contact'

export function generateStaticParams() {
  return [{ locale: 'en' as const }]
}
type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    endpoints.contact.rank_math[locale as keyof typeof endpoints.contact.rank_math],
  )
  const t = await getTranslations({ locale, namespace: 'Meta' })
  return metadataValues(res, {
    locale,
    description: t('contactDesc'),
    ...localePathsFor('contact', locale),
  })
}

const ContactPage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'en')
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const path = hrefFor('contact', locale)

  const pageResponse = await contactService.getContactPage(locale).catch(() => null)

  return (
    <>
      <JsonLd
        data={schemaGraph(
          webPageSchema({
            domain: ENV.DOMAIN,
            locale: 'en',
            path,
            name: t('contactTitle'),
            description: t('contactDesc'),
            type: 'ContactPage',
          }),
          breadcrumbSchema(ENV.DOMAIN, 'en', [
            { name: 'Bateco Group', path: '/' },
            { name: t('contactTitle').split('|')[0]!.trim(), path },
          ]),
        )}
      />
      <ContactView content={pageResponse?.acf} />
    </>
  )
}

export default ContactPage
