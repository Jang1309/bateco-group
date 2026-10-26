import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/shared/json-ld'
import endpoints from '@/configs/endpoints'
import ENV from '@/configs/env'
import { hrefFor, localePathsFor } from '@/configs/routes'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import { assertPageLocale } from '@/i18n/assert-locale'
import { routing } from '@/i18n/routing'
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
      lang: routing.defaultLocale,
      limit: 50,
      paged: 1,
    })
    const projects = response?.data ?? []

    return projects
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
    endpoints.projects.rank_math_detail[locale as keyof typeof endpoints.projects.rank_math_detail]
  const res = await getMetaDataRankMath(pathFor(slug))
  return metadataValues(res, { locale, ...localePathsFor('projectDetail', locale, { slug }) })
}

const ProjectDetailPage = async ({ params }: Props) => {
  const { locale, slug } = await params
  assertPageLocale(locale, 'vi')
  setRequestLocale(locale)

  const [detailResult, siteSetting] = await Promise.all([
    projectsService.getDetail(slug, locale).catch(() => null),
    // Cùng request với layout → fetch được dedupe
    siteSettingService.getSiteSettings(locale).catch(() => null),
  ])
  const project = mapProjectDetail(detailResult?.data)
  if (!project) notFound()

  const t = await getTranslations({ locale, namespace: 'Meta' })
  const path = hrefFor('projectDetail', locale, { slug: project.slug })
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

  // Thiếu dự án cùng lĩnh vực → lấy danh sách chung
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
      <JsonLd
        data={schemaGraph(
          projectSchema({
            domain: ENV.DOMAIN,
            locale: 'vi',
            path,
            title: project.title,
            description: project.summary,
            image: project.image,
            datePublished: project.date,
          }),
          breadcrumbSchema(ENV.DOMAIN, 'vi', [
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
