export type ProjectSector = {
  id: string
  /** Tên ngắn hiển thị trên tab lọc và nhãn card */
  label: string
}

export type Project = {
  id: string
  title: string
  sector: ProjectSector['id']
  image: string
  /** yyyy-mm-dd, dùng để sắp xếp */
  date: string
  featured?: boolean
}

export const PROJECTS_PER_PAGE = 6

// Cùng id với lĩnh vực ở trang /linh-vuc-kinh-doanh
export const PROJECT_SECTORS: ProjectSector[] = [
  { id: 'dich-vu-cong-nghiep', label: 'Dịch vụ công nghiệp' },
  { id: 'bat-dong-san-ha-tang-cong-nghiep', label: 'BĐS hạ tầng công nghiệp' },
  { id: 'an-ninh-quoc-phong', label: 'Quốc phòng - An ninh' },
  { id: 'kinh-te-xanh-phat-trien-ben-vung', label: 'Kinh tế xanh' },
  { id: 'san-xuat-vat-lieu-moi', label: 'Sản xuất vật liệu mới' },
]

// TODO: thay dữ liệu mẫu bằng dữ liệu thật từ CMS (tên, ảnh, lĩnh vực của từng dự án)
export const PROJECTS: Project[] = [
  {
    id: 'bateco-industrial-services-14',
    title: 'Lễ kỷ niệm 14 năm Bateco Group',
    sector: 'dich-vu-cong-nghiep',
    image: '/home/vision/d-img-1.jpg',
    date: '2026-09-13',
    featured: true,
  },
  {
    id: 'khu-cong-nghiep-xanh-bateco',
    title: 'Khu công nghiệp xanh Bateco',
    sector: 'bat-dong-san-ha-tang-cong-nghiep',
    image: '/home/investment/d-card-2.png',
    date: '2026-08-20',
    featured: true,
  },
  {
    id: 'bateco-siltron',
    title: 'Bateco Siltron - Tiên phong lĩnh vực bán dẫn',
    sector: 'san-xuat-vat-lieu-moi',
    image: '/home/investment/d-card-5.png',
    date: '2026-07-12',
    featured: true,
  },
  {
    id: 'nha-may-tu-dong-hoa-bac-ninh',
    title: 'Nhà máy tự động hóa Bắc Ninh',
    sector: 'dich-vu-cong-nghiep',
    image: '/home/investment/d-card-1.png',
    date: '2026-06-05',
  },
  {
    id: 'trung-tam-logistics-hai-phong',
    title: 'Trung tâm logistics Hải Phòng',
    sector: 'bat-dong-san-ha-tang-cong-nghiep',
    image: '/home/news/card-2.jpg',
    date: '2026-05-18',
  },
  {
    id: 'he-thong-giam-sat-an-ninh-tich-hop',
    title: 'Hệ thống giám sát an ninh tích hợp',
    sector: 'an-ninh-quoc-phong',
    image: '/home/investment/d-card-3.png',
    date: '2026-04-22',
  },
  {
    id: 'trang-trai-nong-nghiep-cong-nghe-cao',
    title: 'Trang trại nông nghiệp công nghệ cao',
    sector: 'kinh-te-xanh-phat-trien-ben-vung',
    image: '/home/investment/d-card-4.png',
    date: '2026-03-30',
  },
  {
    id: 'nha-may-vat-lieu-composite',
    title: 'Nhà máy vật liệu composite thế hệ mới',
    sector: 'san-xuat-vat-lieu-moi',
    image: '/home/investment/d-card-5.png',
    date: '2026-02-14',
  },
  {
    id: 'bao-tri-day-chuyen-fdi',
    title: 'Bảo trì dây chuyền cho khối doanh nghiệp FDI',
    sector: 'dich-vu-cong-nghiep',
    image: '/home/investment/d-card-1.png',
    date: '2026-01-09',
  },
  {
    id: 'bateco-land',
    title: 'Bateco Land',
    sector: 'bat-dong-san-ha-tang-cong-nghiep',
    image: '/home/news/card-1.jpg',
    date: '2025-11-26',
  },
  {
    id: 'dien-mat-troi-mai-nha-xuong',
    title: 'Điện mặt trời mái nhà xưởng',
    sector: 'kinh-te-xanh-phat-trien-ben-vung',
    image: '/home/investment/d-card-4.png',
    date: '2025-10-03',
  },
]

export type ProjectSort = 'moi-nhat' | 'cu-nhat'

export function getSectorLabel(id: string) {
  return PROJECT_SECTORS.find((sector) => sector.id === id)?.label ?? ''
}

export function filterProjects({
  sector,
  query,
  sort,
}: {
  sector?: string
  query?: string
  sort: ProjectSort
}) {
  const keyword = query?.trim().toLocaleLowerCase('vi')

  return PROJECTS.filter((project) => !sector || project.sector === sector)
    .filter((project) => !keyword || project.title.toLocaleLowerCase('vi').includes(keyword))
    .sort((a, b) =>
      sort === 'cu-nhat' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date),
    )
}
