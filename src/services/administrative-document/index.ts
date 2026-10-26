import { CACHE_TAGS, cacheOption } from '@/configs/cache'
import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import type {
  AdDocumentCategoriesResponse,
  AdDocumentsResponse,
} from '@/interfaces/administrativeDocument.interface'

type GetDocumentsParams = {
  limit: number
  paged: number
  lang: string
  category?: string
}

const administrativeDocumentService = {
  getAdministrativeDocument: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.administrativeDocument[locale as 'vi' | 'en'],
      option: cacheOption(CACHE_TAGS.governance),
    })
  },
  getDocuments: async (params: GetDocumentsParams): Promise<AdDocumentsResponse> => {
    return await fetchData({
      api: ENDPOINTS.administrativeDocument.getDocuments(params),
      option: cacheOption(CACHE_TAGS.governance),
    })
  },
  getCategories: async (locale: string): Promise<AdDocumentCategoriesResponse> => {
    return await fetchData({
      api: ENDPOINTS.administrativeDocument.getCategories(locale),
      option: cacheOption(CACHE_TAGS.governance),
    })
  },
}

export default administrativeDocumentService
