export interface CareersPageBanner {
  desktop?: string
  mobile?: string | false
  subtitle?: string
  title?: string
  desc?: string
}

export interface CareersWhyItem {
  icon?: string
  title?: string
  desc?: string
}

export interface CareersWhy {
  subtitle?: string
  title?: string
  desc?: string
  items?: CareersWhyItem[]
}

export interface CareersProcessStep {
  title?: string
  desc?: string
}

export interface CareersProcess {
  subtitle?: string
  title?: string
  steps?: CareersProcessStep[]
}

/** ACF trang cơ hội nghề nghiệp */
export interface CareersPageResponse {
  banner?: CareersPageBanner
  careers_why?: CareersWhy
  process?: CareersProcess
  featured_image?: string | null
}

export interface CareersTaxonomyTranslation {
  id?: number
  name?: string
  slug?: string
  description?: string
  parent?: number
}

export interface CareersTaxonomyItem {
  id?: number
  name?: string
  slug?: string
  description?: string
  parent?: number
  link?: string
  count?: number
  lang?: string
  translations?: Record<string, CareersTaxonomyTranslation>
  acf?: unknown | null
  children?: CareersTaxonomyItem[]
}

export interface CareersTaxonomiesResponse {
  success?: boolean
  taxonomy?: string
  data?: CareersTaxonomyItem[]
  lang?: string
}

export interface CareersThumbnail {
  id?: number | null
  url?: string | null
}

/** CMS typo: `infomation` */
export interface CareersAcfInformation {
  salary?: string
  work_arrangement?: string
  education?: string
  application_deadline?: string
}

export interface CareersListAcf {
  infomation?: CareersAcfInformation | null
  featured_image?: string | null
}

export interface CareersListItem {
  id?: number
  title?: string
  slug?: string
  type?: string
  status?: string
  published?: string
  link?: string
  thumbnail?: CareersThumbnail
  taxonomies?: {
    locations?: CareersTaxonomyItem[]
    departments?: CareersTaxonomyItem[]
  }
  acf?: CareersListAcf | null
  views?: number
  post_excerpt?: string
  excerpt?: string
  lang?: string
}

export interface CareersListResponse {
  success?: boolean
  total?: number
  totalPages?: number
  page?: number
  limit?: number
  count?: number
  data?: CareersListItem[]
  lang?: string
}

export interface CareersDetailItem extends CareersListItem {
  modified?: string
  content?: string
  post_content?: string
}

export interface CareersDetailResponse {
  success?: boolean
  data?: CareersDetailItem
  lang?: string
}
