'use client'

import useSWR from 'swr'

import ENDPOINTS from '@/configs/endpoints'
import type { InvestorRelationsListResponse } from '@/interfaces/investorRelations.interface'

type UseInvestorDocumentsParams = {
  lang: string
  paged: number
  limit: number
  category?: string
}

/** Key theo page/limit/category → SWR cache riêng từng bộ lọc; keepPreviousData giữ UI khi đổi page. */
export function useInvestorDocuments({ lang, paged, limit, category }: UseInvestorDocumentsParams) {
  const api = ENDPOINTS.investorRelations.getDocuments({
    lang,
    paged,
    limit,
    category,
  })

  return useSWR<InvestorRelationsListResponse>(api)
}
