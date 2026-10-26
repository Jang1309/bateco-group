import type {
  PostTaxonomyTerm,
  PostTaxonomyTranslation,
  PostTranslation,
} from '@/interfaces/postList.interface'

export interface AdministrativeDocumentBannerContent {
  banner_desktop?: string
  banner_mobile?: string
  subtitle?: string
  title?: string
  desc?: string
}

export interface AdministrativeDocumentHeroStat {
  value?: string
  label?: string
}

export interface AdministrativeDocumentBanner {
  banner?: AdministrativeDocumentBannerContent
  hero_stats?: AdministrativeDocumentHeroStat[]
}

export interface AdministrativeDocumentResponse {
  banner?: AdministrativeDocumentBanner
  featured_image?: string | null
}

export interface AdministrativeDocumentThumbnail {
  id?: number | null
  url?: string | null
}

export interface AdministrativeDocumentAcf {
  /** URL file PDF/đính kèm; false/null khi chưa upload */
  file?: string | false | null
  featured_image?: string | null
}

export interface AdministrativeDocumentListItem {
  id?: number
  title?: string
  slug?: string
  type?: string
  status?: string
  published?: string
  link?: string
  thumbnail?: AdministrativeDocumentThumbnail
  taxonomies?: {
    'ad-document-cate'?: PostTaxonomyTerm[]
  }
  acf?: AdministrativeDocumentAcf | null
  views?: number
  post_excerpt?: string
  excerpt?: string
  lang?: string
  translations?: Record<string, PostTranslation>
}

/** Response list có meta phân trang (SWR) */
export interface AdDocumentsResponse {
  success?: boolean
  total?: number
  totalPages?: number
  page?: number
  limit?: number
  count?: number
  data?: AdministrativeDocumentListItem[]
}

export interface AdministrativeDocumentCategoryItem {
  id?: number
  name?: string
  slug?: string
  description?: string
  parent?: number
  link?: string
  count?: number
  lang?: string
  translations?: Record<string, PostTaxonomyTranslation>
  acf?: unknown | null
}

export interface AdDocumentCategoriesResponse {
  data?: AdministrativeDocumentCategoryItem[]
}

export type AdministrativeDocumentListResponse = AdministrativeDocumentListItem[]
export type AdministrativeDocumentCategoryResponse = AdministrativeDocumentCategoryItem[]
