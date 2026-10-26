import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import type { ProjectDetailResponse, ProjectsListResponse } from '@/interfaces/projects.interface'

type GetProjectsParams = {
  limit: number
  paged: number
  lang: string
  category?: string
  order?: string
  search?: string
}

const projectsService = {
  getProjectsPage: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.projects[locale as 'vi' | 'en'],
      option: { next: { revalidate: 300 } },
    })
  },
  getProjectsCategories: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.projects.getSectors(locale),
      option: { next: { revalidate: 300 } },
    })
  },
  getProjectsList: async (params: GetProjectsParams): Promise<ProjectsListResponse> => {
    return await fetchData({
      api: ENDPOINTS.projects.getProjects(params),
      option: { next: { revalidate: 300 } },
    })
  },
  getDetail: async (slug: string, locale: string): Promise<ProjectDetailResponse> => {
    return await fetchData({
      api: ENDPOINTS.projects.getDetail(slug, locale),
      option: { next: { revalidate: 300 } },
    })
  },
}

export default projectsService
