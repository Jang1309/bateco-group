import { Briefcase, Shield, TrendingUp, type LucideIcon } from 'lucide-react'

export type Job = {
  id: string
  code: string
  title: string
  type: string
  department: string
  location: string
  salary: string
  education: string
  /** HTML từ CMS, render bằng dangerouslySetInnerHTML */
  content: string
}

export type WhyItem = {
  id: string
  number: string
  title: string
  description: string
  icon: LucideIcon
}

export type ProcessStep = {
  id: string
  number: string
  title: string
  description: string
}

export const WHY_ITEMS: WhyItem[] = [
  {
    id: 'env',
    number: '01',
    title: 'Môi trường làm việc chuyên nghiệp',
    description:
      'Văn hóa minh bạch, tôn trọng và hỗ trợ lẫn nhau giúp mỗi thành viên phát huy tối đa năng lực.',
    icon: Briefcase,
  },
  {
    id: 'growth',
    number: '02',
    title: 'Lộ trình thăng tiến rõ ràng',
    description:
      'Chương trình đào tạo liên tục và cơ hội thăng tiến dựa trên năng lực, kết quả thực tế.',
    icon: TrendingUp,
  },
  {
    id: 'benefit',
    number: '03',
    title: 'Chế độ đãi ngộ hấp dẫn',
    description:
      'Thu nhập cạnh tranh, bảo hiểm toàn diện và phúc lợi gắn với hiệu quả đóng góp dài hạn.',
    icon: Shield,
  },
]

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'apply',
    number: '01',
    title: 'Nộp hồ sơ',
    description: 'Ứng viên gửi CV và thư giới thiệu qua email hoặc cổng tuyển dụng của BATECO.',
  },
  {
    id: 'interview',
    number: '02',
    title: 'Phỏng vấn chuyên môn',
    description: 'Trao đổi với bộ phận chuyên môn để đánh giá kỹ năng và kinh nghiệm phù hợp.',
  },
  {
    id: 'assess',
    number: '03',
    title: 'Đánh giá năng lực',
    description: 'Kiểm tra năng lực chuyên môn, tư duy và mức độ phù hợp văn hóa doanh nghiệp.',
  },
  {
    id: 'offer',
    number: '04',
    title: 'Thư mời công việc',
    description: 'Ứng viên nhận kết quả và thư mời làm việc khi vượt qua các vòng tuyển chọn.',
  },
]

// TODO: lấy content HTML thật từ CMS theo slug
const SAMPLE_JOB_CONTENT = `
<h2>Mô tả công việc</h2>
<h3>I. THÔNG TIN CÔNG TY</h3>
<p><strong>BATECO GROUP</strong> là tập đoàn đa ngành với định hướng phát triển bền vững trong lĩnh vực bất động sản công nghiệp, dịch vụ kỹ thuật và đầu tư hạ tầng. Chúng tôi xây dựng môi trường làm việc chuyên nghiệp, nơi năng lực được ghi nhận và phát triển dài hạn.</p>
<p>Tìm hiểu thêm tại <a href="/">website BATECO</a> hoặc các kênh truyền thông chính thức của Tập đoàn.</p>
<h3>II. THÔNG TIN LIÊN HỆ</h3>
<ul>
  <li>Người liên hệ: Phòng Nhân sự BATECO Group</li>
  <li>Điện thoại: 024 7300 xxxx</li>
  <li>Email: tuyendung@bateco.vn</li>
</ul>
<h3>Mô tả công việc chính</h3>
<ul>
  <li>Hỗ trợ Chủ tịch HĐQT sắp xếp lịch họp, công tác và các đầu việc ưu tiên.</li>
  <li>Chuẩn bị tài liệu, biên bản và theo dõi tiến độ các dự án chiến lược.</li>
  <li>Phối hợp với các phòng ban để đảm bảo thông tin thông suốt, kịp thời.</li>
  <li>Tham gia tổ chức sự kiện nội bộ và đối ngoại theo yêu cầu lãnh đạo.</li>
</ul>
<h3>YÊU CẦU</h3>
<ul>
  <li>Tốt nghiệp Đại học trở lên, ưu tiên chuyên ngành phù hợp.</li>
  <li>Thành thạo tiếng Anh hoặc tiếng Trung giao tiếp công việc.</li>
  <li>Kỹ năng giao tiếp, tổ chức công việc và xử lý tình huống tốt.</li>
  <li>Chủ động, trung thực, giữ bí mật thông tin doanh nghiệp.</li>
</ul>
<h3>QUYỀN LỢI</h3>
<ul>
  <li>Mức lương cạnh tranh, thưởng theo hiệu quả công việc.</li>
  <li>Bảo hiểm đầy đủ theo luật và phúc lợi nội bộ.</li>
  <li>Đào tạo chuyên môn, lộ trình thăng tiến rõ ràng.</li>
  <li>Môi trường làm việc văn minh, cơ hội gắn bó lâu dài.</li>
</ul>
`

