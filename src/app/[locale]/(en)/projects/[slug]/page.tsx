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
import { breadcrumbSchema, projectSchema, schemaGraph } from '@/lib/schema'
import projectsService from '@/services/projects'
import siteSettingService from '@/services/site-setting'
import metadataValues from '@/utils/metadataValues'
import ProjectDetailView from '@/views/projects/detail'
import { mapProjectDetail } from '@/views/projects/map-project-detail'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const response = await projectsService.getProjectsList({
      lang: 'en',
      limit: 50,
      paged: 1,
    })
    const projects = response?.data ?? []

    return projects
      .map((item) => item.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({ locale: 'en', slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const detail = await projectsService.getDetail(slug, locale).catch(() => null)
  const currentSlug = detail?.data?.slug || slug
  const { path, alternatePath } = detailLocalePaths({
    detailKey: 'projectDetail',
    listingKey: 'projects',
    locale,
    slug: currentSlug,
    translations: detail?.data?.translations,
  })
  const rankPath =
    endpoints.projects.rank_math_detail[locale as keyof typeof endpoints.projects.rank_math_detail]
  const res = await getMetaDataRankMath(rankPath(slug))
  return metadataValues(res, { locale, path, alternatePath })
}

const ProjectDetailPage = async ({ params }: Props) => {
  const { locale, slug } = await params
  assertPageLocale(locale, 'en')
  setRequestLocale(locale)

  const [detailResult, siteSetting] = await Promise.all([
    resolveTranslatedDetail({
      slug,
      locale,
      detailKey: 'projectDetail',
      listingKey: 'projects',
      fetchDetail: (s, lang) => projectsService.getDetail(s, lang),
    }),
    siteSettingService.getSiteSettings(locale).catch(() => null),
  ])
  const project = mapProjectDetail(detailResult?.data)
  if (!project) notFound()

  const t = await getTranslations({ locale, namespace: 'Meta' })
  const { path, paths } = detailLocalePaths({
    detailKey: 'projectDetail',
    listingKey: 'projects',
    locale,
    slug: project.slug,
    translations: detailResult?.data?.translations,
  })
  const projectsPath = hrefFor('projects', locale)

  let related =
    (
      await projectsService
        .getProjectsList({
          lang: locale,
          limit: 7,
          paged: 1,
          category: project.sectorSlug,
        })
        .catch(() => null)
    )?.data ?? []

  if (related.filter((item) => item.slug !== project.slug).length < 3) {
    related =
      (
        await projectsService
          .getProjectsList({ lang: locale, limit: 7, paged: 1 })
          .catch(() => null)
      )?.data ?? related
  }

  return (
    <>
      <LocaleAlternateSync paths={paths} />
      <JsonLd
        data={schemaGraph(
          projectSchema({
            domain: ENV.DOMAIN,
            locale: 'en',
            path,
            title: project.title,
            description: project.summary,
            image: project.image,
            datePublished: project.date,
          }),
          breadcrumbSchema(ENV.DOMAIN, 'en', [
            { name: 'Bateco Group', path: '/' },
            { name: t('projectsTitle').split('|')[0]!.trim(), path: projectsPath },
            { name: project.title, path },
          ]),
        )}
      />
      <ProjectDetailView
        project={project}
        related={related}
        contact={siteSetting?.data?.contact}
      />
    </>
  )
}

export default ProjectDetailPage
