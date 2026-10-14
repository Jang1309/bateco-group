export type NewsCategory = {
  id: string
  title: string
}

export type NewsArticle = {
  id: string
  title: string
  excerpt: string
  category: NewsCategory['id']
  date: string
  image: string
  // TODO: trỏ tới trang chi tiết bài viết khi có
  href: string
}

export type Award = {
  id: string
  label: string
  title: string
  description?: string
}

export type OtherNews = {
  id: string
  tag: string
  title: string
  excerpt: string
  href: string
}

export const NEWS_CATEGORIES: NewsCategory[] = [
  { id: 'dich-vu-cong-nghiep', title: 'Dịch vụ Công nghiệp' },
  { id: 'bat-dong-san-ha-tang', title: 'Bất động sản & Hạ tầng Công nghiệp' },
  { id: 'trach-nhiem-xa-hoi', title: 'Trách nhiệm Xã hội' },
  { id: 'van-hoa-con-nguoi', title: 'Văn hóa & Con người BATECO' },
]

export function getCategoryTitle(id: string) {
  return NEWS_CATEGORIES.find((category) => category.id === id)?.title ?? ''
}

// TODO: thay toàn bộ dữ liệu mẫu bằng dữ liệu thật từ CMS
export const FEATURED_ARTICLE: NewsArticle = {
  id: 'bateco-khoi-cong-cac-du-an-trong-diem',
  title:
    'BATECO Group: Khởi công các dự án trọng điểm phát triển hạ tầng và công nghệ kết nối vùng kinh tế 2026',
  excerpt:
    'Sáng ngày 29/09/2026, tại trung tâm công nghiệp công nghệ cao, Tập đoàn BATECO phối hợp cùng các bộ ban ngành long trọng tổ chức Lễ khởi công các hạng mục đầu tư trọng điểm, mở rộng mạng lưới hạ tầng vận tải hiện đại phục vụ chuỗi cung ứng chiến lược quốc gia.',
  category: 'dich-vu-cong-nghiep',
  date: '29/09/2026',
  image: '/home/news/card-2.jpg',
  href: '#',
}

export const HIGHLIGHT_ARTICLES: NewsArticle[] = [
  {
    id: 'phi-cong-ai-a350',
    title: 'Phi công lái A350 đầu tiên của BATECO Aviation về nhà để kiến tạo đội bay',
    excerpt: 'Dấu ấn mới của hành trình phát triển nguồn nhân lực hàng không chất lượng cao.',
    category: 'trach-nhiem-xa-hoi',
    date: '23/09/2026',
    image: '/home/news/card-5.jpg',
    href: '#',
  },
  {
    id: 'bateco-marriott',
    title: 'BATECO Group - Marriott International trao văn kiện hợp tác',
    excerpt: 'Hai bên ký kết hợp tác phát triển và vận hành tổ hợp khách sạn tiêu chuẩn quốc tế.',
    category: 'bat-dong-san-ha-tang',
    date: '24/09/2026',
    image: '/home/news/card-1.jpg',
    href: '#',
  },
  {
    id: 'ky-niem-14-nam',
    title: 'Tập đoàn Bateco kỷ niệm sinh nhật 14 năm',
    excerpt: 'Dấu mốc khẳng định hành trình xây dựng thương hiệu Việt có khát vọng vươn tầm.',
    category: 'van-hoa-con-nguoi',
    date: '13/09/2026',
    image: '/home/vision/d-img-1.jpg',
    href: '#',
  },
  {
    id: 'khu-cong-nghiep-xanh',
    title: 'Khởi động giai đoạn II khu công nghiệp xanh Bateco',
    excerpt: 'Mở rộng quỹ đất sạch đón làn sóng dịch chuyển vốn đầu tư FDI chất lượng cao.',
    category: 'bat-dong-san-ha-tang',
    date: '05/09/2026',
    image: '/home/investment/d-card-2.png',
    href: '#',
  },
]

