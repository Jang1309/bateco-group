import type { PostTaxonomyTerm, PostTranslation } from '@/interfaces/postList.interface'

export interface InvestorRelationsCategoryTranslation {
  id?: number
  name?: string
  slug?: string
  description?: string
  parent?: number
}

export interface InvestorRelationsCategoryItem {
  id?: number
  name?: string
  slug?: string
  description?: string
  parent?: number
  link?: string
  count?: number
  lang?: string
  translations?: Record<string, InvestorRelationsCategoryTranslation>
  acf?: unknown | null
  children?: InvestorRelationsCategoryItem[]
}

export interface InvestorRelationsCategoriesResponse {
  data?: InvestorRelationsCategoryItem[]
}

export interface InvestorRelationsThumbnail {
  id?: number | null
  url?: string | null
}

export interface InvestorRelationsAcf {
  /** URL file PDF/đính kèm; false/null khi chưa upload */
  file?: string | false | null
  featured_image?: string | null
}

export interface InvestorRelationsListItem {
  id?: number
  title?: string
  slug?: string
  type?: string
  status?: string
  published?: string
  link?: string
  thumbnail?: InvestorRelationsThumbnail
  taxonomies?: {
    'cate-investor-relations'?: PostTaxonomyTerm[]
  }
  acf?: InvestorRelationsAcf | null
  views?: number
  post_excerpt?: string
  excerpt?: string
  lang?: string
  translations?: Record<string, PostTranslation>
}

/** Response list có meta phân trang (SWR) */
export interface InvestorRelationsListResponse {
  success?: boolean
  total?: number
  totalPages?: number
  page?: number
  limit?: number
  count?: number
  data?: InvestorRelationsListItem[]
}

export interface InvestorRelationsBannerStat {
  value?: string
  label?: string
}

export interface InvestorRelationsBanner {
  desktop?: string
  mobile?: string | false
  subtitle?: string
  title?: string
  desc?: string
  stats?: InvestorRelationsBannerStat[]
}

export interface InvestorRelationsResponse {
  banner?: InvestorRelationsBanner
  featured_image?: string | null
}
