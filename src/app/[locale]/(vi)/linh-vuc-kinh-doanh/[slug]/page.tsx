import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { routing } from '@/i18n/routing'
import BusinessDetailView from '@/views/business-detail'
import { getSectorDetail, SECTOR_DETAILS } from '@/views/business-detail/data'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

// Slug sector từ CMS có thể lệch mock data — cho runtime notFound() thay vì 404 HTML.
export const dynamicParams = true

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SECTOR_DETAILS.map((sector) => ({ locale, slug: sector.slug })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const sector = getSectorDetail(slug)
  if (!sector) return {}

  return {
    title: `${sector.name} | Bateco Group`,
    description: sector.hero.description,
  }
}

const BusinessDetailPage = async ({ params }: Props) => {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const sector = getSectorDetail(slug)
  if (!sector) notFound()

  return <BusinessDetailView sector={sector} />
}

export default BusinessDetailPage
