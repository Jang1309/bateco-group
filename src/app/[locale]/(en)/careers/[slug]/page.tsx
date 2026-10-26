import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { assertPageLocale } from '@/i18n/assert-locale'
import careersService from '@/services/careers'
import CareersDetailView from '@/views/careers/detail'
import { mapCareerDetail } from '@/views/careers/map-career'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const response = await careersService.getCareers({
      lang: 'en',
      limit: 50,
      paged: 1,
    })
    const careers = response?.data ?? []

    return careers
      .map((item) => item.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({ locale: 'en', slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params

  try {
    const response = await careersService.getDetail(slug, locale)
    const job = mapCareerDetail(response?.data)
    if (!job) return {}

    return {
      title: `${job.title} | Bateco Group`,
      description:
        job.excerpt ||
        `${job.title}${job.department ? ` — ${job.department}` : ''}${job.location ? `, ${job.location}` : ''}.`,
      openGraph: { images: [job.image] },
    }
  } catch {
    return {}
  }
}

const FALLBACK_BANNER = '/home/vision/d-img-2.jpg'

const CareersDetailPage = async ({ params }: Props) => {
  const { locale, slug } = await params
  assertPageLocale(locale, 'en')
  setRequestLocale(locale)

  const [detailResult, pageResult] = await Promise.all([
    careersService.getDetail(slug, locale).catch(() => null),
    careersService.getCareersPage(locale).catch(() => null),
  ])

  const job = mapCareerDetail(detailResult?.data)
  if (!job) notFound()

  const bannerImage =
    pageResult?.acf?.banner?.desktop || pageResult?.acf?.featured_image || FALLBACK_BANNER

  return (
    <CareersDetailView
      job={job}
      bannerImage={bannerImage}
    />
  )
}

export default CareersDetailPage
