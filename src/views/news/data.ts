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
  href: string
}

export type NewsArticleDetail = NewsArticle & {
  /** HTML từ CMS, render bằng dangerouslySetInnerHTML */
  content: string
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
  { id: 'industrial-services', title: 'Dịch vụ Công nghiệp' },
  { id: 'industrial-infrastructure', title: 'Bất động sản & Hạ tầng Công nghiệp' },
  { id: 'social-responsibility', title: 'Trách nhiệm Xã hội' },
  { id: 'culture-people', title: 'Văn hóa & Con người BATECO' },
]

export function getCategoryTitle(id: string) {
  return NEWS_CATEGORIES.find((category) => category.id === id)?.title ?? ''
}

// TODO: thay toàn bộ dữ liệu mẫu bằng dữ liệu thật từ CMS
export const FEATURED_ARTICLE: NewsArticle = {
  id: 'bateco-breaks-ground-key-projects',
  title:
    'BATECO Group: Khởi công các dự án trọng điểm phát triển hạ tầng và công nghệ kết nối vùng kinh tế 2026',
  excerpt:
    'Sáng ngày 29/09/2026, tại trung tâm công nghiệp công nghệ cao, Tập đoàn BATECO phối hợp cùng các bộ ban ngành long trọng tổ chức Lễ khởi công các hạng mục đầu tư trọng điểm, mở rộng mạng lưới hạ tầng vận tải hiện đại phục vụ chuỗi cung ứng chiến lược quốc gia.',
  category: 'industrial-services',
  date: '29/09/2026',
  image: '/home/news/card-2.jpg',
  href: '/tin-tuc/bateco-breaks-ground-key-projects',
}