export type CategoryBlock = {
  category: NewsCategory['id']
  /** 2 bài có ảnh */
  cards: NewsArticle[]
  /** Các bài chỉ hiển thị tiêu đề */
  list: Pick<NewsArticle, 'id' | 'title' | 'date' | 'href'>[]
}

export const CATEGORY_BLOCKS: CategoryBlock[] = [
  {
    category: 'dich-vu-cong-nghiep',
    cards: [
      {
        id: 'giai-phap-bao-tri',
        title: 'Cung ứng giải pháp bảo trì, lắp đặt và vận hành nhà máy công nghệ cao',
        excerpt: 'BATECO Industrial Services triển khai toàn diện giải pháp bảo trì dự phòng.',
        category: 'dich-vu-cong-nghiep',
        date: '24/09/2026',
        image: '/home/investment/d-card-1.png',
        href: '#',
      },
      {
        id: 'robot-tu-dong-hoa',
        title: 'BATECO triển khai hệ thống robot tự động hóa thông minh',
        excerpt: 'Ứng dụng cánh tay robot và dây chuyền tự động hóa thế hệ mới tại nhà máy.',
        category: 'dich-vu-cong-nghiep',
        date: '18/09/2026',
        image: '/home/investment/d-card-5.png',
        href: '#',
      },
    ],
    list: [
      {
        id: 'ky-ket-bien-ban-hop-tac',
        title: 'Ký kết biên bản hợp tác nâng cao hiệu suất chuỗi vận tải logistics khu công nghiệp',
        date: '21/09/2026',
        href: '#',
      },
      {
        id: 'van-hanh-tram-bien-ap',
        title: 'Đưa vào vận hành trạm biến áp tiêu chuẩn ISO/IEC 17025',
        date: '10/09/2026',
        href: '#',
      },
    ],
  },
  {
    category: 'bat-dong-san-ha-tang',
    cards: [
      {
        id: 'ra-mat-glory-park',
        title: 'BATECO Group ra mắt tổ hợp thương mại & nhà ở Glory Park',
        excerpt: 'Định hình chuẩn sống mới với không gian xanh và tiện ích đồng bộ.',
        category: 'bat-dong-san-ha-tang',
        date: '22/09/2026',
        image: '/home/news/card-1.jpg',
        href: '#',
      },
      {
        id: 'quan-ly-glory-park',
        title: 'BATECO Property ra quân đợt bàn giao dự án Glory Park quý IV',
        excerpt: 'Khách hàng đầu tiên nhận bàn giao căn hộ đúng tiến độ cam kết.',
        category: 'bat-dong-san-ha-tang',
        date: '15/09/2026',
        image: '/home/investment/d-card-2.png',
        href: '#',
      },
    ],
    list: [
      {
        id: 'don-song-dich-chuyen',
        title: 'Đón sóng dịch chuyển: Gần 800 nhà đầu tư tham dự sự kiện của BATECO',
        date: '12/09/2026',
        href: '#',
      },
      {
        id: 'smart-tower',
        title: 'BATECO Smart Tower - Khởi động giai đoạn II khu liên hợp điều hành',
        date: '02/09/2026',
        href: '#',
      },
    ],
  },
  {
    category: 'trach-nhiem-xa-hoi',
    cards: [
      {
        id: 'nong-nghiep-xanh',
        title: 'Đồng hành cùng nông dân chuyển đổi sang canh tác nông nghiệp xanh',
        excerpt: 'Chương trình hỗ trợ kỹ thuật và giống cây cho hơn 500 hộ gia đình.',
        category: 'trach-nhiem-xa-hoi',
        date: '20/09/2026',
        image: '/home/investment/d-card-4.png',
        href: '#',
      },
      {
        id: 'hoc-bong-ky-thuat',
        title: 'Trao 200 suất học bổng cho sinh viên ngành kỹ thuật',
        excerpt: 'Quỹ học bổng BATECO tiếp sức thế hệ kỹ sư trẻ theo đuổi đam mê.',
        category: 'trach-nhiem-xa-hoi',
        date: '08/09/2026',
        image: '/home/news/card-5.jpg',
        href: '#',
      },
    ],
    list: [
      {
        id: 'bateco-pride',
        title: 'Chiến dịch nội bộ "BATECO Pride - Tự hào cống hiến": Tôn vinh tinh thần đổi mới',
        date: '19/08/2026',
        href: '#',
      },
      {
        id: 'hien-mau',
        title: 'Ngày hội hiến máu tình nguyện thu hút hơn 1.000 cán bộ nhân viên',
        date: '01/08/2026',
        href: '#',
      },
    ],
  },
  {
    category: 'van-hoa-con-nguoi',
    cards: [
      {
        id: 'sinh-nhat-14-nam',
        title: 'Đêm gala sinh nhật 14 năm: Vững nền tảng, vươn tầm khát vọng',
        excerpt: 'Hơn 1.500 cán bộ nhân viên cùng hội tụ trong đêm tri ân đầy cảm xúc.',
        category: 'van-hoa-con-nguoi',
        date: '13/09/2026',
        image: '/home/vision/d-img-2.jpg',
        href: '#',
      },
      {
        id: 'vinh-danh-ca-nhan',
        title: 'Vinh danh tập thể và cá nhân xuất sắc năm 2026',
        excerpt: 'Ghi nhận những đóng góp nổi bật cho hành trình phát triển của Tập đoàn.',
        category: 'van-hoa-con-nguoi',
        date: '13/09/2026',
        image: '/home/vision/d-img-3.jpg',
        href: '#',
      },
    ],
    list: [
      {
        id: 'bateco-games',
        title: 'Hội thao tập đoàn BATECO Games 2026: Gắn kết sức mạnh, bứt phá mọi giới hạn',
        date: '15/08/2026',
        href: '#',
      },
      {
        id: 'dao-tao-lanh-dao',
        title: 'Khai giảng chương trình đào tạo lãnh đạo kế cận khóa III',
        date: '28/07/2026',
        href: '#',
      },
    ],
  },
]

