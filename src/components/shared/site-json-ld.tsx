import JsonLd from '@/components/shared/json-ld'
import ENV from '@/configs/env'
import { organizationSchema, schemaGraph, webSiteSchema, type SchemaLocale } from '@/lib/schema'

type SiteJsonLdProps = {
  locale: string
  logo?: string | null
}

/** Sitewide Organization + WebSite JSON-LD (once per document via site layout). */
const SiteJsonLd = ({ locale, logo }: SiteJsonLdProps) => {
  const lang: SchemaLocale = locale === 'en' ? 'en' : 'vi'
  const domain = ENV.DOMAIN

  return (
    <JsonLd data={schemaGraph(organizationSchema(domain, logo), webSiteSchema(domain, lang))} />
  )
}

export default SiteJsonLd
