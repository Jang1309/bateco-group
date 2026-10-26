const SITE_NAME = 'Bateco Group'
const CONTEXT = 'https://schema.org'

export type SchemaLocale = 'vi' | 'en'

export type BreadcrumbItem = {
  name: string
  /** Locale path, e.g. `/tin-tuc` or `/` */
  path: string
}

export type JsonLd = Record<string, unknown>

function siteBase(domain: string): string {
  return domain.replace(/\/+$/, '')
}

/** Mirrors `absolutePublicUrl` — kept local so node tests need no path alias. */
function abs(domain: string, locale: SchemaLocale, path: string): string {
  const base = siteBase(domain)
  const normalized = path.startsWith('/') ? path : `/${path}`
  const bare = normalized === '/' ? '' : normalized
  if (locale === 'en') return bare ? `${base}/en${bare}` : `${base}/en`
  return bare ? `${base}${bare}` : base
}

function absAsset(domain: string, url?: string | null): string | undefined {
  if (!url) return undefined
  if (/^https?:\/\//i.test(url)) return url
  const base = siteBase(domain)
  return url.startsWith('/') ? `${base}${url}` : `${base}/${url}`
}

function toIsoDate(value?: string | null): string | undefined {
  if (!value) return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined
  // Already ISO-like — prefer date portion for timezone-stable output
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    return trimmed.slice(0, 10)
  }
  // dd/MM/yyyy or dd-MM-yyyy → YYYY-MM-DD
  const m = trimmed.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/)
  if (m) {
    const dd = m[1]!.padStart(2, '0')
    const mm = m[2]!.padStart(2, '0')
    return `${m[3]}-${mm}-${dd}`
  }
  const d = new Date(trimmed)
  if (Number.isNaN(d.getTime())) return undefined
  return d.toISOString().slice(0, 10)
}

function mapEmploymentType(value?: string | null): string | undefined {
  if (!value) return undefined
  const key = value
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, '_')
  if (key.includes('FULL')) return 'FULL_TIME'
  if (key.includes('PART')) return 'PART_TIME'
  if (key.includes('CONTRACT') || key.includes('HOP_DONG')) return 'CONTRACTOR'
  if (key.includes('TEMP') || key.includes('THOI_VU')) return 'TEMPORARY'
  if (key.includes('INTERN') || key.includes('THUC_TAP')) return 'INTERN'
  return undefined
}

/** Organization — sitewide identity */
export function organizationSchema(domain: string, logoUrl?: string | null): JsonLd {
  const base = siteBase(domain)
  const logo = absAsset(domain, logoUrl) || `${base}/logo.png`

  return {
    '@context': CONTEXT,
    '@type': 'Organization',
    '@id': `${base}/#organization`,
    name: SITE_NAME,
    url: base,
    logo: {
      '@type': 'ImageObject',
      url: logo,
    },
  }
}

/** WebSite — helps Google understand the brand property */
export function webSiteSchema(domain: string, locale: SchemaLocale): JsonLd {
  const base = siteBase(domain)
  const url = abs(domain, locale, '/')

  return {
    '@context': CONTEXT,
    '@type': 'WebSite',
    '@id': `${base}/#website`,
    name: SITE_NAME,
    url,
    inLanguage: locale === 'en' ? 'en' : 'vi',
    publisher: { '@id': `${base}/#organization` },
  }
}

export function webPageSchema(input: {
  domain: string
  locale: SchemaLocale
  path: string
  name: string
  description?: string
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'
}): JsonLd {
  const base = siteBase(input.domain)
  const url = abs(input.domain, input.locale, input.path)

  return {
    '@context': CONTEXT,
    '@type': input.type || 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    isPartOf: { '@id': `${base}/#website` },
    about: { '@id': `${base}/#organization` },
    inLanguage: input.locale === 'en' ? 'en' : 'vi',
  }
}

export function breadcrumbSchema(
  domain: string,
  locale: SchemaLocale,
  items: BreadcrumbItem[],
): JsonLd {
  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: abs(domain, locale, item.path),
    })),
  }
}

export function newsArticleSchema(input: {
  domain: string
  locale: SchemaLocale
  path: string
  title: string
  description?: string
  image?: string
  datePublished?: string | null
  dateModified?: string | null
}): JsonLd {
  const base = siteBase(input.domain)
  const url = abs(input.domain, input.locale, input.path)
  const image = absAsset(input.domain, input.image)
  const published = toIsoDate(input.datePublished)
  const modified = toIsoDate(input.dateModified) || published

  return {
    '@context': CONTEXT,
    '@type': 'NewsArticle',
    '@id': `${url}#article`,
    headline: input.title,
    ...(input.description ? { description: input.description } : {}),
    mainEntityOfPage: url,
    url,
    ...(image ? { image: [image] } : {}),
    ...(published ? { datePublished: published } : {}),
    ...(modified ? { dateModified: modified } : {}),
    author: { '@id': `${base}/#organization` },
    publisher: { '@id': `${base}/#organization` },
    inLanguage: input.locale === 'en' ? 'en' : 'vi',
  }
}

