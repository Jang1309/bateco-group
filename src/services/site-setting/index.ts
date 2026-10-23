import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const siteSettingService = {
  getSiteSettings: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.siteSettings.get(locale),
      option: { next: { revalidate: 300 } },
    })
  },
}

export default siteSettingService
