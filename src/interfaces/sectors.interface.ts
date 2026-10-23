export interface SectorTranslation {
  id?: number
  name?: string
  slug?: string
  description?: string
  parent?: number
}

export interface SectorItem {
  id?: number
  name?: string
  slug?: string
  description?: string
  parent?: number
  link?: string
  count?: number
  lang?: string
  translations?: Record<string, SectorTranslation>
  acf?: {
    image?: string
  }
}

export interface SectorsResponse {
  data?: SectorItem[]
}
