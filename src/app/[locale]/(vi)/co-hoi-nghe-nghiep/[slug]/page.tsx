import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/shared/json-ld'
import endpoints from '@/configs/endpoints'
import ENV from '@/configs/env'
import { resolveTranslatedDetail } from '@/configs/resolve-translated-detail'
import { detailLocalePaths, hrefFor } from '@/configs/routes'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import { assertPageLocale } from '@/i18n/assert-locale'
import { LocaleAlternateSync } from '@/i18n/locale-alternate'
import { routing } from '@/i18n/routing'
import { breadcrumbSchema, jobPostingSchema, schemaGraph } from '@/lib/schema'
import careersService from '@/services/careers'
import metadataValues from '@/utils/metadataValues'
import CareersDetailView from '@/views/careers/detail'
import { mapCareerDetail } from '@/views/careers/map-career'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const response = await careersService.getCareers({
      lang: routing.defaultLocale,
      limit: 50,
      paged: 1,
    })
    const careers = response?.data ?? []

    return careers
      .map((item) => item.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({ locale: 'vi' as const, slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const pathFor =
    endpoints.careers.rank_math_detail[locale as keyof typeof endpoints.careers.rank_math_detail]
  const [res, detail] = await Promise.all([
    getMetaDataRankMath(pathFor(slug)),
    careersService.getDetail(slug, locale).catch(() => null),
  ])
  const { path, alternatePath } = detailLocalePaths({
    detailKey: 'careerDetail',
    listingKey: 'careers',
    locale,
    slug: detail?.data?.slug || slug,
    translations: detail?.data?.translations,
  })
  return metadataValues(res, { locale, path, alternatePath })
}

const FALLBACK_BANNER = '/home/vision/d-img-2.jpg'

const CareersDetailPage = async ({ params }: Props) => {
  const { locale, slug } = await params
  assertPageLocale(locale, 'vi')
  setRequestLocale(locale)

  const [detailResult, pageResult] = await Promise.all([
    resolveTranslatedDetail({
      slug,
      locale,
      detailKey: 'careerDetail',
      listingKey: 'careers',
      fetchDetail: (s, lang) => careersService.getDetail(s, lang),
    }),
    careersService.getCareersPage(locale).catch(() => null),
  ])

  const job = mapCareerDetail(detailResult?.data)
  if (!job) notFound()

  const t = await getTranslations({ locale, namespace: 'Meta' })
  const { path, paths } = detailLocalePaths({
    detailKey: 'careerDetail',
    listingKey: 'careers',
    locale,
    slug: job.slug,
    translations: detailResult?.data?.translations,
  })
  const careersPath = hrefFor('careers', locale)
  const bannerImage =
    pageResult?.acf?.banner?.desktop || pageResult?.acf?.featured_image || FALLBACK_BANNER

  return (
    <>
      <LocaleAlternateSync paths={paths} />
      <JsonLd
        data={schemaGraph(
          jobPostingSchema({
            domain: ENV.DOMAIN,
            locale: 'vi',
            path,
            title: job.title,
            description: job.excerpt || job.content || job.title,
            datePosted: detailResult?.data?.published,
            validThrough: job.deadline,
            employmentType: job.type,
            jobLocationName: job.location || undefined,
            baseSalary: job.salary || undefined,
          }),
          breadcrumbSchema(ENV.DOMAIN, 'vi', [
            { name: 'Bateco Group', path: '/' },
            { name: t('careersTitle').split('|')[0]!.trim(), path: careersPath },
            { name: job.title, path },
          ]),
        )}
      />
      <CareersDetailView
        job={job}
        bannerImage={bannerImage}
      />
    </>
  )
}

export default CareersDetailPage
