import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const homepageService = {
  getHomepage: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.homepage[locale as 'vi' | 'en'],
    })
  },
  getPostList: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.homepage.getPostList(locale),
    })
  },
  getSectors: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.homepage.getSectors(locale),
    })
  },
}

export default homepageService
