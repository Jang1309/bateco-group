import type { ILink } from '@/interfaces/link.interface'

export interface ContactPageBanner {
  desktop?: string
  mobile?: string | false
  subtitle?: string
  title?: string
}

export interface ContactConnectItem {
  title?: string
  address?: ILink | null
  phone?: ILink | null
  mail?: ILink | null
  /** title = tên thành phố hiển thị; url = embed Google Maps */
  map?: ILink | null
}

/** ACF trang liên hệ */
export interface ContactPageResponse {
  banner?: ContactPageBanner
  connect?: ContactConnectItem[]
  featured_image?: string | null
}
