export type GovernanceDocument = {
  id: string
  date: string
  title: string
  description: string
  file: string
}

export type CompanyProfile = {
  title: string
  description: string
  format: string
  updatedAt: string
  languages: string
  file: string
  viewUrl: string
  ownership: {
    label: string
    value: string
    note: string
  }
}

export type InvestorReport = {
  id: string
  /** Kỳ báo cáo, vd: '2025', 'Q2/2026' */
  period: string
  title: string
  theme?: string
  publishedAt: string
  fileSize: string
  file: string
  viewUrl: string
  /** Ảnh bìa thật; bỏ trống sẽ dựng bìa mặc định */
  cover?: string
}

type BaseCategory = {
  id: string
  title: string
}

export type DocumentsCategory = BaseCategory & {
  type: 'documents'
  documents: GovernanceDocument[]
}

export type ProfileCategory = BaseCategory & {
  type: 'profile'
  profile: CompanyProfile
}

/** Danh mục có nội dung hiển thị ở khung bên phải */
export type ReportsCategory = BaseCategory & {
  type: 'reports'
  /** Chữ in trên bìa mặc định */
  coverTitle: string
  coverTone?: 'navy' | 'green'
  reports: InvestorReport[]
}

export type GovernanceCategory = DocumentsCategory | ProfileCategory | ReportsCategory

/** Nhóm trên sidebar, bấm để mở menu con */
export type GroupCategory = BaseCategory & {
  type: 'group'
  children: GovernanceCategory[]
}

export type GovernanceMenuItem = GovernanceCategory | GroupCategory

export type HeroStat = {
  value: string
  label: string
}

export const DOCUMENTS_PER_PAGE = 7

export const REPORTS_PER_PAGE = 5

export const HERO_STATS: HeroStat[] = [
  { value: '14+', label: 'Năm Kinh Nghiệm' },
  { value: '50+', label: 'Đối Tác Chiến Lược' },
  { value: '05', label: 'Công Ty Thành Viên' },
  { value: '400+', label: 'Nhân Sự Tâm Huyết' },
]

