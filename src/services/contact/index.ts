import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import type { ContactPageResponse } from '@/interfaces/contact.interface'

const contactService = {
  getContactPage: async (locale: string): Promise<{ acf?: ContactPageResponse }> => {
    return await fetchData({
      api: ENDPOINTS.contact[locale as 'vi' | 'en'],
      option: { next: { revalidate: 300 } },
    })
  },
}

export default contactService