export function projectSchema(input: {
  domain: string
  locale: SchemaLocale
  path: string
  title: string
  description?: string
  image?: string
  datePublished?: string | null
}): JsonLd {
  const base = siteBase(input.domain)
  const url = abs(input.domain, input.locale, input.path)
  const image = absAsset(input.domain, input.image)
  const published = toIsoDate(input.datePublished)

  return {
    '@context': CONTEXT,
    '@type': 'CreativeWork',
    '@id': `${url}#project`,
    name: input.title,
    ...(input.description ? { description: input.description } : {}),
    url,
    ...(image ? { image } : {}),
    ...(published ? { datePublished: published } : {}),
    creator: { '@id': `${base}/#organization` },
    inLanguage: input.locale === 'en' ? 'en' : 'vi',
  }
}

export function jobPostingSchema(input: {
  domain: string
  locale: SchemaLocale
  path: string
  title: string
  description?: string
  datePosted?: string | null
  validThrough?: string | null
  employmentType?: string | null
  hiringOrganizationName?: string
  jobLocationName?: string
  baseSalary?: string | null
}): JsonLd {
  const base = siteBase(input.domain)
  const url = abs(input.domain, input.locale, input.path)
  const employmentType = mapEmploymentType(input.employmentType)
  const posted = toIsoDate(input.datePosted) || new Date().toISOString()
  const validThrough = toIsoDate(input.validThrough)

  const description = (input.description || input.title)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const schema: JsonLd = {
    '@context': CONTEXT,
    '@type': 'JobPosting',
    '@id': `${url}#job`,
    title: input.title,
    description,
    datePosted: posted,
    ...(validThrough ? { validThrough } : {}),
    ...(employmentType ? { employmentType } : {}),
    hiringOrganization: {
      '@type': 'Organization',
      '@id': `${base}/#organization`,
      name: input.hiringOrganizationName || SITE_NAME,
      sameAs: base,
    },
    identifier: {
      '@type': 'PropertyValue',
      name: SITE_NAME,
      value: url,
    },
    directApply: true,
    url,
  }

  if (input.jobLocationName) {
    schema.jobLocation = {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: input.jobLocationName,
        addressCountry: 'VN',
      },
    }
  }

  // Only emit QuantitativeValue when we can parse a number; otherwise skip salary
  if (input.baseSalary) {
    const digits = input.baseSalary.replace(/[^\d]/g, '')
    if (digits) {
      schema.baseSalary = {
        '@type': 'MonetaryAmount',
        currency: 'VND',
        value: {
          '@type': 'QuantitativeValue',
          value: Number(digits),
          unitText: 'MONTH',
        },
      }
    }
  }

  return schema
}

export function serviceSchema(input: {
  domain: string
  locale: SchemaLocale
  path: string
  name: string
  description?: string
  image?: string
}): JsonLd {
  const base = siteBase(input.domain)
  const url = abs(input.domain, input.locale, input.path)
  const image = absAsset(input.domain, input.image)

  return {
    '@context': CONTEXT,
    '@type': 'Service',
    '@id': `${url}#service`,
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    url,
    ...(image ? { image } : {}),
    provider: { '@id': `${base}/#organization` },
    areaServed: 'VN',
  }
}

/** Collection / listing page + breadcrumb graph. */
export function collectionPageGraph(input: {
  domain: string
  locale: SchemaLocale
  path: string
  name: string
  description?: string
  crumbName: string
}): JsonLd | null {
  return schemaGraph(
    webPageSchema({
      domain: input.domain,
      locale: input.locale,
      path: input.path,
      name: input.name,
      description: input.description,
      type: 'CollectionPage',
    }),
    breadcrumbSchema(input.domain, input.locale, [
      { name: SITE_NAME, path: '/' },
      { name: input.crumbName, path: input.path },
    ]),
  )
}

/** Merge several nodes into one @graph script (single script tag). */
export function schemaGraph(...nodes: Array<JsonLd | null | undefined>): JsonLd | null {
  const graph = nodes.filter((node): node is JsonLd => Boolean(node))
  if (graph.length === 0) return null
  if (graph.length === 1) return graph[0]!

  return {
    '@context': CONTEXT,
    '@graph': graph.map((node) => {
      const { '@context': _ctx, ...rest } = node
      return rest
    }),
  }
}
