import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { routing } from '@/i18n/routing'
import { getJobDetail, JOB_SLUGS } from '@/views/careers/data'
import CareersDetailView from '@/views/careers/detail'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => JOB_SLUGS.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const job = getJobDetail(slug)
  if (!job) return {}

  return {
    title: `${job.title} | Bateco Group`,
    description: `${job.title} — ${job.department}, ${job.location}. Mức lương: ${job.salary}.`,
  }
}

const CareersDetailPage = async ({ params }: Props) => {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const job = getJobDetail(slug)
  if (!job) notFound()

  return <CareersDetailView job={job} />
}

export default CareersDetailPage
