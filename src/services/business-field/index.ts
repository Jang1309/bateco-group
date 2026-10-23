import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const businessFieldService = {
  getBusinessField: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.businessField[locale as 'vi' | 'en'],
      option: { next: { revalidate: 300 } },
    })
  },
  getSectors: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.businessField.getSectors(locale),
      option: { next: { revalidate: 300 } },
    })
  },
}

export default businessFieldService
