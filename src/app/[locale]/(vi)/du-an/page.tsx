import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import projectsService from '@/services/projects'
import ProjectsView from '@/views/projects'

export const metadata: Metadata = {
  title: 'Dự án | Bateco Group',
  description:
    'Các dự án tiêu biểu của Bateco Group trong dịch vụ công nghiệp, bất động sản - hạ tầng công nghiệp, an ninh - quốc phòng, kinh tế xanh và sản xuất vật liệu mới.',
}

type Props = {
  params: Promise<{ locale: string }>
}

const ProjectsPage = async ({ params }: Props) => {
  const { locale } = await params
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
