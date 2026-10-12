import ROUTES from '@/configs/routes'

export type ProjectItem = {
  title: string
  date: string
  image: string
  href: (typeof ROUTES)[keyof typeof ROUTES]
}

// TODO: thay ảnh placeholder bằng ảnh thật của từng dự án (public/home/projects/*)
export const PROJECTS: ProjectItem[] = [
  {
    title: 'Bateco Building & Age Care - Kiến tạo không gian sống đẳng cấp cho tuổi vàng',
    date: '13.09.2026',
    image: '/home/news/card-1.jpg',
    href: ROUTES.projects,
  },
  {
    title: 'Bateco Group phát triển dự án đường sắt tốc độ cao Bắc – Nam',
    date: '08.09.2026',
    image: '/home/news/card-2.jpg',
    href: ROUTES.projects,
  },
  {
    title: 'Bateco Land',
    date: '26.04.2025',
    image: '/home/news/card-3.jpg',
    href: ROUTES.projects,
  },
  {
    title: 'Bateco Siltron - Tiên phong lĩnh vực bán dẫn',
    date: '12.03.2025',
    image: '/home/news/card-4.jpg',
    href: ROUTES.projects,
  },
  {
    title: 'Khu công nghiệp xanh Bateco',
    date: '20.01.2025',
    image: '/home/news/card-5.jpg',
    href: ROUTES.projects,
  },
]
