import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { assertPageLocale } from '@/i18n/assert-locale'
import projectsService from '@/services/projects'
import ProjectsView from '@/views/projects'

export function generateStaticParams() {
  return [{ locale: 'en' as const }]
}
type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return {
    title: t('projectsTitle'),
    description: t('projectsDesc'),
  }
}

const ProjectsPage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'en')
  setRequestLocale(locale)

  const [pageResponse, sectorsResponse, featuredResponse] = await Promise.all([
    projectsService.getProjectsPage(locale),
    projectsService.getProjectsCategories(locale),
    projectsService.getProjectsList({
      lang: locale,
      limit: 3,
      paged: 1,
      order: 'DESC',
    }),
  ])

  return (
    <ProjectsView
      locale={locale}
      content={pageResponse?.acf}
      sectors={sectorsResponse?.data ?? []}
      featured={featuredResponse?.data ?? []}
    />
  )
}

export default ProjectsPage