// TODO: thay dữ liệu mẫu bằng dữ liệu thật từ CMS (file PDF thật của từng văn bản)
export const GOVERNANCE_MENU: GovernanceMenuItem[] = [
  {
    type: 'documents',
    id: 'dai-hoi-dong-co-dong',
    title: 'Đại hội đồng cổ đông',
    documents: [
      {
        id: 'nghi-quyet-dhdcd-2026',
        date: '09/06/2026',
        title: 'Nghị quyết ĐHĐCĐ thường niên 2026',
        description: 'Nghị quyết số 04/2026/NQ-ĐHĐCĐ-BAT thông qua tại kỳ họp thường niên năm 2026',
        file: '#',
      },
      {
        id: 'bien-ban-dhdcd-2026',
        date: '09/06/2026',
        title: 'Biên bản họp ĐHĐCĐ thường niên 2026',
        description: 'Biên bản và kết quả kiểm phiếu biểu quyết các nội dung tại Đại hội',
        file: '#',
      },
      {
        id: 'tai-lieu-dhdcd-2026',
        date: '15/05/2026',
        title: 'Tài liệu họp ĐHĐCĐ thường niên 2026',
        description: 'Chương trình, tờ trình và dự thảo nghị quyết trình Đại hội đồng cổ đông',
        file: '#',
      },
      {
        id: 'thong-bao-moi-hop-2026',
        date: '10/05/2026',
        title: 'Thông báo mời họp ĐHĐCĐ thường niên 2026',
        description: 'Thời gian, địa điểm tổ chức và hướng dẫn đăng ký tham dự Đại hội',
        file: '#',
      },
      {
        id: 'nghi-quyet-lay-y-kien-2025',
        date: '01/10/2025',
        title: 'Nghị quyết ĐHĐCĐ lấy ý kiến bằng văn bản 2025',
        description: 'Thông qua theo hình thức biểu quyết điện tử của cổ đông BATECO',
        file: '#',
      },
      {
        id: 'nghi-quyet-dhdcd-2025',
        date: '28/04/2025',
        title: 'Nghị quyết ĐHĐCĐ thường niên 2025',
        description: 'Thông qua kế hoạch kinh doanh, phương án phân phối lợi nhuận năm 2025',
        file: '#',
      },
      {
        id: 'tai-lieu-dhdcd-2025',
        date: '05/04/2025',
        title: 'Tài liệu họp ĐHĐCĐ thường niên 2025',
        description: 'Báo cáo HĐQT, báo cáo UBKT và các tờ trình trình Đại hội',
        file: '#',
      },
      {
        id: 'nghi-quyet-dhdcd-2024',
        date: '27/04/2024',
        title: 'Nghị quyết ĐHĐCĐ thường niên 2024',
        description: 'Thông qua sửa đổi điều lệ và quy chế nội bộ về quản trị công ty',
        file: '#',
      },
      {
        id: 'tai-lieu-dhdcd-2024',
        date: '05/04/2024',
        title: 'Tài liệu họp ĐHĐCĐ thường niên 2024',
        description: 'Chương trình nghị sự và tài liệu liên quan đến kỳ họp năm 2024',
        file: '#',
      },
    ],
  },
  {
    type: 'profile',
    id: 'ho-so-cong-ty',
    title: 'Hồ sơ công ty',
    profile: {
      title: 'Company Profile 2026',
      description:
        'Tổng quan về lịch sử hình thành, hệ sinh thái đa ngành, năng lực thực thi và định hướng phát triển bền vững của Bateco Group.',
      format: 'PDF',
      updatedAt: 'Cập nhật Q2/2026',
      languages: 'Tiếng Việt / English',
      file: '#',
      viewUrl: '#',
      ownership: {
        label: 'Tỷ lệ sở hữu cho các nhà đầu tư',
        value: '49%',
        note: 'Theo quy định hiện hành và điều lệ của Bateco Group',
      },
    },
  },
  {
    type: 'documents',
    id: 'cong-bo-thong-tin',
    title: 'Công bố thông tin',
    documents: [
      {
        id: 'cbtt-thay-doi-nhan-su-2026',
        date: '12/08/2026',
        title: 'Công bố thông tin thay đổi nhân sự quản lý',
        description: 'Bổ nhiệm Phó Tổng Giám đốc phụ trách khối đầu tư',
        file: '#',
      },
      {
        id: 'cbtt-bctc-q2-2026',
        date: '30/07/2026',
        title: 'Công bố Báo cáo tài chính Quý II/2026',
        description: 'Báo cáo tài chính hợp nhất và riêng lẻ Quý II năm 2026',
        file: '#',
      },
      {
        id: 'cbtt-giai-trinh-loi-nhuan-2026',
        date: '30/07/2026',
        title: 'Giải trình biến động lợi nhuận Quý II/2026',
        description: 'Giải trình chênh lệch lợi nhuận sau thuế so với cùng kỳ năm trước',
        file: '#',
      },
      {
        id: 'cbtt-chot-danh-sach-co-dong-2026',
        date: '20/06/2026',
        title: 'Thông báo ngày đăng ký cuối cùng',
        description: 'Chốt danh sách cổ đông thực hiện quyền nhận cổ tức năm 2025',
        file: '#',
      },
      {
        id: 'cbtt-bctc-q1-2026',
        date: '29/04/2026',
        title: 'Công bố Báo cáo tài chính Quý I/2026',
        description: 'Báo cáo tài chính hợp nhất và riêng lẻ Quý I năm 2026',
        file: '#',
      },
    ],
  },
  {
    type: 'group',
    id: 'thu-vien-nha-dau-tu',
    title: 'Thư viện nhà đầu tư',
    children: [
      {
        type: 'reports',
        id: 'bao-cao-thuong-nien',
        title: 'Báo cáo thường niên',
        coverTitle: 'Thường niên',
        reports: [
          {
            id: 'btn-2025',
            period: '2025',
            title: 'Báo cáo thường niên 2025',
            theme: 'Vững nền tảng - Vươn tầm khát vọng',
            publishedAt: '15/04/2026',
            fileSize: '32.8 MB',
            file: '#',
            viewUrl: '#',
          },
          {
            id: 'btn-2024',
            period: '2024',
            title: 'Báo cáo thường niên 2024',
            theme: 'Đổi mới để bứt phá',
            publishedAt: '15/04/2025',
            fileSize: '28.4 MB',
            file: '#',
            viewUrl: '#',
          },
          {
            id: 'btn-2023',
            period: '2023',
            title: 'Báo cáo thường niên 2023',
            theme: 'Bản lĩnh vượt thách thức',
            publishedAt: '12/04/2024',
            fileSize: '26.1 MB',
            file: '#',
            viewUrl: '#',
          },
        ],
      },
      {
        type: 'reports',
        id: 'bao-cao-phat-trien-ben-vung',
        title: 'Báo cáo phát triển bền vững',
        coverTitle: 'Phát triển bền vững',
        coverTone: 'green',
        reports: [
          {
            id: 'ptbv-2025',
            period: '2025',
            title: 'Báo cáo Phát triển bền vững 2025',
            theme: 'Kiên tâm vững bước - Kiến tạo tương lai xanh',
            publishedAt: '19/04/2026',
            fileSize: '24.5 MB',
            file: '#',
            viewUrl: '#',
          },
          {
            id: 'ptbv-2024',
            period: '2024',
            title: 'Báo cáo Phát triển bền vững 2024',
            theme: 'Khơi nguồn sáng tạo - Vững bước tương lai',
            publishedAt: '18/04/2025',
            fileSize: '18.2 MB',
            file: '#',
            viewUrl: '#',
          },
          {
            id: 'ptbv-2023',
            period: '2023',
            title: 'Báo cáo Phát triển bền vững 2023',
            theme: 'Nghĩ lành làm vững - Hành trình xanh',
            publishedAt: '19/04/2024',
            fileSize: '21.0 MB',
            file: '#',
            viewUrl: '#',
          },
        ],
      },
      {
        type: 'reports',
        id: 'bao-cao-quan-tri',
        title: 'Báo cáo quản trị',
        coverTitle: 'Quản trị công ty',
        reports: [
          {
            id: 'bcqt-6t-2026',
            period: '6T/2026',
            title: 'Báo cáo tình hình quản trị công ty 6 tháng đầu năm 2026',
            publishedAt: '30/07/2026',
            fileSize: '2.4 MB',
            file: '#',
            viewUrl: '#',
          },
          {
            id: 'bcqt-2025',
            period: '2025',
            title: 'Báo cáo tình hình quản trị công ty năm 2025',
            publishedAt: '30/01/2026',
            fileSize: '3.1 MB',
            file: '#',
            viewUrl: '#',
          },
          {
            id: 'bcqt-6t-2025',
            period: '6T/2025',
            title: 'Báo cáo tình hình quản trị công ty 6 tháng đầu năm 2025',
            publishedAt: '30/07/2025',
            fileSize: '2.2 MB',
            file: '#',
            viewUrl: '#',
          },
        ],
      },
      {
        type: 'reports',
        id: 'bao-cao-tai-chinh',
        title: 'Báo cáo tài chính',
        coverTitle: 'Tài chính',
        reports: [
          {
            id: 'bctc-q2-2026',
            period: 'Q2/2026',
            title: 'Báo cáo tài chính hợp nhất Quý II/2026',
            publishedAt: '30/07/2026',
            fileSize: '5.6 MB',
            file: '#',
            viewUrl: '#',
          },
          {
            id: 'bctc-q1-2026',
            period: 'Q1/2026',
            title: 'Báo cáo tài chính hợp nhất Quý I/2026',
            publishedAt: '29/04/2026',
            fileSize: '5.2 MB',
            file: '#',
            viewUrl: '#',
          },
          {
            id: 'bctc-2025',
            period: '2025',
            title: 'Báo cáo tài chính hợp nhất kiểm toán năm 2025',
            publishedAt: '28/03/2026',
            fileSize: '8.9 MB',
            file: '#',
            viewUrl: '#',
          },
          {
            id: 'bctc-2024',
            period: '2024',
            title: 'Báo cáo tài chính hợp nhất kiểm toán năm 2024',
            publishedAt: '28/03/2025',
            fileSize: '8.3 MB',
            file: '#',
            viewUrl: '#',
          },
        ],
      },
      {
        type: 'reports',
        id: 'cap-nhat-ket-qua-kinh-doanh',
        title: 'Cập nhật kết quả kinh doanh',
        coverTitle: 'Kết quả kinh doanh',
        reports: [
          {
            id: 'kqkd-q2-2026',
            period: 'Q2/2026',
            title: 'Cập nhật kết quả kinh doanh Quý II/2026',
            publishedAt: '05/08/2026',
            fileSize: '4.7 MB',
            file: '#',
            viewUrl: '#',
          },
          {
            id: 'kqkd-q1-2026',
            period: 'Q1/2026',
            title: 'Cập nhật kết quả kinh doanh Quý I/2026',
            publishedAt: '08/05/2026',
            fileSize: '4.1 MB',
            file: '#',
            viewUrl: '#',
          },
        ],
      },
      {
        type: 'reports',
        id: 'bao-cao-cua-ben-thu-3',
        title: 'Báo cáo của bên thứ 3',
        coverTitle: 'Bên thứ 3',
        reports: [
          {
            id: 'xhtn-2026',
            period: '2026',
            title: 'Báo cáo xếp hạng tín nhiệm doanh nghiệp 2026',
            publishedAt: '20/06/2026',
            fileSize: '1.8 MB',
            file: '#',
            viewUrl: '#',
          },
          {
            id: 'phan-tich-2026',
            period: '2026',
            title: 'Báo cáo phân tích cổ phiếu BATECO',
            publishedAt: '12/05/2026',
            fileSize: '3.3 MB',
            file: '#',
            viewUrl: '#',
          },
        ],
      },
    ],
  },
  {
    type: 'documents',
    id: 'su-kien-nha-dau-tu',
    title: 'Sự kiện nhà đầu tư',
    documents: [
      {
        id: 'investor-day-2026',
        date: '25/09/2026',
        title: 'Bateco Investor Day 2026',
        description: 'Gặp gỡ nhà đầu tư, cập nhật chiến lược phát triển giai đoạn 2026 – 2030',
        file: '#',
      },
      {
        id: 'hop-nha-dau-tu-q2-2026',
        date: '05/08/2026',
        title: 'Hội nghị cập nhật kết quả kinh doanh Quý II/2026',
        description: 'Trao đổi trực tuyến cùng Ban điều hành về kết quả kinh doanh 6 tháng đầu năm',
        file: '#',
      },
      {
        id: 'tham-quan-du-an-2026',
        date: '18/05/2026',
        title: 'Chương trình tham quan dự án cho nhà đầu tư',
        description: 'Khảo sát thực tế khu công nghiệp và các dự án trọng điểm của Tập đoàn',
        file: '#',
      },
    ],
  },
]

