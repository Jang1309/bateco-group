import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { routing } from '@/i18n/routing'
import { getProjectDetail, PROJECTS } from '@/views/projects/data'
import ProjectDetailView from '@/views/projects/detail'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PROJECTS.map((project) => ({ locale, slug: project.id })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectDetail(slug)
  if (!project) return {}

  return {
    title: `${project.title} | Bateco Group`,
    description: project.summary,
    openGraph: { images: [project.image] },
  }
}

const ProjectDetailPage = async ({ params }: Props) => {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const project = getProjectDetail(slug)
  if (!project) notFound()

  return <ProjectDetailView project={project} />
}

export default ProjectDetailPage