export const FEATURED_AWARD: Award = {
  id: 'thuong-hieu-quoc-gia-2026',
  label: 'Thương hiệu Quốc gia 2026',
  title: 'Thương hiệu Quốc gia Việt Nam: Tiên phong trong Hạ tầng & Công nghệ Cao',
  description:
    'Hội đồng Thương hiệu Quốc gia và Bộ Công Thương vinh danh BATECO Group trong nhóm doanh nghiệp xuất sắc nhất cả nước.',
}

export const AWARDS: Award[] = [
  {
    id: 'top-50-doanh-nghiep',
    label: 'Top 50 Enterprise',
    title: 'Top 50 Doanh nghiệp Tăng trưởng xuất sắc nhất',
  },
  {
    id: 'esg-leadership',
    label: 'ESG Leadership',
    title: 'Giải thưởng Doanh nghiệp Xanh & Bền vững',
  },
]

export const OTHER_NEWS: OtherNews[] = [
  {
    id: 'thoa-thuan-dien-phat-trien',
    tag: 'Đối ngoại',
    title: 'BATECO Group ký kết thỏa thuận hợp tác toàn diện phát triển chuỗi cung ứng công nghệ',
    excerpt: 'Với đối tác chiến lược đến từ Nhật Bản và Hàn Quốc.',
    href: '#',
  },
  {
    id: 'dien-dan-kinh-te-the-gioi',
    tag: 'Diễn đàn doanh',
    title: 'Lãnh đạo BATECO tham dự Diễn đàn Kinh tế Thế giới, chia sẻ chiến lược chuỗi cung ứng',
    excerpt: 'Chia sẻ tầm nhìn về hạ tầng công nghiệp xanh của Việt Nam.',
    href: '#',
  },
  {
    id: 'don-doan-asean',
    tag: 'Hội nhập',
    title: 'Tập đoàn tiếp đón đoàn đại sứ thương mại các nước ASEAN tới thăm và làm việc',
    excerpt: 'Thúc đẩy cơ hội hợp tác đầu tư trong khu vực.',
    href: '#',
  },
]
