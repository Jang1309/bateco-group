'use client'

import useSWR from 'swr'

import ENDPOINTS from '@/configs/endpoints'
import type { NewsPostsListResponse } from '@/interfaces/news.interface'

type UseNewsPostsParams = {
  lang: string
  paged: number
  limit: number
  category?: string
}

/** Key theo page/limit/category → SWR cache riêng từng bộ lọc. */
export function useNewsPosts({ lang, paged, limit, category }: UseNewsPostsParams) {
  const api = ENDPOINTS.news.getPosts({
    lang,
    paged,
    limit,
    category,
  })

  return useSWR<NewsPostsListResponse>(api)
}
