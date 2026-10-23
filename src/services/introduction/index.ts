import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const introductionService = {
  getIntroduction: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.introduction[locale as 'vi' | 'en'],
      option: { next: { revalidate: 300 } },
    })
  },
}

export default introductionService
