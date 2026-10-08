import ROUTES from '@/configs/routes'

export type NewsTitleKey = 'sky' | 'legal' | 'accountant' | 'ceo' | 'evtol'

export type OtherNewsItem = {
  image: string
  date: string
  titleKey: NewsTitleKey
  href: typeof ROUTES.news
  bold?: boolean
}

export const OTHER_NEWS: OtherNewsItem[] = [
  {
    image: '/home/news/card-1.jpg',
    date: '08.09.2026',
    titleKey: 'sky',
    href: ROUTES.news,
  },
  {
    image: '/home/news/card-2.jpg',
    date: '08.09.2026',
    titleKey: 'legal',
    href: ROUTES.news,
  },
  {
    image: '/home/news/card-3.jpg',
    date: '14.09.2026',
    titleKey: 'accountant',
    href: ROUTES.news,
  },
  {
    image: '/home/news/card-4.jpg',
    date: '13.09.2026',
    titleKey: 'ceo',
    href: ROUTES.news,
  },
  {
    image: '/home/news/card-5.jpg',
    date: '08.09.2026',
    titleKey: 'evtol',
    href: ROUTES.news,
    bold: true,
  },
]
