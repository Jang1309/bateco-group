import { CACHE_TAGS, cacheOption } from '@/configs/cache'
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
      option: cacheOption(CACHE_TAGS.investor),
    })
  },
  getDocuments: async (params: GetDocumentsParams): Promise<InvestorRelationsListResponse> => {
    return await fetchData({
      api: ENDPOINTS.investorRelations.getDocuments(params),
      option: cacheOption(CACHE_TAGS.investor),
    })
  },
  getCategories: async (locale: string): Promise<InvestorRelationsCategoriesResponse> => {
    return await fetchData({
      api: ENDPOINTS.investorRelations.getCategories(locale),
      option: cacheOption(CACHE_TAGS.investor),
    })
  },
}

export default investorRelationsService
