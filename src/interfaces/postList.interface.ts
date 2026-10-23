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
