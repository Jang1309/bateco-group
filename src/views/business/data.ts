export type Sector = {
  id: string
  title: string
  description: string
  image: string
}

// TODO: thay ảnh placeholder bằng ảnh thật của từng lĩnh vực (public/business/*)
export const SECTORS: Sector[] = [
  {
    id: 'industrial-services',
    title: 'Dịch vụ công nghiệp',
    description:
      'Cung ứng giải pháp bảo trì, lắp đặt và hỗ trợ kỹ thuật vận hành nhà máy hiện đại, tối ưu hiệu suất dây chuyền sản xuất tự động hóa chuẩn quốc tế cho các tập đoàn đa quốc gia và khu kinh tế trọng điểm.',
    image: '/home/investment/d-card-1.png',
  },
  {
    id: 'industrial-real-estate',
    title: 'Bất động sản - Hạ tầng công nghiệp',
    description:
      'Phát triển các cụm khu công nghiệp sinh thái, hạ tầng logistics xanh và hệ thống kho bãi thông minh đón đầu làn sóng dịch chuyển vốn đầu tư trực tiếp nước ngoài (FDI), đồng thời hình thành các quần thể dịch vụ phụ trợ hiện đại.',
    image: '/home/investment/d-card-2.png',
  },
  {
    id: 'defense-security',
    title: 'An ninh - Quốc phòng',
    description:
      'Cung cấp giải pháp an ninh kỹ thuật cao, hệ thống giám sát tích hợp chuyên dụng, công nghệ thông tin phòng thủ và trang thiết bị hỗ trợ đáp ứng tiêu chuẩn khắt khe phục vụ an ninh quốc gia và trật tự an toàn xã hội.',
    image: '/home/investment/d-card-3.png',
  },
  {
    id: 'green-economy',
    title: 'Kinh tế xanh & Phát triển bền vững',
    description:
      'Tiên phong chuyển đổi năng lượng tái tạo, phát triển các giải pháp xử lý tuần hoàn tài nguyên, nông nghiệp công nghệ cao và tín chỉ carbon nhằm giảm phát thải ròng, đồng hành cùng mục tiêu Net Zero 2050 của quốc gia.',
    image: '/home/investment/d-card-4.png',
  },
  {
    id: 'advanced-materials',
    title: 'Sản xuất - Vật liệu mới',
    description:
      'Nghiên cứu, ứng dụng và sản xuất vật liệu composite thế hệ mới, phụ gia hóa chất cao cấp, polymer kỹ thuật và hợp kim bền nhẹ phục vụ công nghiệp chế tạo, hàng không vũ trụ và hạ tầng tương lai.',
    image: '/home/investment/d-card-5.png',
  },
]
