'use client'

import useSWR from 'swr'

import ENDPOINTS from '@/configs/endpoints'
import type {
  AdDocumentCategoriesResponse,
  AdDocumentsResponse,
} from '@/interfaces/administrativeDocument.interface'

type UseDocumentsParams = {
  lang: string
  paged: number
  limit: number
  category?: string
}

/** Key theo page/limit/category → SWR cache riêng từng bộ lọc; keepPreviousData giữ UI khi đổi page. */
export function useDocuments({ lang, paged, limit, category }: UseDocumentsParams) {
  const api = ENDPOINTS.administrativeDocument.getDocuments({
    lang,
    paged,
    limit,
    category,
  })

  return useSWR<AdDocumentsResponse>(api)
}

export function useDocumentCategories(lang: string) {
  const api = ENDPOINTS.administrativeDocument.getCategories(lang)
  return useSWR<AdDocumentCategoriesResponse>(api)
}
