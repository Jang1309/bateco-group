import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/shared/json-ld'
import endpoints from '@/configs/endpoints'
import ENV from '@/configs/env'
import { hrefFor } from '@/configs/routes'
import { getMetaDataSeoApi } from '@/fetches/getMetaDataRankMath'
import { assertPageLocale } from '@/i18n/assert-locale'
import { routing } from '@/i18n/routing'
import { breadcrumbSchema, schemaGraph, serviceSchema } from '@/lib/schema'
import businessFieldService from '@/services/business-field'
import siteSettingService from '@/services/site-setting'
import metadataValues from '@/utils/metadataValues'
import BusinessDetailView from '@/views/business-detail'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const response = await businessFieldService.getSectors(routing.defaultLocale)
    const sectors = response?.data ?? []

    return sectors
      .map((sector) => sector.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({ locale: 'vi' as const, slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const res = await getMetaDataSeoApi(endpoints.businessField.rank_math_detail(slug, locale))
  return metadataValues(res, { locale })
}

const BusinessDetailPage = async ({ params }: Props) => {
  const { locale, slug } = await params
  assertPageLocale(locale, 'vi')
  setRequestLocale(locale)

  const [detailResult, projectsResult, siteSettingResult] = await Promise.allSettled([
    businessFieldService.getDetail(slug, locale),
    businessFieldService.getProjects(locale, slug),
    siteSettingService.getSiteSettings(locale),
  ])

  const sector = detailResult.status === 'fulfilled' ? detailResult.value?.data : undefined
  if (!sector) notFound()

  const t = await getTranslations({ locale, namespace: 'Meta' })
  const slugValue = sector.slug || slug
  const path = hrefFor('businessDetail', locale, { slug: slugValue })
  const businessPath = hrefFor('business', locale)
  const projects = projectsResult.status === 'fulfilled' ? (projectsResult.value?.data ?? []) : []
  const siteData =
    siteSettingResult.status === 'fulfilled' ? siteSettingResult.value?.data : undefined

  return (
    <>
      <JsonLd
        data={schemaGraph(
          serviceSchema({
            domain: ENV.DOMAIN,
            locale: 'vi',
            path,
            name: sector.name || slugValue,
            description: sector.acf?.banner?.desc || sector.description,
            image: sector.acf?.banner?.image,
          }),
          breadcrumbSchema(ENV.DOMAIN, 'vi', [
            { name: 'Bateco Group', path: '/' },
            { name: t('businessTitle').split('|')[0]!.trim(), path: businessPath },
            { name: sector.name || slugValue, path },
          ]),
        )}
      />
      <BusinessDetailView
        locale={locale}
        sector={sector}
        projects={projects}
        ecosystem={siteData?.ecosystem}
        contact={siteData?.contact}
      />
    </>
  )
}

export default BusinessDetailPage
