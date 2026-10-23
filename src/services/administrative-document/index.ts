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
      option: { next: { revalidate: 300 } },
    })
  },
  getDocuments: async (params: GetDocumentsParams): Promise<AdDocumentsResponse> => {
    return await fetchData({
      api: ENDPOINTS.administrativeDocument.getDocuments(params),
    })
  },
  getCategories: async (locale: string): Promise<AdDocumentCategoriesResponse> => {
    return await fetchData({
      api: ENDPOINTS.administrativeDocument.getCategories(locale),
      option: { next: { revalidate: 300 } },
    })
  },
}

export default administrativeDocumentService
