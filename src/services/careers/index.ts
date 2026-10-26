import { CACHE_TAGS, cacheOption } from '@/configs/cache'
import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import type {
  CareersDetailResponse,
  CareersListResponse,
  CareersPageResponse,
  CareersTaxonomiesResponse,
} from '@/interfaces/careers.interface'

type GetCareersParams = {
  limit: number
  paged: number
  lang: string
  location?: string
  department?: string
  order?: string
  search?: string
}

const careersService = {
  getCareersPage: async (locale: string): Promise<{ acf?: CareersPageResponse }> => {
    return await fetchData({
      api: ENDPOINTS.careers[locale as 'vi' | 'en'],
      option: cacheOption(CACHE_TAGS.careers),
    })
  },
  getLocations: async (locale: string): Promise<CareersTaxonomiesResponse> => {
    return await fetchData({
      api: ENDPOINTS.careers.getLocations(locale),
      option: cacheOption(CACHE_TAGS.careers),
    })
  },
  getDepartments: async (locale: string): Promise<CareersTaxonomiesResponse> => {
    return await fetchData({
      api: ENDPOINTS.careers.getDepartments(locale),
      option: cacheOption(CACHE_TAGS.careers),
    })
  },
  getCareers: async (params: GetCareersParams): Promise<CareersListResponse> => {
    return await fetchData({
      api: ENDPOINTS.careers.getCareers(params),
      option: cacheOption(CACHE_TAGS.careers),
    })
  },
  getDetail: async (slug: string, locale: string): Promise<CareersDetailResponse> => {
    return await fetchData({
      api: ENDPOINTS.careers.getDetail(slug, locale),
      option: cacheOption(CACHE_TAGS.careers),
    })
  },
}

export default careersService
