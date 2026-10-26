'use client'

import useSWR from 'swr'

import ENDPOINTS from '@/configs/endpoints'
import type { ProjectsListResponse } from '@/interfaces/projects.interface'

type UseProjectsParams = {
  lang: string
  paged: number
  limit: number
  category?: string
  order?: string
  search?: string
}

/** Key theo page/limit/category/order/search → SWR cache riêng từng bộ lọc. */
export function useProjects({ lang, paged, limit, category, order, search }: UseProjectsParams) {
  const api = ENDPOINTS.projects.getProjects({
    lang,
    paged,
    limit,
    category,
    order,
    search,
  })

  return useSWR<ProjectsListResponse>(api)
}
