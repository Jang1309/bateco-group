import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import ProjectsView from '@/views/projects'
import { PROJECT_SECTORS, type ProjectSort } from '@/views/projects/data'

export const metadata: Metadata = {
  title: 'Dự án | Bateco Group',
  description:
    'Các dự án tiêu biểu của Bateco Group trong dịch vụ công nghiệp, bất động sản - hạ tầng công nghiệp, an ninh - quốc phòng, kinh tế xanh và sản xuất vật liệu mới.',
}

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ 'linh-vuc'?: string; q?: string; 'sap-xep'?: string; trang?: string }>
}

const ProjectsPage = async ({ params, searchParams }: Props) => {
  const { locale } = await params
  setRequestLocale(locale)

  const raw = await searchParams
  const sector = PROJECT_SECTORS.some((item) => item.id === raw['linh-vuc'])
    ? raw['linh-vuc']
    : undefined
  const sort: ProjectSort = raw['sap-xep'] === 'cu-nhat' ? 'cu-nhat' : 'moi-nhat'
  const page = Number.parseInt(raw.trang ?? '1', 10) || 1

  return <ProjectsView query={{ sector, q: raw.q, sort, page }} />
}

export default ProjectsPage
