/** ACF image: URL string, object, hoặc false khi trống */
export type BusinessFieldImage =
  | string
  | false
  | {
      url?: string
      ID?: number
      id?: number
    }

export interface BusinessFieldBanner {
  desktop?: BusinessFieldImage
  mobile?: BusinessFieldImage
  subtitle?: string
  title?: string
  desc?: string
}

export interface BusinessFieldResponse {
  banner?: BusinessFieldBanner
  featured_image?: string | null
}

export const resolveBusinessFieldImage = (value?: BusinessFieldImage): string | undefined => {
  if (!value) return undefined
  if (typeof value === 'string') return value || undefined
  if (typeof value === 'object' && value.url) return value.url
  return undefined
}
