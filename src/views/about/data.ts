export type AboutImage = {
  src: string
  alt: string
}

export type AboutHero = {
  image: AboutImage
  srTitle: string
  eyebrow: string
  titleLine1: string
  titleLine2: string
  description: string
}

export type AboutMessage = {
  name: string
  title: string
  quote: string
  image: AboutImage
}

export type AboutPillar = {
  index: string
  label: string
  title: string
  description: string
  image: AboutImage
}

export type AboutChairman = {
  name: string
  role: string
  quote: string
  signature: string
  image: AboutImage
}

export type AboutLeader = {
  name: string
  roles: string[]
  image: string
}

export type AboutLeadership = {
  eyebrow: string
  title: string
  chairman: AboutChairman
  teamTitle: string
  team: AboutLeader[]
}

export type AboutMilestone = {
  year: string
  tag: string
  title: string
  description: string
}

export type AboutHistory = {
  eyebrow: string
  kicker: string
  title: string
  highlight: string
  milestones: AboutMilestone[]
}

export type AboutStat = {
  value: string
  label: string
}

export type AboutCompanyGroup = {
  title: string
  companies: string[]
}

export type AboutSatellite = {
  name: string
  label: string
}

export type AboutEcosystem = {
  title: string
  stats: AboutStat[]
  groups: AboutCompanyGroup[]
  satellites: AboutSatellite[]
}

export type AboutContent = {
  hero: AboutHero
  message: AboutMessage
  pillars: AboutPillar[]
  leadership: AboutLeadership
  history: AboutHistory
  ecosystem: AboutEcosystem
}

const BANNER = '/gioi-thieu/d-banner.png'
const CHAIRMAN = '/gioi-thieu/tgd-pham-anh-tuan.jpg'
const AVATAR = '/gioi-thieu/placeholder-avatar.png'

