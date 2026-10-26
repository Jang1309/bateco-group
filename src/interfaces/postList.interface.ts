export interface PostTaxonomyTranslation {
  id?: number
  name?: string
  slug?: string
  description?: string
  parent?: number
}

export interface PostTaxonomyTerm {
  id?: number
  name?: string
  slug?: string
  description?: string
  parent?: number
  translations?: Record<string, PostTaxonomyTranslation>
}

export interface PostThumbnail {
  id?: number
  url?: string
}

export interface PostTranslation {
  id?: number
  slug?: string
  link?: string
}

export interface PostListItem {
  id?: number
  title?: string
  slug?: string
  type?: string
  status?: string
  published?: string
  link?: string
  thumbnail?: PostThumbnail
  taxonomies?: {
    category?: PostTaxonomyTerm[]
  }
  acf?: unknown | null
  views?: number
  post_excerpt?: string
  excerpt?: string
  lang?: string
  translations?: Record<string, PostTranslation>
}

export type PostListResponse = PostListItem[]

/** Ảnh featured trong ACF page tin tức (có width/height) */
export interface NewsFeaturedImage {
  id?: number
  url?: string
  width?: number
  height?: number
}

export interface NewsFeaturedTaxonomyTerm {
  id?: number
  name?: string
  slug?: string
  description?: string
  link?: string
  taxonomy?: string
  parent?: number
}

export interface NewsFeaturedPostTaxonomies {
  category?: NewsFeaturedTaxonomyTerm[]
  post_tag?: NewsFeaturedTaxonomyTerm[]
  post_format?: NewsFeaturedTaxonomyTerm[]
  language?: NewsFeaturedTaxonomyTerm[]
  post_translations?: NewsFeaturedTaxonomyTerm[]
}

export interface NewsFeaturedPostAcf {
  featured_image?: NewsFeaturedImage | null
}

export interface NewsFeaturedPost {
  id?: number
  title?: string
  slug?: string
  link?: string
  type?: string
  post_excerpt?: string
  excerpt?: string
  featured_image?: NewsFeaturedImage | null
  taxonomies?: NewsFeaturedPostTaxonomies
  acf?: NewsFeaturedPostAcf | null
}

export interface NewsPageBanner {
  desktop?: string
  mobile?: string | false
  subtitle?: string
  title?: string
  desc?: string
}

export interface NewsFeaturedNews {
  /** CMS trống có thể trả `""` thay vì `[]` */
  posts?: NewsFeaturedPost[] | string | false | null
}

/** ACF trang tin tức (không bọc `acf`) */
export interface NewsPageResponse {
  banner?: NewsPageBanner
  featured_news?: NewsFeaturedNews
  featured_image?: string | null
}
