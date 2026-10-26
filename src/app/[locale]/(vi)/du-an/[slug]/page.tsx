import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { assertPageLocale } from '@/i18n/assert-locale'
import { routing } from '@/i18n/routing'
import projectsService from '@/services/projects'
import siteSettingService from '@/services/site-setting'
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

  try {
    const response = await projectsService.getDetail(slug, locale)
    const project = mapProjectDetail(response?.data)
    if (!project) return {}

    return {
      title: `${project.title} | Bateco Group`,
      description: project.summary || undefined,
      openGraph: { images: [project.image] },
    }
  } catch {
    return {}
  }
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
    <ProjectDetailView
      project={project}
      related={related}
      contact={siteSetting?.data?.contact}
    />
  )
}

export default ProjectDetailPage
