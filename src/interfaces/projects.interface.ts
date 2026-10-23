import type {
  PostTaxonomyTerm,
  PostThumbnail,
  PostTranslation,
} from '@/interfaces/postList.interface'

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

export type ProjectsResponse = ProjectListItem[]
