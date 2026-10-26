import { CACHE_TAGS, cacheOption } from '@/configs/cache'
import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const homepageService = {
  getHomepage: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.homepage[locale as 'vi' | 'en'],
      option: cacheOption(CACHE_TAGS.homepage),
    })
  },
  getPostList: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.homepage.getPostList(locale),
      option: cacheOption(CACHE_TAGS.homepage, CACHE_TAGS.news),
    })
  },
  getSectors: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.homepage.getSectors(locale),
      option: cacheOption(CACHE_TAGS.homepage, CACHE_TAGS.business),
    })
  },
  getProjects: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.homepage.getProjects(locale),
      option: cacheOption(CACHE_TAGS.homepage, CACHE_TAGS.projects),
    })
  },
}

export default homepageService