export const ABOUT_CONTENT: AboutContent = {
  hero: {
    image: { src: BANNER, alt: 'Trụ sở Bateco Group' },
    srTitle: 'Giới thiệu Bateco Group',
    eyebrow: 'Bateco Group',
    titleLine1: 'Khám phá',
    titleLine2: 'Để dẫn đầu',
    description: 'Tập đoàn đầu tư đa ngành, phát triển bằng năng lực thực thi và giá trị bền vững.',
  },
  message: {
    name: 'Mr. Phạm Anh Tuấn',
    title: 'Chủ tịch Hội đồng Quản trị',
    quote:
      'Tại Bateco, chúng tôi tin rằng phát triển bền vững phải dựa trên năng lực thực chất, uy tín cam kết và trách nhiệm với cộng đồng. Từ nền tảng kỹ thuật công nghiệp, Bateco đã từng bước phát triển thành hệ sinh thái đầu tư – công nghiệp gồm năm trụ cột bổ trợ lẫn nhau — lấy uy tín, công nghệ, con người và đổi mới sáng tạo làm động lực tăng trưởng. Từ nền móng đó, chúng tôi từng bước xây dựng hệ sinh thái hỗ trợ nhau: dịch vụ công nghiệp, bất động sản – hạ tầng công nghiệp, an ninh quốc phòng, kinh tế xanh và giải pháp kỹ thuật vật liệu công nghiệp. Mỗi lĩnh vực một bài toán, nhưng chung một cách làm: yêu cầu cao hơn — quyết liệt hơn — thành công hơn. Chúng tôi hiểu rằng uy tín không nằm trong lời nói. Uy tín nằm ở từng dự án bàn giao đúng hẹn, từng cam kết được giữ trọn, từng cơ hội đều được chia sẻ. Bateco mong muốn được đồng hành cùng khách hàng, nhà đầu tư và các địa phương — cùng làm thật, cùng thắng và cùng đi đường dài.',
    image: { src: CHAIRMAN, alt: 'Ông Phạm Anh Tuấn, Chủ tịch Hội đồng Quản trị Bateco Group' },
  },
  pillars: [
    {
      index: '01',
      label: 'Tầm nhìn',
      title: 'Tầm nhìn',
      description:
        'Trở thành thương hiệu lớn, uy tín toàn cầu, sở hữu hệ thống quy mô lớn và dòng sản phẩm công nghệ – chất xám độc đáo.',
      image: { src: '/gioi-thieu/pillars/tam-nhin.jpg', alt: 'Tầm nhìn của Bateco Group' },
    },
    {
      index: '02',
      label: 'Sứ mệnh',
      title: 'Sứ mệnh',
      description:
        'Không ngừng đổi mới sáng tạo, cung cấp các sản phẩm chất lượng cao, thông minh, thân thiện với môi trường để kiến tạo sự phát triển bền vững.',
      image: { src: '/gioi-thieu/pillars/su-menh.jpg', alt: 'Sứ mệnh của Bateco Group' },
    },
    {
      index: '03',
      label: 'Giá trị cốt lõi',
      title: 'Giá trị',
      description:
        'Lấy con người và sự trung thực làm gốc rễ, không ngừng bứt phá giới hạn nhằm kiến tạo giá trị thặng dư bền bỉ cho đối tác và xã hội.',
      image: { src: '/gioi-thieu/pillars/gia-tri.jpg', alt: 'Giá trị cốt lõi của Bateco Group' },
    },
  ],
  leadership: {
    eyebrow: 'Bateco Leadership',
    title: 'Ban quản trị và bộ máy lãnh đạo',
    chairman: {
      name: 'Mr. Phạm Anh Tuấn',
      role: 'Chủ tịch HĐQT',
      quote:
        'Điều phối vận hành chiến lược quy mô liên kết chuỗi giá trị và bảo đảm tiến độ các mục tiêu cốt lõi của tập đoàn.',
      signature: 'Bateco Group',
      image: { src: CHAIRMAN, alt: 'Ông Phạm Anh Tuấn, Chủ tịch HĐQT Bateco Group' },
    },
    teamTitle: 'Đội Ngũ Cán Bộ Trưởng Phòng & Ban Quản Lý',
    team: [
      {
        name: 'Mr. Giang Thanh Nghĩa',
        roles: ['Phó chủ tịch HĐQT', 'Phó TGĐ Bateco VN'],
        image: AVATAR,
      },
      {
        name: 'Mr. Vũ Minh Toản',
        roles: ['Phó TGĐ Bateco VN', 'Giám đốc Bateco Quốc An', 'Giám đốc Bateco Distributor'],
        image: AVATAR,
      },
      {
        name: 'Mr. Lê Anh Tuấn',
        roles: ['Phó TGĐ Bateco VN', 'Giám đốc Chi nhánh 1'],
        image: AVATAR,
      },
      {
        name: 'Mr. Đàm Kiên',
        roles: ['Phó TGĐ Bateco VN', 'Giám đốc Chi nhánh 3'],
        image: AVATAR,
      },
      { name: 'Mr. Trần Anh Kiên', roles: ['Giám đốc Chi nhánh 2'], image: AVATAR },
      { name: 'Mrs. Hoàng Thị Thu Hường', roles: ['Trưởng phòng KSNB'], image: AVATAR },
      {
        name: 'Mr. Nguyễn Văn Nhật',
        roles: ['Trưởng phòng Phát triển nhân sự - Truyền thông'],
        image: AVATAR,
      },
      { name: 'Mrs. Hoàng Thị Thu', roles: ['Trưởng phòng Tài chính'], image: AVATAR },
      { name: 'Mr. Nguyễn Thành Nam', roles: ['Kế toán trưởng'], image: AVATAR },
      { name: 'Mr. Nguyễn Đức Linh', roles: ['Giám đốc Bateco Thắng Cường'], image: AVATAR },
      { name: 'Mr. Nguyễn Hữu Thành', roles: ['Phụ trách các dự án Bắc Ninh'], image: AVATAR },
    ],
  },
  history: {
    eyebrow: 'Hành trình kiến tạo & bứt phá',
    kicker: 'Những mốc son',
    title: 'Lịch Sử',
    highlight: 'Bateco Group',
    milestones: [
      {
        year: '2012',
        tag: 'Khởi nguồn',
        title: 'Khởi nguồn hình thành',
        description:
          'Đặt nền móng với tầm nhìn chiến lược dài hạn, quy tụ đội ngũ kỹ sư và chuyên gia đầu ngành trong lĩnh vực phát triển hạ tầng và công nghiệp.',
      },
      {
        year: '2017',
        tag: 'Khẳng định',
        title: 'Khẳng định vị thế thị trường',
        description:
          'Tăng tốc đầu tư chiều sâu, đẩy mạnh chuỗi phân phối vật liệu công nghệ cao và thiết lập mạng lưới liên minh đối tác chiến lược hàng đầu.',
      },
      {
        year: '2020',
        tag: 'Đa dạng hóa',
        title: 'Đa dạng hóa lĩnh vực chiến lược',
        description:
          'Mở rộng sang các khối ngành mũi nhọn: chế biến sâu, tự động hóa công nghiệp và chuỗi cung ứng logistics đa phương thức.',
      },
      {
        year: '2023',
        tag: 'Đột phá',
        title: 'Mở rộng quy mô & Nâng tầm thương hiệu',
        description:
          'Đột phá doanh thu ấn tượng, chuẩn hóa mô hình quản trị số ESG hiện đại và mở rộng thương mại xuất nhập khẩu ra thị trường châu Á - Âu.',
      },
      {
        year: '2026',
        tag: 'Vươn tầm quốc tế',
        title: '06 Lĩnh Vực Cốt Lõi & Đa Quốc Gia',
        description:
          'Hoàn thiện hệ sinh thái 06 trụ cột kinh doanh bền vững, đưa Bateco Group trở thành tập đoàn tư nhân đa ngành uy tín hàng đầu khu vực.',
      },
      {
        year: '2028',
        tag: 'Phát triển xanh',
        title: 'Kinh tế xanh & Chuyển đổi số toàn diện',
        description:
          'Đầu tư năng lượng tái tạo, vật liệu xanh và nền tảng số hóa vận hành, hướng tới mục tiêu Net Zero trên toàn chuỗi giá trị.',
      },
      {
        year: '2032',
        tag: 'Tầm nhìn 2032',
        title: 'Tập đoàn đa quốc gia dẫn dắt khu vực',
        description:
          'Hiện diện tại các thị trường trọng điểm châu Á, hoàn thiện chuỗi giá trị khép kín từ hạ tầng, công nghiệp đến dịch vụ.',
      },
    ],
  },
  ecosystem: {
    title: 'Hệ sinh thái Bateco',
    stats: [
      { value: '03', label: 'Công ty thành viên' },
      { value: '09', label: 'Công ty liên kết' },
    ],
    groups: [
      {
        title: '11 Công ty thành viên',
        companies: [
          'Bateco Quốc An',
          'Bateco Distributor',
          'Bateco Thắng Cường',
          'Bateco Lai Châu',
        ],
      },
      {
        title: '09 Công ty liên kết',
        companies: ['Bateco Nghĩa Sơn', 'Bateco Lai Châu'],
      },
    ],
    satellites: [
      { name: 'Bateco', label: 'Bán dẫn' },
      { name: 'Bateco', label: 'Petro' },
      { name: 'Bateco', label: 'Bất động sản' },
      { name: 'Bateco', label: 'Hạ tầng' },
      { name: 'Bateco', label: 'Quốc tế' },
      { name: 'Bateco', label: 'CN miền Nam' },
      { name: 'Bateco', label: 'CN miền Trung' },
      { name: 'Bateco', label: 'Logistics' },
      { name: 'Bateco', label: 'Công nghệ & AI' },
    ],
  },
}
