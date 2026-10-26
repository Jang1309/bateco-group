'use client'

import useSWR from 'swr'

import ENDPOINTS from '@/configs/endpoints'
import type { CareersListResponse } from '@/interfaces/careers.interface'

type UseCareersParams = {
  lang: string
  paged: number
  limit: number
  location?: string
  department?: string
  order?: string
  search?: string
}

/** Key theo filters → SWR cache riêng từng bộ lọc. */
export function useCareers({
  lang,
  paged,
  limit,
  location,
  department,
  order,
  search,
}: UseCareersParams) {
  const api = ENDPOINTS.careers.getCareers({
    lang,
    paged,
    limit,
    location,
    department,
    order,
    search,
  })

  return useSWR<CareersListResponse>(api)
}
