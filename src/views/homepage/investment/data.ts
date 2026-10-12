import ROUTES from '@/configs/routes'

export type InvestmentItem = {
  label: string
  title: [string, string]
  description: string
  image: string
  href: (typeof ROUTES)[keyof typeof ROUTES]
}

// TODO: thay ảnh placeholder bằng ảnh thật của từng lĩnh vực (public/home/investment/*)
export const INVESTMENTS: InvestmentItem[] = [
  {
    label: 'Dịch vụ công nghiệp',
    title: ['Dịch vụ', 'công nghiệp'],
    description:
      'Kết hợp nghiên cứu, ứng dụng công nghệ số tiên phong với giải pháp xây dựng thương hiệu chuyên nghiệp, cung cấp giải pháp chuyển đổi số toàn diện cho hoạt động vận hành doanh nghiệp.',
    image: '/home/investment/d-card-1.png',
    href: ROUTES.business,
  },
  {
    label: 'BĐS - Hạ tầng công nghiệp',
    title: ['Bất động sản', 'hạ tầng công nghiệp'],
    description:
      'Đầu tư, phát triển và vận hành hệ thống khu công nghiệp, nhà xưởng, kho bãi hiện đại, đáp ứng tiêu chuẩn quốc tế cho các nhà đầu tư trong và ngoài nước.',
    image: '/home/investment/d-card-2.png',
    href: ROUTES.business,
  },
  {
    label: 'An ninh - Quốc phòng',
    title: ['An ninh', 'quốc phòng'],
    description:
      'Nghiên cứu, sản xuất và cung cấp các giải pháp, thiết bị kỹ thuật phục vụ nhiệm vụ an ninh - quốc phòng, góp phần bảo vệ vững chắc chủ quyền quốc gia.',
    image: '/home/investment/d-card-3.png',
    href: ROUTES.business,
  },
  {
    label: 'Kinh tế xanh',
    title: ['Kinh tế', 'xanh'],
    description:
      'Phát triển các dự án năng lượng tái tạo, giải pháp tiết kiệm năng lượng và kinh tế tuần hoàn, hướng tới mục tiêu tăng trưởng bền vững.',
    image: '/home/investment/d-card-4.png',
    href: ROUTES.business,
  },
  {
    label: 'Sản xuất - Vật liệu mới',
    title: ['Sản xuất', 'vật liệu mới'],
    description:
      'Ứng dụng công nghệ tiên tiến trong sản xuất và nghiên cứu vật liệu mới, nâng cao giá trị gia tăng và năng lực cạnh tranh cho ngành công nghiệp Việt Nam.',
    image: '/home/investment/d-card-5.png',
    href: ROUTES.business,
  },
]
