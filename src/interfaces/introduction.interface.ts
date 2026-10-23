export interface IntroductionBanner {
  banner_desktop?: string
  banner_mobile?: string
  subtitle?: string
  title?: string
  desc?: string
}

export interface IntroductionMessage {
  avatar?: string
  name?: string
  position?: string
  message?: string
}

export interface IntroductionPillarItem {
  subtitle?: string
  title?: string
  desc?: string
  image?: string
}

export interface IntroductionPillars {
  logo?: string
  pillars?: IntroductionPillarItem[]
}

export interface IntroductionLeader {
  image?: string
  name?: string
  role?: string
}

export interface IntroductionChairman extends IntroductionLeader {
  quote?: string
  signature?: string
}

export interface IntroductionLeadership {
  subtitle?: string
  title?: string
  chairman?: IntroductionChairman
  team_title?: string
  team?: IntroductionLeader[]
}

export interface IntroductionMilestone {
  year?: string
  tag?: string
  title?: string
  desc?: string
}

export interface IntroductionHistory {
  eyebrow?: string
  kicker?: string
  title?: string
  milestones?: IntroductionMilestone[]
}

export interface IntroductionEcosystemStat {
  value?: string
  label?: string
}

export interface IntroductionEcosystemCompany {
  name?: string
}

export interface IntroductionEcosystemGroup {
  title?: string
  companies?: IntroductionEcosystemCompany[]
}

export interface IntroductionEcosystem {
  title?: string
  stats?: IntroductionEcosystemStat[]
  groups?: IntroductionEcosystemGroup[]
  gallery?: string[]
}

export interface IntroductionResponse {
  banner?: IntroductionBanner
  message?: IntroductionMessage
  pillars?: IntroductionPillars
  leadership?: IntroductionLeadership
  history?: IntroductionHistory
  ecosystem?: IntroductionEcosystem
  featured_image?: string | null
}
