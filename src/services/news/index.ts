import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import type {
  NewsCategoriesResponse,
  NewsPostDetailResponse,
  NewsPostsListResponse,
} from '@/interfaces/news.interface'
import type { NewsPageResponse } from '@/interfaces/postList.interface'

type GetPostsParams = {
  limit: number
  paged: number
  lang: string
  category?: string
}

const newsService = {
  getNewsPage: async (locale: string): Promise<{ acf?: NewsPageResponse }> => {
    return await fetchData({
      api: ENDPOINTS.news[locale as 'vi' | 'en'],
      option: { next: { revalidate: 300 } },
    })
  },
  getCategories: async (locale: string): Promise<NewsCategoriesResponse> => {
    return await fetchData({
      api: ENDPOINTS.news.getCategories(locale),
      option: { next: { revalidate: 300 } },
    })
  },
  getPosts: async (params: GetPostsParams): Promise<NewsPostsListResponse> => {
    return await fetchData({
      api: ENDPOINTS.news.getPosts(params),
      option: { next: { revalidate: 300 } },
    })
  },
  getDetail: async (slug: string, locale: string): Promise<NewsPostDetailResponse> => {
    return await fetchData({
      api: ENDPOINTS.news.getDetail(slug, locale),
      option: { next: { revalidate: 300 } },
    })
  },
}

export default newsService