const firstCategory = (item: GovernanceMenuItem): GovernanceCategory =>
  item.type === 'group' ? firstCategory(item.children[0]) : item

function findCategory(items: GovernanceMenuItem[], id?: string): GovernanceCategory | undefined {
  for (const item of items) {
    if (item.id === id) return firstCategory(item)
    if (item.type === 'group') {
      const found = findCategory(item.children, id)
      if (found) return found
    }
  }
}

/** Tìm danh mục theo id (kể cả trong menu con). Id của nhóm trả về mục con đầu tiên. */
export function getGovernanceCategory(id?: string): GovernanceCategory {
  return findCategory(GOVERNANCE_MENU, id) ?? firstCategory(GOVERNANCE_MENU[0])
}

/** Menu trang Giới thiệu → Văn bản quản trị (khớp mega menu + design) */
// TODO: thay dữ liệu mẫu bằng CMS
export const ABOUT_GOVERNANCE_MENU: DocumentsCategory[] = [
  {
    type: 'documents',
    id: 'dieu-le-cong-ty',
    title: 'Điều lệ Công ty',
    documents: [
      {
        id: 'dieu-le-2026-pl2',
        date: '09/06/2026',
        title: 'Điều lệ sửa đổi 2026 (Phụ lục 2)',
        description: 'Kèm theo Nghị quyết ĐHĐCĐ thường niên năm 2026',
        file: '#',
      },
      {
        id: 'dieu-le-2026',
        date: '22/04/2026',
        title: 'Điều lệ sửa đổi 2026',
        description: 'Bổ sung ngành nghề kinh doanh theo chiến lược phát triển giai đoạn mới',
        file: '#',
      },
      {
        id: 'dieu-le-2025',
        date: '01/10/2025',
        title: 'Điều lệ sửa đổi 2025',
        description: 'Thông qua theo hình thức biểu quyết điện tử của cổ đông',
        file: '#',
      },
      {
        id: 'dieu-le-2024',
        date: '27/04/2024',
        title: 'Điều lệ sửa đổi 2024',
        description: 'Cập nhật theo Luật Doanh nghiệp và quy định quản trị công ty đại chúng',
        file: '#',
      },
      {
        id: 'dieu-le-2023',
        date: '21/07/2023',
        title: 'Điều lệ sửa đổi 2023',
        description: 'Kèm theo văn bản lấy ý kiến cổ đông bằng văn bản',
        file: '#',
      },
      {
        id: 'dieu-le-2022',
        date: '26/04/2022',
        title: 'Điều lệ BATECO 2022 (Toàn văn)',
        description: 'Bản hợp nhất toàn văn Điều lệ Công ty sau ĐHĐCĐ thường niên 2022',
        file: '#',
      },
      {
        id: 'dieu-le-2020',
        date: '15/05/2020',
        title: 'Điều lệ sửa đổi bổ sung năm 2020',
        description: 'Ban hành tại ĐHĐCĐ thường niên năm 2020',
        file: '#',
      },
      {
        id: 'dieu-le-2018',
        date: '20/04/2018',
        title: 'Điều lệ sửa đổi 2018',
        description: 'Cập nhật cơ cấu tổ chức và phạm vi hoạt động của Công ty',
        file: '#',
      },
      {
        id: 'dieu-le-2015',
        date: '12/06/2015',
        title: 'Điều lệ sửa đổi 2015',
        description: 'Điều chỉnh vốn điều lệ và quyền của cổ đông theo quy định mới',
        file: '#',
      },
      {
        id: 'dieu-le-2012',
        date: '28/03/2012',
        title: 'Điều lệ thành lập BATECO',
        description: 'Bản Điều lệ gốc khi thành lập Công ty cổ phần BATECO',
        file: '#',
      },
    ],
  },
  {
    type: 'documents',
    id: 'quy-che-noi-bo',
    title: 'Quy chế nội bộ về quản trị công ty',
    documents: [
      {
        id: 'qcnb-2026',
        date: '09/06/2026',
        title: 'Quy chế nội bộ về quản trị công ty 2026',
        description: 'Ban hành kèm Nghị quyết ĐHĐCĐ thường niên năm 2026',
        file: '#',
      },
      {
        id: 'qcnb-2024',
        date: '27/04/2024',
        title: 'Quy chế nội bộ về quản trị công ty 2024',
        description: 'Cập nhật theo quy định mới về quản trị công ty đại chúng',
        file: '#',
      },
    ],
  },
  {
    type: 'documents',
    id: 'quy-che-hdqt',
    title: 'Quy chế hoạt động của HĐQT',
    documents: [
      {
        id: 'qchdqt-2026',
        date: '09/06/2026',
        title: 'Quy chế hoạt động của Hội đồng Quản trị 2026',
        description: 'Quy định tổ chức, quyền hạn và trách nhiệm của HĐQT',
        file: '#',
      },
    ],
  },
  {
    type: 'documents',
    id: 'quy-che-ubkt',
    title: 'Quy chế hoạt động của UBKT',
    documents: [
      {
        id: 'qcubkt-2026',
        date: '09/06/2026',
        title: 'Quy chế hoạt động của Ủy ban Kiểm toán 2026',
        description: 'Quy định chức năng, nhiệm vụ và quy trình làm việc của UBKT',
        file: '#',
      },
    ],
  },
  {
    type: 'documents',
    id: 'quy-che-kiem-toan-noi-bo',
    title: 'Quy chế kiểm toán nội bộ',
    documents: [
      {
        id: 'qckt-2026',
        date: '15/03/2026',
        title: 'Quy chế kiểm toán nội bộ 2026',
        description: 'Khung kiểm toán nội bộ và quy trình giám sát tuân thủ',
        file: '#',
      },
    ],
  },
  {
    type: 'documents',
    id: 'quy-che-cong-bo-thong-tin',
    title: 'Quy chế công bố thông tin',
    documents: [
      {
        id: 'qccbtt-2026',
        date: '15/03/2026',
        title: 'Quy chế công bố thông tin 2026',
        description: 'Quy trình và trách nhiệm công bố thông tin trên thị trường chứng khoán',
        file: '#',
      },
    ],
  },
]

export function getAboutGovernanceCategory(id?: string): DocumentsCategory {
  return ABOUT_GOVERNANCE_MENU.find((item) => item.id === id) ?? ABOUT_GOVERNANCE_MENU[0]
}

/** Nhóm chứa danh mục (nếu danh mục nằm trong menu con) */
export function getGovernanceGroup(id: string): GroupCategory | undefined {
  return GOVERNANCE_MENU.find(
    (item): item is GroupCategory =>
      item.type === 'group' && item.children.some((child) => child.id === id),
  )
}
