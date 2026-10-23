export type ContactOffice = {
  id: string
  title: string
  city: string
  address: string
  phone: string
  email: string
  mapQuery: string
  featured?: boolean
}

// TODO: cập nhật địa chỉ chi nhánh thật từ CMS / vận hành
export const CONTACT_OFFICES: ContactOffice[] = [
  {
    id: 'ha-noi',
    title: 'Trụ sở chính',
    city: 'Hà Nội',
    address: 'Lô B44, Khu đấu giá 3ha, Phú Diễn, Hà Nội, Vietnam',
    phone: '024 6688 1982',
    email: 'info@batecogroup.vn',
    mapQuery: 'Lô B44, Khu đấu giá 3ha, Phú Diễn, Bắc Từ Liêm, Hà Nội',
    featured: true,
  },
  {
    id: 'ho-chi-minh',
    title: 'Chi nhánh Hồ Chí Minh',
    city: 'Hồ Chí Minh',
    address: 'Quận 1, Thành phố Hồ Chí Minh, Việt Nam',
    phone: '028 6656 8282',
    email: 'hcm.info@batecogroup.vn',
    mapQuery: 'Quận 1, Hồ Chí Minh, Việt Nam',
  },
  {
    id: 'quang-ninh',
    title: 'Chi nhánh Quảng Ninh',
    city: 'Quảng Ninh',
    address: 'Thành phố Hạ Long, Quảng Ninh, Việt Nam',
    phone: '0203 3555 888',
    email: 'qn.info@batecogroup.vn',
    mapQuery: 'Hạ Long, Quảng Ninh, Việt Nam',
  },
]

export function getMapsEmbedUrl(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&hl=vi&output=embed`
}

export function getMapsLink(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
