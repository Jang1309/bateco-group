import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { routing } from '@/i18n/routing'
import businessFieldService from '@/services/business-field'
import siteSettingService from '@/services/site-setting'
import BusinessDetailView from '@/views/business-detail'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const response = await businessFieldService.getSectors(routing.defaultLocale)
    const sectors = response?.data ?? []

    return routing.locales.flatMap((locale) =>
      sectors
        .map((sector) => sector.slug)
        .filter((slug): slug is string => Boolean(slug))
        .map((slug) => ({ locale, slug })),
    )
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params

  try {
    const response = await businessFieldService.getDetail(slug, locale)
    const sector = response?.data
    if (!sector) return {}

    return {
      title: `${sector.name} | Bateco Group`,
      description: sector.acf?.banner?.desc || sector.description || undefined,
    }
  } catch {
    return {}
  }
}

const BusinessDetailPage = async ({ params }: Props) => {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const [detailResult, projectsResult, siteSettingResult] = await Promise.allSettled([
    businessFieldService.getDetail(slug, locale),
    businessFieldService.getProjects(locale, slug),
    siteSettingService.getSiteSettings(locale),
  ])

  const sector = detailResult.status === 'fulfilled' ? detailResult.value?.data : undefined
  if (!sector) notFound()

  const projects = projectsResult.status === 'fulfilled' ? (projectsResult.value?.data ?? []) : []
  const siteData =
    siteSettingResult.status === 'fulfilled' ? siteSettingResult.value?.data : undefined

  return (
    <BusinessDetailView
      sector={sector}
      projects={projects}
      ecosystem={siteData?.ecosystem}
      contact={siteData?.contact}
    />
  )
}

export default BusinessDetailPage
