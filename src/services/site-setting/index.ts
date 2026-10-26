import { CACHE_TAGS, cacheOption } from '@/configs/cache'
import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const siteSettingService = {
  getSiteSettings: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.siteSettings.get(locale),
      option: cacheOption(CACHE_TAGS.siteSettings),
    })
  },
}

export default siteSettingService