// TODO: thay bằng dữ liệu thật từ CMS / HR system
export const JOBS: Job[] = [
  {
    id: 'board-chairman-secretary',
    code: 'BT-TH3',
    title: 'Tuyển dụng Thư ký Chủ tịch Hội đồng Quản trị',
    type: 'Fulltime',
    department: 'Phòng kinh doanh',
    location: 'Hà Nội',
    salary: '20.000.000 VNĐ',
    education: 'Đại học',
    content: SAMPLE_JOB_CONTENT,
  },
  {
    id: 'business-specialist',
    code: 'BT-KD12',
    title: 'Chuyên viên Kinh doanh Bất động sản Công nghiệp',
    type: 'Fulltime',
    department: 'Phòng kinh doanh',
    location: 'Hồ Chí Minh',
    salary: 'Thỏa thuận',
    education: 'Đại học',
    content: SAMPLE_JOB_CONTENT,
  },
  {
    id: 'operations-engineer',
    code: 'BT-DV08',
    title: 'Kỹ sư Vận hành & Bảo trì Nhà máy',
    type: 'Fulltime',
    department: 'Dịch vụ công nghiệp',
    location: 'Bình Dương',
    salary: '18.000.000 VNĐ',
    education: 'Đại học',
    content: SAMPLE_JOB_CONTENT,
  },
  {
    id: 'hr-specialist',
    code: 'BT-HC05',
    title: 'Chuyên viên Nhân sự & Đào tạo',
    type: 'Fulltime',
    department: 'Hành chính nhân sự',
    location: 'Hà Nội',
    salary: '15.000.000 VNĐ',
    education: 'Đại học',
    content: SAMPLE_JOB_CONTENT,
  },
  {
    id: 'general-accountant',
    code: 'BT-TC03',
    title: 'Kế toán Tổng hợp',
    type: 'Fulltime',
    department: 'Tài chính kế toán',
    location: 'Hà Nội',
    salary: '14.000.000 VNĐ',
    education: 'Đại học',
    content: SAMPLE_JOB_CONTENT,
  },
  {
    id: 'construction-engineer',
    code: 'BT-XD07',
    title: 'Kỹ sư Xây dựng Công trình Công nghiệp',
    type: 'Fulltime',
    department: 'Ban dự án',
    location: 'Hải Phòng',
    salary: 'Thỏa thuận',
    education: 'Đại học',
    content: SAMPLE_JOB_CONTENT,
  },
  {
    id: 'marketing-specialist',
    code: 'BT-MKT02',
    title: 'Chuyên viên Marketing & Truyền thông',
    type: 'Fulltime',
    department: 'Marketing',
    location: 'Hồ Chí Minh',
    salary: '16.000.000 VNĐ',
    education: 'Đại học',
    content: SAMPLE_JOB_CONTENT,
  },
  {
    id: 'legal-officer',
    code: 'BT-PC01',
    title: 'Nhân viên Pháp chế Doanh nghiệp',
    type: 'Fulltime',
    department: 'Pháp chế',
    location: 'Hà Nội',
    salary: '17.000.000 VNĐ',
    education: 'Đại học',
    content: SAMPLE_JOB_CONTENT,
  },
  {
    id: 'business-intern',
    code: 'BT-TT04',
    title: 'Thực tập sinh Kinh doanh',
    type: 'Part-time',
    department: 'Phòng kinh doanh',
    location: 'Hà Nội',
    salary: 'Theo chính sách',
    education: 'Sinh viên năm cuối',
    content: SAMPLE_JOB_CONTENT,
  },
]

export const JOB_SLUGS = JOBS.map((job) => job.id)

export function getJobDetail(slug: string) {
  return JOBS.find((job) => job.id === slug)
}

export const JOB_DEPARTMENTS = [
  'Phòng kinh doanh',
  'Dịch vụ công nghiệp',
  'Hành chính nhân sự',
  'Tài chính kế toán',
  'Ban dự án',
  'Marketing',
  'Pháp chế',
] as const

export const JOB_LOCATIONS = ['Hà Nội', 'Hồ Chí Minh', 'Bình Dương', 'Hải Phòng'] as const

export const JOB_TYPES = ['Fulltime', 'Part-time'] as const

export const JOBS_PER_PAGE = 3
