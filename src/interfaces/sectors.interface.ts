export interface SectorTranslation {
  id?: number
  name?: string
  slug?: string
  description?: string
  parent?: number
}

export interface SectorBanner {
  image?: string
  title?: string
  desc?: string
}

export interface SectorIntroFeature {
  icon?: string
  title?: string
  desc?: string
}

export interface SectorIntro {
  subtitle?: string
  title?: string
  desc?: string
  features?: SectorIntroFeature[]
}

export interface SectorAcf {
  /** Ảnh thumbnail trên listing lĩnh vực */
  image?: string
  banner?: SectorBanner
  intro?: SectorIntro
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
  acf?: SectorAcf
}

export interface SectorsResponse {
  data?: SectorItem[]
}

export interface SectorDetailResponse {
  success?: boolean
  taxonomy?: string
  data?: SectorItem
  lang?: string
}
