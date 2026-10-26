import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import type {
  InvestorRelationsCategoriesResponse,
  InvestorRelationsListResponse,
} from '@/interfaces/investorRelations.interface'

type GetDocumentsParams = {
  limit: number
  paged: number
  lang: string
  category?: string
}

const investorRelationsService = {
  getInvestorRelations: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.investorRelations[locale as 'vi' | 'en'],
      option: { next: { revalidate: 300 } },
    })
  },
  getDocuments: async (params: GetDocumentsParams): Promise<InvestorRelationsListResponse> => {
    return await fetchData({
      api: ENDPOINTS.investorRelations.getDocuments(params),
    })
  },
  getCategories: async (locale: string): Promise<InvestorRelationsCategoriesResponse> => {
    return await fetchData({
      api: ENDPOINTS.investorRelations.getCategories(locale),
      option: { next: { revalidate: 300 } },
    })
  },
}

export default investorRelationsService
