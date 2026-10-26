import { CACHE_TAGS, cacheOption } from '@/configs/cache'
import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import type { ContactPageResponse } from '@/interfaces/contact.interface'

const contactService = {
  getContactPage: async (locale: string): Promise<{ acf?: ContactPageResponse }> => {
    return await fetchData({
      api: ENDPOINTS.contact[locale as 'vi' | 'en'],
      option: cacheOption(CACHE_TAGS.contact),
    })
  },
}

export default contactService
