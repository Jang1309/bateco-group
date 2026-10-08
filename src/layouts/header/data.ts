import ROUTES from '@/configs/routes'

export type NavItem = {
  key: 'about' | 'business' | 'investor' | 'projects' | 'news' | 'careers' | 'contact'
  href: (typeof ROUTES)[keyof typeof ROUTES]
}

export const LEFT_NAV: NavItem[] = [
  { key: 'about', href: ROUTES.about },
  { key: 'business', href: ROUTES.business },
  { key: 'investor', href: ROUTES.investor },
  { key: 'projects', href: ROUTES.projects },
]

export const RIGHT_NAV: NavItem[] = [
  { key: 'news', href: ROUTES.news },
  { key: 'careers', href: ROUTES.careers },
  { key: 'contact', href: ROUTES.contact },
]

export const ALL_NAV = [...LEFT_NAV, ...RIGHT_NAV] as const
