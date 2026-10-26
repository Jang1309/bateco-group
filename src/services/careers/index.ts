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
      option: { next: { revalidate: 300 } },
    })
  },
  getLocations: async (locale: string): Promise<CareersTaxonomiesResponse> => {
    return await fetchData({
      api: ENDPOINTS.careers.getLocations(locale),
      option: { next: { revalidate: 300 } },
    })
  },
  getDepartments: async (locale: string): Promise<CareersTaxonomiesResponse> => {
    return await fetchData({
      api: ENDPOINTS.careers.getDepartments(locale),
      option: { next: { revalidate: 300 } },
    })
  },
  getCareers: async (params: GetCareersParams): Promise<CareersListResponse> => {
    return await fetchData({
      api: ENDPOINTS.careers.getCareers(params),
      option: { next: { revalidate: 300 } },
    })
  },
  getDetail: async (slug: string, locale: string): Promise<CareersDetailResponse> => {
    return await fetchData({
      api: ENDPOINTS.careers.getDetail(slug, locale),
      option: { next: { revalidate: 300 } },
    })
  },
}

export default careersService
