import { CACHE_TAGS, cacheOption } from '@/configs/cache'
import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import type { ProjectsListResponse } from '@/interfaces/projects.interface'
import type { SectorDetailResponse, SectorsResponse } from '@/interfaces/sectors.interface'

const businessFieldService = {
  getBusinessField: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.businessField[locale as 'vi' | 'en'],
      option: cacheOption(CACHE_TAGS.business),
    })
  },
  getSectors: async (locale: string): Promise<SectorsResponse> => {
    return await fetchData({
      api: ENDPOINTS.businessField.getSectors(locale),
      option: cacheOption(CACHE_TAGS.business),
    })
  },
  getDetail: async (slug: string, locale: string): Promise<SectorDetailResponse> => {
    return await fetchData({
      api: ENDPOINTS.businessField.getDetail(slug, locale),
      option: cacheOption(CACHE_TAGS.business),
    })
  },
  getProjects: async (locale: string, slug: string): Promise<ProjectsListResponse> => {
    return await fetchData({
      api: ENDPOINTS.businessField.getProjects(locale, slug),
      option: cacheOption(CACHE_TAGS.business, CACHE_TAGS.projects),
    })
  },
}

export default businessFieldService
