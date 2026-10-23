import { ChartNoAxesColumn, Cog, Flag, Lightbulb, Sprout, type LucideIcon } from 'lucide-react'

export type JourneyMilestone = {
  id: string
  from: number
  to: number
  /** Text ngắn trên card */
  shortTitle: string
  /** Tiêu đề vùng giữa khi hover */
  panelTitle: string
  description: string
  icon: LucideIcon
}

// TODO: cập nhật mô tả giai đoạn từ CMS / nội dung chính thức
export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: '2012-2016',
    from: 2012,
    to: 2016,
    shortTitle: 'Khởi nghiệp & Thích nghi',
    panelTitle: 'Khởi nghiệp & Thích nghi',
    description:
      'Giai đoạn hình thành và thích nghi thị trường, xây dựng nền tảng vận hành và văn hóa doanh nghiệp Bateco.',
    icon: Sprout,
  },
  {
    id: '2017-2022',
    from: 2017,
    to: 2022,
    shortTitle: 'Xây móng trên nền DVCN',
    panelTitle: 'Xây móng trên nền DVCN',
    description:
      'Tập trung củng cố năng lực dịch vụ công nghiệp, mở rộng mạng lưới đối tác và chuẩn hóa quy trình vận hành.',
    icon: Cog,
  },
  {
    id: '2023-2026',
    from: 2023,
    to: 2026,
    shortTitle: 'Đổi mới tư duy',
    panelTitle: 'Phát triển 5 lĩnh vực dự án',
    description:
      'Xác định tầm nhìn chiến lược dài hạn, tập trung nguồn lực phát triển các lĩnh vực cốt lõi: Bán dẫn, Bất động sản, Xăng dầu, Khoáng sản, AI và M&A dự án.',
    icon: Lightbulb,
  },
  {
    id: '2026-2030',
    from: 2026,
    to: 2030,
    shortTitle: 'Mở rộng hệ sinh thái',
    panelTitle: 'Mở rộng hệ sinh thái đa ngành',
    description:
      'Đẩy mạnh đầu tư hệ sinh thái liên kết, nâng cao năng lực thực thi và khẳng định vị thế trên thị trường khu vực.',
    icon: ChartNoAxesColumn,
  },
  {
    id: '2030-2032',
    from: 2030,
    to: 2032,
    shortTitle: 'Dẫn đầu bền vững',
    panelTitle: 'Dẫn đầu và phát triển bền vững',
    description:
      'Hoàn thiện mô hình tăng trưởng bền vững, kiến tạo giá trị dài hạn cho cổ đông, đối tác và cộng đồng.',
    icon: Flag,
  },
]
