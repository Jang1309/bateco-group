import { ILink } from '@/interfaces/link.interface'

export interface HeaderSubmenuItem {
  link?: ILink
}

export interface HeaderNavGroup {
  title?: string
  menu?: HeaderSubmenuItem[]
}

export interface HeaderMenuItem {
  link?: ILink
  has_submenu?: boolean
  submenu?: {
    description?: string
    navigation?: HeaderNavGroup[] | false
  }
}

export interface HeaderMenu {
  main_navigation?: HeaderMenuItem[]
}

export interface Header {
  logo?: string
  logo_white?: string
  menu_left?: HeaderMenu
  menu_right?: HeaderMenu
}

export interface FooterOffice {
  title?: string
  address?: ILink
  phone?: ILink
  hotline?: ILink
  mail?: ILink
}

export interface FooterNavItem {
  link?: ILink
}

export interface FooterNewsletter {
  heading?: string
  description?: string
  placeholder?: string
  submit_aria_label?: string
  copyright?: string
}

export interface Footer {
  logo?: string
  background?: string
  office?: FooterOffice[]
  navigation?: FooterNavItem[]
  newsletter?: FooterNewsletter
}

export interface ContactItem {
  icon?: string
  link?: ILink
}

export interface Contact {
  eyebrow?: string
  title?: string
  desc?: string
  button?: ILink
  /** ACF có thể trả false khi chưa upload ảnh */
  image?: string | false
  contacts?: ContactItem[]
}

export interface EcosystemStat {
  value?: string
  label?: string
}

export interface Ecosystem {
  title?: string
  footnote?: string
  stats?: EcosystemStat[]
  /** URL logo công ty thành viên */
  members?: string[]
}

export interface CtaItem {
  icon?: string
  link?: ILink
}

export interface SiteSettingResponse {
  locale?: string
  option_id?: string
  data?: {
    header?: Header
    footer?: Footer
    contact?: Contact
    ecosystem?: Ecosystem
    cta?: CtaItem[]
  }
}
