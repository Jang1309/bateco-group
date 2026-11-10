import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/shared/json-ld'
import ENV from '@/configs/env'
import { hrefFor, localePathsFor } from '@/configs/routes'
import { assertPageLocale } from '@/i18n/assert-locale'
import { breadcrumbSchema, schemaGraph, webPageSchema } from '@/lib/schema'
import metadataValues from '@/utils/metadataValues'
import PrivacyPolicyView from '@/views/privacy-policy'

export function generateStaticParams() {
  return [{ locale: 'vi' as const }]
}
type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  // No CMS page/RankMath entry yet — build head from translations.
  return metadataValues(
    {
      title: t('privacyTitle'),
      description: t('privacyDesc'),
      openGraph: { type: 'website' },
    },
    { locale, ...localePathsFor('privacy', locale) },
  )
}

const PrivacyPolicyPage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'vi')
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const path = hrefFor('privacy', locale)

  return (
    <>
      <JsonLd
        data={schemaGraph(
          webPageSchema({
            domain: ENV.DOMAIN,
            locale: 'vi',
            path,
            name: t('privacyTitle'),
            description: t('privacyDesc'),
          }),
          breadcrumbSchema(ENV.DOMAIN, 'vi', [
            { name: 'Bateco Group', path: '/' },
            { name: t('privacyTitle').split('|')[0]!.trim(), path },
          ]),
        )}
      />
      <PrivacyPolicyView />
    </>
  )
}

export default PrivacyPolicyPage
