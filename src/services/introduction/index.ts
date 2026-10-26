import { CACHE_TAGS, cacheOption } from '@/configs/cache'
import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const introductionService = {
  getIntroduction: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.introduction[locale as 'vi' | 'en'],
      option: cacheOption(CACHE_TAGS.introduction),
    })
  },
}

export default introductionService
