import {
  Building2,
  Cpu,
  Factory,
  Gauge,
  Leaf,
  LineChart,
  type LucideIcon,
  Map,
  Radar,
  Recycle,
  ShieldCheck,
  Sprout,
  Wrench,
} from 'lucide-react'

export type SectorFeature = {
  icon: LucideIcon
  title: string
  description: string
}

export type SectorProject = {
  category: string
  title: string
  location: string
  image: string
}

export type SectorDetail = {
  slug: string
  /** Tên lĩnh vực, hiện ở dòng eyebrow của hero */
  name: string
  hero: {
    title: string
    description: string
    image: string
  }
  intro: {
    title: string
    description: string
    features: SectorFeature[]
  }
  /** Phần tử đầu tiên là dự án nổi bật (card lớn bên trái) */
  projects: SectorProject[]
}

// TODO: thay ảnh placeholder bằng ảnh thật của từng lĩnh vực / dự án
export const SECTOR_DETAILS: SectorDetail[] = [
  {
    slug: 'industrial-services',
    name: 'Dịch vụ công nghiệp',
    hero: {
      title: 'Vận hành hiệu quả cho nhà máy hiện đại',
      description:
        'Bateco cung ứng giải pháp bảo trì, lắp đặt và hỗ trợ kỹ thuật toàn diện, giúp dây chuyền sản xuất vận hành ổn định, an toàn và đạt chuẩn quốc tế.',
      image: '/home/investment/d-card-1.png',
    },
    intro: {
      title: 'Đồng hành vận hành trọn vòng đời nhà máy',
      description:
        'Từ khảo sát, lắp đặt đến bảo trì định kỳ, đội ngũ kỹ sư Bateco làm việc như một phần của nhà máy khách hàng. Chúng tôi chuẩn hóa quy trình, ứng dụng công nghệ giám sát để giảm thời gian dừng máy và tối ưu chi phí vận hành.',
      features: [
        {
          icon: Wrench,
          title: 'Bảo trì chủ động',
          description: 'Lịch bảo trì dự phòng giúp hạn chế sự cố và kéo dài tuổi thọ thiết bị.',
        },
        {
          icon: Cpu,
          title: 'Tự động hóa',
          description:
            'Tích hợp hệ thống điều khiển, nâng cấp dây chuyền theo chuẩn công nghiệp 4.0.',
        },
        {
          icon: Gauge,
          title: 'Tối ưu hiệu suất',
          description: 'Đo lường, phân tích dữ liệu vận hành để nâng cao năng suất bền vững.',
        },
      ],
    },
    projects: [
      {
        category: 'Dịch vụ kỹ thuật',
        title: 'Bảo trì nhà máy xi măng',
        location: 'Ninh Bình',
        image: '/home/investment/d-card-1.png',
      },
      {
        category: 'Lắp đặt',
        title: 'Dây chuyền tự động hóa',
        location: 'Bắc Ninh',
        image: '/home/investment/d-card-2.png',
      },
      {
        category: 'Vận hành',
        title: 'Hệ thống điện nhà máy',
        location: 'Hải Phòng',
        image: '/home/investment/d-card-3.png',
      },
    ],
  },
  {
    slug: 'industrial-real-estate',
    name: 'Bất động sản & hạ tầng công nghiệp',
    hero: {
      title: 'Kiến tạo giá trị bền vững từ quỹ đất và hạ tầng',
      description:
        'Bateco kiến tạo những không gian sống và sản xuất hiện đại, đồng bộ hạ tầng, góp phần thúc đẩy phát triển kinh tế - xã hội và kiến tạo giá trị bền vững cho tương lai.',
      image: '/home/investment/d-card-2.png',
    },
    intro: {
      title: 'Phát triển không gian sống và sản xuất đồng bộ',
      description:
        'Bateco hướng tới phát triển các dự án bất động sản và hạ tầng công nghiệp theo quy hoạch đồng bộ, kết nối thuận tiện, giúp doanh nghiệp an tâm sản xuất và cư dân an cư lâu dài. Mỗi dự án là một hệ sinh thái hoàn chỉnh, tạo giá trị gia tăng bền vững.',
      features: [
        {
          icon: Map,
          title: 'Quy hoạch đồng bộ',
          description: 'Phát triển theo quy hoạch tổng thể, đồng bộ hạ tầng và không gian.',
        },
        {
          icon: Building2,
          title: 'Hạ tầng bền vững',
          description: 'Đầu tư hạ tầng hiện đại, thân thiện môi trường.',
        },
        {
          icon: LineChart,
          title: 'Giá trị dài hạn',
          description: 'Tạo giá trị gia tăng bền vững cho khách hàng và cộng đồng.',
        },
      ],
    },
    projects: [
      {
        category: 'Khu công nghiệp',
        title: 'Khu công nghiệp Bateco',
        location: 'Hưng Yên',
        image: '/home/news/card-5.jpg',
      },
      {
        category: 'Khu đô thị',
        title: 'Khu đô thị Bateco Riverside',
        location: 'Hà Nội',
        image: '/home/news/card-3.jpg',
      },
      {
        category: 'Khu đô thị',
        title: 'Bateco Building & Age Care',
        location: 'Hà Nội',
        image: '/home/news/card-1.jpg',
      },
    ],
  },
  {
    slug: 'defense-security',
    name: 'An ninh - Quốc phòng',
    hero: {
      title: 'Công nghệ tin cậy cho nhiệm vụ trọng yếu',
      description:
        'Bateco cung cấp giải pháp an ninh kỹ thuật cao và trang thiết bị chuyên dụng, đáp ứng tiêu chuẩn khắt khe phục vụ an ninh quốc gia và trật tự an toàn xã hội.',
      image: '/home/investment/d-card-3.png',
    },
    intro: {
      title: 'Giải pháp tích hợp, an toàn và chủ động',
      description:
        'Cùng các đối tác công nghệ hàng đầu thế giới, Bateco chuyển giao và tích hợp hệ thống giám sát, định vị dẫn đường, thông tin liên lạc chuyên dụng. Chúng tôi chú trọng làm chủ công nghệ và đảm bảo khả năng vận hành độc lập.',
      features: [
        {
          icon: Radar,
          title: 'Giám sát tích hợp',
          description: 'Hệ thống quan sát, cảnh báo đa lớp cho mục tiêu trọng điểm.',
        },
        {
          icon: ShieldCheck,
          title: 'Tiêu chuẩn khắt khe',
          description: 'Thiết bị đạt chuẩn quân sự, kiểm định nghiêm ngặt trước khi bàn giao.',
        },
        {
          icon: Cpu,
          title: 'Làm chủ công nghệ',
          description: 'Chuyển giao, đào tạo và hỗ trợ kỹ thuật dài hạn cho đơn vị sử dụng.',
        },
      ],
    },
    projects: [
      {
        category: 'Giám sát',
        title: 'Hệ thống giám sát bờ biển',
        location: 'Khánh Hòa',
        image: '/home/news/card-2.jpg',
      },
      {
        category: 'Định vị',
        title: 'Giải pháp dẫn đường quán tính',
        location: 'Hà Nội',
        image: '/home/news/card-4.jpg',
      },
      {
        category: 'Thông tin',
        title: 'Mạng liên lạc chuyên dụng',
        location: 'Toàn quốc',
        image: '/home/news/card-1.jpg',
      },
    ],
  },
  {
    slug: 'green-economy',
    name: 'Kinh tế xanh & Phát triển bền vững',
    hero: {
      title: 'Tiên phong chuyển đổi xanh hướng tới Net Zero',
      description:
        'Bateco đầu tư năng lượng tái tạo, kinh tế tuần hoàn và nông nghiệp công nghệ cao, đồng hành cùng mục tiêu Net Zero 2050 của quốc gia.',
      image: '/home/investment/d-card-4.png',
    },
    intro: {
      title: 'Tăng trưởng hài hòa cùng môi trường',
      description:
        'Chúng tôi xem phát triển bền vững là nền tảng của mọi quyết định đầu tư. Các dự án năng lượng sạch, xử lý tuần hoàn tài nguyên và tín chỉ carbon giúp giảm phát thải ròng, đồng thời mở ra cơ hội tăng trưởng mới.',
      features: [
        {
          icon: Leaf,
          title: 'Năng lượng sạch',
          description: 'Phát triển điện mặt trời, điện gió và giải pháp lưu trữ năng lượng.',
        },
        {
          icon: Recycle,
          title: 'Kinh tế tuần hoàn',
          description: 'Tái chế, xử lý tài nguyên khép kín, hạn chế chất thải ra môi trường.',
        },
        {
          icon: Sprout,
          title: 'Nông nghiệp công nghệ cao',
          description: 'Ứng dụng công nghệ để nâng cao năng suất và giá trị nông sản.',
        },
      ],
    },
    projects: [
      {
        category: 'Năng lượng',
        title: 'Điện mặt trời áp mái',
        location: 'Bình Dương',
        image: '/home/news/card-5.jpg',
      },
      {
        category: 'Môi trường',
        title: 'Ứng phó sự cố tràn dầu',
        location: 'Quảng Ninh',
        image: '/home/news/card-3.jpg',
      },
      {
        category: 'Nông nghiệp',
        title: 'Trang trại công nghệ cao',
        location: 'Lâm Đồng',
        image: '/home/news/card-1.jpg',
      },
    ],
  },
  {
    slug: 'advanced-materials',
    name: 'Sản xuất - Vật liệu mới',
    hero: {
      title: 'Vật liệu thế hệ mới cho công nghiệp tương lai',
      description:
        'Bateco nghiên cứu, ứng dụng và sản xuất vật liệu composite, polymer kỹ thuật và hợp kim bền nhẹ phục vụ công nghiệp chế tạo và hạ tầng.',
      image: '/home/investment/d-card-5.png',
    },
    intro: {
      title: 'Từ nghiên cứu đến sản xuất quy mô lớn',
      description:
        'Bateco đầu tư phòng thí nghiệm, dây chuyền sản xuất hiện đại và hợp tác với các viện nghiên cứu để thương mại hóa vật liệu mới. Sản phẩm đáp ứng yêu cầu khắt khe của ngành chế tạo, hàng không và hạ tầng.',
      features: [
        {
          icon: Factory,
          title: 'Sản xuất hiện đại',
          description: 'Dây chuyền tự động, kiểm soát chất lượng theo tiêu chuẩn quốc tế.',
        },
        {
          icon: Cpu,
          title: 'Nghiên cứu ứng dụng',
          description: 'Hợp tác viện, trường để phát triển vật liệu đặc thù.',
        },
        {
          icon: LineChart,
          title: 'Chuỗi giá trị mở rộng',
          description: 'Cung ứng ổn định cho doanh nghiệp trong và ngoài nước.',
        },
      ],
    },
    projects: [
      {
        category: 'Bán dẫn',
        title: 'Bateco Siltron',
        location: 'Bắc Giang',
        image: '/home/news/card-4.jpg',
      },
      {
        category: 'Composite',
        title: 'Nhà máy vật liệu composite',
        location: 'Thái Nguyên',
        image: '/home/news/card-2.jpg',
      },
      {
        category: 'Polymer',
        title: 'Polymer kỹ thuật cao',
        location: 'Đồng Nai',
        image: '/home/news/card-5.jpg',
      },
    ],
  },
]

export const getSectorDetail = (slug: string) =>
  SECTOR_DETAILS.find((sector) => sector.slug === slug)

// Số liệu chung của hệ sinh thái, dùng cho mọi trang chi tiết
export const ECOSYSTEM_STATS = [
  { value: '1.000', suffix: '+', label: 'Tỷ đồng' },
  { value: '9', label: 'Công ty liên kết' },
] as const

// TODO: thay bằng logo thật của các công ty thành viên
export const MEMBER_LOGOS = Array.from({ length: 4 }, (_, index) => ({
  name: `Công ty thành viên ${index + 1}`,
  logo: '/header/d-logo.png',
}))