export const HIGHLIGHT_ARTICLES: NewsArticle[] = [
  {
    id: 'a350-pilot-returns',
    title: 'Phi công lái A350 đầu tiên của BATECO Aviation về nhà để kiến tạo đội bay',
    excerpt: 'Dấu ấn mới của hành trình phát triển nguồn nhân lực hàng không chất lượng cao.',
    category: 'social-responsibility',
    date: '23/09/2026',
    image: '/home/news/card-5.jpg',
    href: '/tin-tuc/a350-pilot-returns',
  },
  {
    id: 'bateco-marriott',
    title: 'BATECO Group - Marriott International trao văn kiện hợp tác',
    excerpt: 'Hai bên ký kết hợp tác phát triển và vận hành tổ hợp khách sạn tiêu chuẩn quốc tế.',
    category: 'industrial-infrastructure',
    date: '24/09/2026',
    image: '/home/news/card-1.jpg',
    href: '/tin-tuc/bateco-marriott',
  },
  {
    id: '14th-anniversary',
    title: 'Tập đoàn Bateco kỷ niệm sinh nhật 14 năm',
    excerpt: 'Dấu mốc khẳng định hành trình xây dựng thương hiệu Việt có khát vọng vươn tầm.',
    category: 'culture-people',
    date: '13/09/2026',
    image: '/home/vision/d-img-1.jpg',
    href: '/tin-tuc/14th-anniversary',
  },
  {
    id: 'green-industrial-park',
    title: 'Khởi động giai đoạn II khu công nghiệp xanh Bateco',
    excerpt: 'Mở rộng quỹ đất sạch đón làn sóng dịch chuyển vốn đầu tư FDI chất lượng cao.',
    category: 'industrial-infrastructure',
    date: '05/09/2026',
    image: '/home/investment/d-card-2.png',
    href: '/tin-tuc/green-industrial-park',
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
    category: 'industrial-services',
    cards: [
      {
        id: 'maintenance-solutions',
        title: 'Cung ứng giải pháp bảo trì, lắp đặt và vận hành nhà máy công nghệ cao',
        excerpt: 'BATECO Industrial Services triển khai toàn diện giải pháp bảo trì dự phòng.',
        category: 'industrial-services',
        date: '24/09/2026',
        image: '/home/investment/d-card-1.png',
        href: '/tin-tuc/maintenance-solutions',
      },
      {
        id: 'automation-robots',
        title: 'BATECO triển khai hệ thống robot tự động hóa thông minh',
        excerpt: 'Ứng dụng cánh tay robot và dây chuyền tự động hóa thế hệ mới tại nhà máy.',
        category: 'industrial-services',
        date: '18/09/2026',
        image: '/home/investment/d-card-5.png',
        href: '/tin-tuc/automation-robots',
      },
    ],
    list: [
      {
        id: 'logistics-mou-signing',
        title: 'Ký kết biên bản hợp tác nâng cao hiệu suất chuỗi vận tải logistics khu công nghiệp',
        date: '21/09/2026',
        href: '#',
      },
      {
        id: 'substation-commissioning',
        title: 'Đưa vào vận hành trạm biến áp tiêu chuẩn ISO/IEC 17025',
        date: '10/09/2026',
        href: '#',
      },
    ],
  },
  {
    category: 'industrial-infrastructure',
    cards: [
      {
        id: 'glory-park-launch',
        title: 'BATECO Group ra mắt tổ hợp thương mại & nhà ở Glory Park',
        excerpt: 'Định hình chuẩn sống mới với không gian xanh và tiện ích đồng bộ.',
        category: 'industrial-infrastructure',
        date: '22/09/2026',
        image: '/home/news/card-1.jpg',
        href: '/tin-tuc/glory-park-launch',
      },
      {
        id: 'glory-park-handover',
        title: 'BATECO Property ra quân đợt bàn giao dự án Glory Park quý IV',
        excerpt: 'Khách hàng đầu tiên nhận bàn giao căn hộ đúng tiến độ cam kết.',
        category: 'industrial-infrastructure',
        date: '15/09/2026',
        image: '/home/investment/d-card-2.png',
        href: '/tin-tuc/glory-park-handover',
      },
    ],
    list: [
      {
        id: 'fdi-investment-wave',
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
    category: 'social-responsibility',
    cards: [
      {
        id: 'green-agriculture',
        title: 'Đồng hành cùng nông dân chuyển đổi sang canh tác nông nghiệp xanh',
        excerpt: 'Chương trình hỗ trợ kỹ thuật và giống cây cho hơn 500 hộ gia đình.',
        category: 'social-responsibility',
        date: '20/09/2026',
        image: '/home/investment/d-card-4.png',
        href: '/tin-tuc/green-agriculture',
      },
      {
        id: 'engineering-scholarships',
        title: 'Trao 200 suất học bổng cho sinh viên ngành kỹ thuật',
        excerpt: 'Quỹ học bổng BATECO tiếp sức thế hệ kỹ sư trẻ theo đuổi đam mê.',
        category: 'social-responsibility',
        date: '08/09/2026',
        image: '/home/news/card-5.jpg',
        href: '/tin-tuc/engineering-scholarships',
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
        id: 'blood-donation-day',
        title: 'Ngày hội hiến máu tình nguyện thu hút hơn 1.000 cán bộ nhân viên',
        date: '01/08/2026',
        href: '#',
      },
    ],
  },
  {
    category: 'culture-people',
    cards: [
      {
        id: '14th-birthday-gala',
        title: 'Đêm gala sinh nhật 14 năm: Vững nền tảng, vươn tầm khát vọng',
        excerpt: 'Hơn 1.500 cán bộ nhân viên cùng hội tụ trong đêm tri ân đầy cảm xúc.',
        category: 'culture-people',
        date: '13/09/2026',
        image: '/home/vision/d-img-2.jpg',
        href: '/tin-tuc/14th-birthday-gala',
      },
      {
        id: 'excellence-awards',
        title: 'Vinh danh tập thể và cá nhân xuất sắc năm 2026',
        excerpt: 'Ghi nhận những đóng góp nổi bật cho hành trình phát triển của Tập đoàn.',
        category: 'culture-people',
        date: '13/09/2026',
        image: '/home/vision/d-img-3.jpg',
        href: '/tin-tuc/excellence-awards',
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
        id: 'leadership-training',
        title: 'Khai giảng chương trình đào tạo lãnh đạo kế cận khóa III',
        date: '28/07/2026',
        href: '#',
      },
    ],
  },
]

export const FEATURED_AWARD: Award = {
  id: 'national-brand-2026',
  label: 'Thương hiệu Quốc gia 2026',
  title: 'Thương hiệu Quốc gia Việt Nam: Tiên phong trong Hạ tầng & Công nghệ Cao',
  description:
    'Hội đồng Thương hiệu Quốc gia và Bộ Công Thương vinh danh BATECO Group trong nhóm doanh nghiệp xuất sắc nhất cả nước.',
}

export const AWARDS: Award[] = [
  {
    id: 'top-50-enterprises',
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
    id: 'supply-chain-partnership',
    tag: 'Đối ngoại',
    title: 'BATECO Group ký kết thỏa thuận hợp tác toàn diện phát triển chuỗi cung ứng công nghệ',
    excerpt: 'Với đối tác chiến lược đến từ Nhật Bản và Hàn Quốc.',
    href: '#',
  },
  {
    id: 'world-economic-forum',
    tag: 'Diễn đàn doanh',
    title: 'Lãnh đạo BATECO tham dự Diễn đàn Kinh tế Thế giới, chia sẻ chiến lược chuỗi cung ứng',
    excerpt: 'Chia sẻ tầm nhìn về hạ tầng công nghiệp xanh của Việt Nam.',
    href: '#',
  },
  {
    id: 'asean-trade-delegation',
    tag: 'Hội nhập',
    title: 'Tập đoàn tiếp đón đoàn đại sứ thương mại các nước ASEAN tới thăm và làm việc',
    excerpt: 'Thúc đẩy cơ hội hợp tác đầu tư trong khu vực.',
    href: '#',
  },
]

/** Toàn bộ bài có ảnh thuộc một chuyên mục, mới nhất trước */
export function getCategoryArticles(categoryId: string) {
  const toTime = (date: string) => date.split('/').reverse().join('')
  return ALL_ARTICLES.filter((article) => article.category === categoryId).sort((a, b) =>
    toTime(b.date).localeCompare(toTime(a.date)),
  )
}

const ALL_ARTICLES: NewsArticle[] = [
  FEATURED_ARTICLE,
  ...HIGHLIGHT_ARTICLES,
  ...CATEGORY_BLOCKS.flatMap((block) => block.cards),
]

export const ARTICLE_SLUGS = ALL_ARTICLES.map((article) => article.id)

// TODO: lấy content HTML thật từ CMS theo slug
const SAMPLE_CONTENT = `
<p>Sự kiện đánh dấu bước tiến quan trọng trong chiến lược phát triển dài hạn của Tập đoàn BATECO, hướng tới mục tiêu trở thành nhà phát triển hạ tầng công nghiệp và dịch vụ hàng đầu khu vực.</p>
<h2>Tầm nhìn dài hạn, hành động hôm nay</h2>
<p>Phát biểu tại sự kiện, đại diện Ban lãnh đạo Tập đoàn nhấn mạnh: mỗi dự án không chỉ là một công trình, mà là một <strong>cam kết với cộng đồng</strong> về chất lượng, tiến độ và giá trị bền vững.</p>
<figure>
  <img src="/home/vision/d-img-2.jpg" alt="Toàn cảnh sự kiện" />
  <figcaption>Toàn cảnh sự kiện với sự tham dự của đông đảo đối tác và khách mời.</figcaption>
</figure>
<p>Trong giai đoạn tới, BATECO tập trung vào ba trụ cột chính:</p>
<ul>
  <li>Phát triển hạ tầng khu công nghiệp xanh, đạt chuẩn quốc tế.</li>
  <li>Ứng dụng công nghệ số và tự động hóa vào vận hành.</li>
  <li>Đầu tư nguồn nhân lực chất lượng cao, gắn kết với cộng đồng địa phương.</li>
</ul>
<blockquote><p>“Chúng tôi tin rằng tăng trưởng chỉ thực sự có ý nghĩa khi đi cùng trách nhiệm với con người và môi trường.”</p></blockquote>
<h3>Những con số ấn tượng</h3>
<p>Sau hơn 14 năm phát triển, BATECO đã triển khai hàng chục dự án trên khắp cả nước, tạo việc làm cho hàng nghìn lao động và đóng góp tích cực vào ngân sách địa phương.</p>
<p>Xem thêm thông tin tại <a href="/news">trang tin tức</a> của Tập đoàn.</p>
`

export function getNewsDetail(slug: string): NewsArticleDetail | undefined {
  const article = ALL_ARTICLES.find((item) => item.id === slug)
  return article ? { ...article, content: SAMPLE_CONTENT } : undefined
}
