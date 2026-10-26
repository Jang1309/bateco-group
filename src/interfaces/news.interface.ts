import type {
  PostListItem,
  PostTaxonomyTerm,
  PostThumbnail,
  PostTranslation,
} from '@/interfaces/postList.interface'

export interface NewsCategoryTranslation {
  id?: number
  name?: string
  slug?: string
  description?: string
  parent?: number
}

export interface NewsCategoryItem {
  id?: number
  name?: string
  slug?: string
  description?: string
  parent?: number
  link?: string
  count?: number
  lang?: string
  translations?: Record<string, NewsCategoryTranslation>
  acf?: unknown | null
  children?: NewsCategoryItem[]
}

export interface NewsCategoriesResponse {
  success?: boolean
  taxonomy?: string
  slug?: string
  name?: string
  nested?: boolean
  count?: number
  data?: NewsCategoryItem[]
  lang?: string
}

/** Response gốc từ `get-all/post` */
export interface NewsPostsListResponse {
  success?: boolean
  total?: number
  totalPages?: number
  page?: number
  limit?: number
  count?: number
  data?: PostListItem[]
  lang?: string
}

export interface NewsPostDetailAuthor {
  id?: number
  name?: string
}

export interface NewsPostDetailItem {
  id?: number
  title?: string
  slug?: string
  type?: string
  status?: string
  published?: string
  modified?: string
  link?: string
  thumbnail?: PostThumbnail
  taxonomies?: {
    category?: PostTaxonomyTerm[]
  }
  acf?: unknown | null
  views?: number
  post_excerpt?: string
  excerpt?: string
  /** HTML content đã render */
  content?: string
  /** Raw content */
  post_content?: string
  author?: NewsPostDetailAuthor
  lang?: string
  translations?: Record<string, PostTranslation>
}

export interface NewsPostDetailResponse {
  success?: boolean
  data?: NewsPostDetailItem
  lang?: string
}

export type { PostListItem }
