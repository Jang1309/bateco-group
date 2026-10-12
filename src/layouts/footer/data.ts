import ROUTES from '@/configs/routes'
import type { NavItem } from '@/layouts/header/data'

export type Office = {
  title: string
  address: string
  phone: string
  hotline: string
  email: string
}

export const OFFICES: Office[] = [
  {
    title: 'Trụ sở tập đoàn',
    address:
      'Tòa Bateco Group, Lô B44 Khu đấu giá quyền sử dụng đất 3ha, P. Phúc Diễn, Q. Bắc Từ Liêm, Hà Nội',
    phone: '024 6688 1982',
    hotline: '097 380 8808',
    email: 'info@batecogroup.vn',
  },
  {
    title: 'Chi nhánh Thành phố Hồ Chí Minh',
    address:
      'Tòa Bateco Group, Lô B44 Khu đấu giá quyền sử dụng đất 3ha, P. Phúc Diễn, Q. Bắc Từ Liêm, Hà Nội',
    phone: '028 6656 8282',
    hotline: '090 120 7558',
    email: 'hcm.info@batecogroup.vn',
  },
]

export const FOOTER_NAV: NavItem[] = [
  { key: 'about', href: ROUTES.about },
  { key: 'business', href: ROUTES.business },
  { key: 'projects', href: ROUTES.projects },
  { key: 'news', href: ROUTES.news },
]
