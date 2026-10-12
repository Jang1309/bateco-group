export type Milestone = {
  from: number
  to: number
  title: string
  description?: string
}

// TODO: bổ sung mô tả cho các giai đoạn còn trống khi có nội dung chính thức
export const MILESTONES: Milestone[] = [
  { from: 2012, to: 2016, title: 'Khởi nghiệp & Thích nghi' },
  { from: 2017, to: 2022, title: 'Xây móng trên nền DVCN' },
  { from: 2023, to: 2026, title: 'Đổi mới tư duy' },
  {
    from: 2026,
    to: 2030,
    title: 'Phát triển 05 lĩnh vực cốt lõi',
    description:
      'Thiết lập tầm nhìn chiến lược dài hạn, định hình rõ nét việc tập trung toàn bộ nguồn lực để phát triển 06 lĩnh vực cốt lõi mũi nhọn bao gồm: Bán dẫn, Bất động sản, Xăng dầu, Khoáng sản, AI và M&A dự án.',
  },
  { from: 2030, to: 2032, title: 'Khởi nghiệp & Thích nghi' },
]
