import { ILink } from '@/interfaces/link.interface'

export interface HomepageBanner {
  background_pc?: string
  background_mobile?: string
  subtitle?: string
  title?: string
  desc?: string
  button_1?: ILink
  button_2?: ILink
}

export interface HomepageBrand {
  image_1?: string
  image_2?: string
  logo?: string
  content?: {
    title?: string
    desc?: string
  }
}

export interface HomepageMilestone {
  icon?: string
  year?: string
  title?: string
  desc?: string
}

export interface HomepageJourney {
  subtitle?: string
  title?: string
  desc?: string
  logo?: string
  milestones?: HomepageMilestone[]
}

export interface HomepageVisionSlide {
  image?: string
  title?: string
}

export interface HomepageVisionStat {
  number?: string
  desc?: string
}

export interface HomepageVision {
  title?: string
  slides?: HomepageVisionSlide[]
  stats?: HomepageVisionStat[]
}

export interface HomepageMapPoint {
  name?: string
  lat?: string
  lon?: string
}

export interface HomepageFootprint {
  title?: string
  desc?: string
  image?: string
  image_caption?: string
  map?: {
    origin?: HomepageMapPoint
    points?: HomepageMapPoint[]
  }
}

export interface HomepagePartnerGallery {
  ecosystem_title?: string
  partners_title?: string
  gallery?: string[]
}

export interface HomepagePartners {
  title?: string
  desc?: string
  ecosystem?: HomepagePartnerGallery
  partners?: HomepagePartnerGallery
}

export interface HomepageAcf {
  banner?: HomepageBanner
  brand?: HomepageBrand
  journey?: HomepageJourney
  vision?: HomepageVision
  footprint?: HomepageFootprint
  partners?: HomepagePartners
  featured_image?: string | null
}

export interface HomepageResponse {
  acf?: HomepageAcf
}
