import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  localePrefix: 'as-needed',
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/gioi-thieu': {
      vi: '/gioi-thieu',
      en: '/about',
    },
    '/linh-vuc-kinh-doanh': {
      vi: '/linh-vuc-kinh-doanh',
      en: '/business-sectors',
    },
    '/quan-he-nha-dau-tu': {
      vi: '/quan-he-nha-dau-tu',
      en: '/investor-relations',
    },
    '/du-an': {
      vi: '/du-an',
      en: '/projects',
    },
    '/tin-tuc': {
      vi: '/tin-tuc',
      en: '/news',
    },
    '/co-hoi-nghe-nghiep': {
      vi: '/co-hoi-nghe-nghiep',
      en: '/careers',
    },
    '/lien-he': {
      vi: '/lien-he',
      en: '/contact',
    },
  },
})
