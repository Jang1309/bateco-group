export interface BusinessFieldBanner {
  desktop?: string
  mobile?: string | false
  subtitle?: string
  title?: string
  desc?: string
}

export interface BusinessFieldResponse {
  banner?: BusinessFieldBanner
  featured_image?: string | null
}
