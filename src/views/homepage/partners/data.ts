export type Partner = {
  name: string
  logo: string
  /** Logo dạng vuông/có nhiều khoảng trắng thì cho hiển thị cao hơn để cân với logo ngang */
  tall?: boolean
}

export const PARTNERS: Partner[] = [
  { name: 'DSIT Solutions', logo: '/home/partner/partner-1.png' },
  { name: 'iMAR Navigation & Control', logo: '/home/partner/partner-2.png', tall: true },
  { name: 'ABB', logo: '/home/partner/partner-3.webp' },
  { name: 'Jacobi Group', logo: '/home/partner/partner-4.png' },
  { name: 'Lamor', logo: '/home/partner/partner-5.png' },
  { name: 'FLSmidth', logo: '/home/partner/partner-6.png' },
  { name: 'Gets Systems', logo: '/home/partner/partner-7.png' },
  { name: 'Epsilor', logo: '/home/partner/partner-8.png', tall: true },
  { name: 'Celestia TTI', logo: '/home/partner/partner-9.png' },
  { name: 'Inertial Labs', logo: '/home/partner/partner-10.png' },
  { name: 'Kebni', logo: '/home/partner/partner-11.png' },
  { name: 'Radionor Communications', logo: '/home/partner/partner-12.png' },
  { name: 'Schneider Electric', logo: '/home/partner/partner-13.webp' },
  { name: 'SKF', logo: '/home/partner/partner-14.jpg', tall: true },
  { name: 'Trakka Systems', logo: '/home/partner/partner-15.png' },
]

// Hệ sinh thái tạm dùng chung logo đối tác, khi có logo công ty thành viên thì tách thành danh sách riêng
export const ECOSYSTEM: Partner[] = PARTNERS
