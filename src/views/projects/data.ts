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

// Cùng id với lĩnh vực ở trang /linh-vuc-kinh-doanh (EN: /business-field)
export const PROJECT_SECTORS: ProjectSector[] = [
  { id: 'industrial-services', label: 'Dịch vụ công nghiệp' },
  { id: 'industrial-real-estate', label: 'BĐS hạ tầng công nghiệp' },
  { id: 'defense-security', label: 'Quốc phòng - An ninh' },
  { id: 'green-economy', label: 'Kinh tế xanh' },
  { id: 'advanced-materials', label: 'Sản xuất vật liệu mới' },
]

// TODO: thay dữ liệu mẫu bằng dữ liệu thật từ CMS (tên, ảnh, lĩnh vực của từng dự án)
export const PROJECTS: Project[] = [
  {
    id: 'bateco-industrial-services-14',
    title: 'Lễ kỷ niệm 14 năm Bateco Group',
    sector: 'industrial-services',
    image: '/home/vision/d-img-1.jpg',
    date: '2026-09-13',
    featured: true,
  },
  {
    id: 'bateco-green-industrial-park',
    title: 'Khu công nghiệp xanh Bateco',
    sector: 'industrial-real-estate',
    image: '/home/investment/d-card-2.png',
    date: '2026-08-20',
    featured: true,
  },
  {
    id: 'bateco-siltron',
    title: 'Bateco Siltron - Tiên phong lĩnh vực bán dẫn',
    sector: 'advanced-materials',
    image: '/home/investment/d-card-5.png',
    date: '2026-07-12',
    featured: true,
  },
  {
    id: 'bac-ninh-automation-plant',
    title: 'Nhà máy tự động hóa Bắc Ninh',
    sector: 'industrial-services',
    image: '/home/investment/d-card-1.png',
    date: '2026-06-05',
  },
  {
    id: 'hai-phong-logistics-center',
    title: 'Trung tâm logistics Hải Phòng',
    sector: 'industrial-real-estate',
    image: '/home/news/card-2.jpg',
    date: '2026-05-18',
  },
  {
    id: 'integrated-security-monitoring',
    title: 'Hệ thống giám sát an ninh tích hợp',
    sector: 'defense-security',
    image: '/home/investment/d-card-3.png',
    date: '2026-04-22',
  },
  {
    id: 'high-tech-agriculture-farm',
    title: 'Trang trại nông nghiệp công nghệ cao',
    sector: 'green-economy',
    image: '/home/investment/d-card-4.png',
    date: '2026-03-30',
  },
  {
    id: 'composite-materials-plant',
    title: 'Nhà máy vật liệu composite thế hệ mới',
    sector: 'advanced-materials',
    image: '/home/investment/d-card-5.png',
    date: '2026-02-14',
  },
  {
    id: 'fdi-line-maintenance',
    title: 'Bảo trì dây chuyền cho khối doanh nghiệp FDI',
    sector: 'industrial-services',
    image: '/home/investment/d-card-1.png',
    date: '2026-01-09',
  },
  {
    id: 'bateco-land',
    title: 'Bateco Land',
    sector: 'industrial-real-estate',
    image: '/home/news/card-1.jpg',
    date: '2025-11-26',
  },
  {
    id: 'rooftop-solar-factories',
    title: 'Điện mặt trời mái nhà xưởng',
    sector: 'green-economy',
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

export type ProjectSpec = {
  label: string
  value: string
}

export type ProjectDetail = Project & {
  location: string
  summary: string
  specs: ProjectSpec[]
  /** HTML từ CMS, render bằng dangerouslySetInnerHTML */
  content: string
  gallery: string[]
}

// TODO: thay bằng dữ liệu chi tiết thật từ CMS, hiện mọi dự án dùng chung nội dung mẫu
const SAMPLE_DETAIL: Omit<ProjectDetail, keyof Project> = {
  location: 'Bắc Ninh, Việt Nam',
  summary:
    'Dự án trọng điểm của Tập đoàn BATECO, ứng dụng công nghệ hiện đại và tiêu chuẩn vận hành quốc tế nhằm tạo ra giá trị bền vững cho đối tác và cộng đồng.',
  specs: [
    { label: 'Địa điểm', value: 'Bắc Ninh, Việt Nam' },
    { label: 'Quy mô', value: '120 ha' },
    { label: 'Tổng vốn đầu tư', value: '2.500 tỷ đồng' },
    { label: 'Chủ đầu tư', value: 'Tập đoàn BATECO' },
    { label: 'Trạng thái', value: 'Đang triển khai' },
  ],
  content: `
    <h2>Tổng quan dự án</h2>
    <p>Dự án được quy hoạch đồng bộ theo mô hình hiện đại, kết nối thuận tiện với các trục giao thông chính và cảng biển, đáp ứng nhu cầu của các nhà đầu tư trong và ngoài nước.</p>
    <p>BATECO chú trọng <strong>chất lượng thi công, tiến độ và an toàn</strong> trong toàn bộ vòng đời dự án, từ thiết kế, xây dựng đến vận hành và bảo trì.</p>
    <h2>Điểm nổi bật</h2>
    <ul>
      <li>Hạ tầng kỹ thuật đồng bộ, đạt chuẩn quốc tế.</li>
      <li>Ứng dụng năng lượng tái tạo và giải pháp tiết kiệm năng lượng.</li>
      <li>Hệ thống quản lý vận hành thông minh, giám sát 24/7.</li>
    </ul>
    <h2>Giá trị mang lại</h2>
    <p>Dự án góp phần tạo việc làm cho hàng nghìn lao động, thúc đẩy phát triển kinh tế địa phương và khẳng định vị thế của BATECO trong lĩnh vực hạ tầng công nghiệp.</p>
  `,
  gallery: [
    '/home/vision/d-img-1.jpg',
    '/home/vision/d-img-2.jpg',
    '/home/vision/d-img-3.jpg',
    '/home/investment/d-card-1.png',
    '/home/investment/d-card-4.png',
    '/home/investment/d-card-2.png',
    '/home/investment/d-card-3.png',
    '/home/investment/d-card-5.png',
    '/home/news/card-1.jpg',
    '/home/news/card-2.jpg',
  ],
}

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  const project = PROJECTS.find((item) => item.id === slug)
  return project ? { ...project, ...SAMPLE_DETAIL } : undefined
}
