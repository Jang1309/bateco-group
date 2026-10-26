import type {
  PostTaxonomyTerm,
  PostThumbnail,
  PostTranslation,
} from '@/interfaces/postList.interface'

export type { SectorItem, SectorAcf, SectorsResponse } from '@/interfaces/sectors.interface'

export interface ProjectListItem {
  id?: number
  title?: string
  slug?: string
  type?: string
  status?: string
  published?: string
  link?: string
  thumbnail?: PostThumbnail
  taxonomies?: {
    sectors?: PostTaxonomyTerm[]
  }
  acf?: unknown | null
  views?: number
  post_excerpt?: string
  excerpt?: string
  lang?: string
  translations?: Record<string, PostTranslation>
}

/** Danh sách phẳng (sau khi lấy `.data` từ API) */
export type ProjectsResponse = ProjectListItem[]

/** Response gốc từ `get-all/projects` */
export interface ProjectsListResponse {
  success?: boolean
  total?: number
  totalPages?: number
  page?: number
  limit?: number
  count?: number
  data?: ProjectListItem[]
}

export interface ProjectsPageBanner {
  desktop?: string
  mobile?: string | false
  subtitle?: string
  title?: string
  desc?: string
}

export interface ProjectsPageResponse {
  banner?: ProjectsPageBanner
  featured_image?: string | null
}

export interface ProjectDetailImage {
  id?: number
  url?: string
  width?: number
  height?: number
}

export interface ProjectDetailSpec {
  label?: string
  value?: string
}

/** ACF chi tiết dự án — field tùy CMS; tất cả optional */
export interface ProjectDetailAcf {
  featured_image?: ProjectDetailImage | string | null
  location?: string
  summary?: string
  desc?: string
  /** Ảnh gallery: URL string hoặc object có url */
  gallery?: Array<string | ProjectDetailImage | false | null> | false | null
  specs?: ProjectDetailSpec[] | false | null
}

export interface ProjectDetailAuthor {
  id?: number
  name?: string
}

export interface ProjectDetailItem {
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
    sectors?: PostTaxonomyTerm[]
  }
  acf?: ProjectDetailAcf | null
  views?: number
  post_excerpt?: string
  excerpt?: string
  /** HTML content đã render */
  content?: string
  /** Raw content (có thể chưa wrap thẻ p) */
  post_content?: string
  author?: ProjectDetailAuthor
  lang?: string
  translations?: Record<string, PostTranslation>
}

export interface ProjectDetailResponse {
  success?: boolean
  data?: ProjectDetailItem
  lang?: string
}
