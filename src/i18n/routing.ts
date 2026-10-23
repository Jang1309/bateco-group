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
    '/gioi-thieu/van-ban-quan-tri': {
      vi: '/gioi-thieu/van-ban-quan-tri',
      en: '/about/governance-documents',
    },
    '/linh-vuc-kinh-doanh': {
      vi: '/linh-vuc-kinh-doanh',
      en: '/business-sectors',
    },
    '/linh-vuc-kinh-doanh/[slug]': {
      vi: '/linh-vuc-kinh-doanh/[slug]',
      en: '/business-sectors/[slug]',
    },
    '/quan-he-nha-dau-tu': {
      vi: '/quan-he-nha-dau-tu',
      en: '/investor-relations',
    },
    '/du-an': {
      vi: '/du-an',
      en: '/projects',
    },
    '/du-an/[slug]': {
      vi: '/du-an/[slug]',
      en: '/projects/[slug]',
    },
    '/tin-tuc': {
      vi: '/tin-tuc',
      en: '/news',
    },
    '/tin-tuc/[slug]': {
      vi: '/tin-tuc/[slug]',
      en: '/news/[slug]',
    },
    '/tin-tuc/danh-muc/[slug]': {
      vi: '/tin-tuc/danh-muc/[slug]',
      en: '/news/category/[slug]',
    },
    '/co-hoi-nghe-nghiep': {
      vi: '/co-hoi-nghe-nghiep',
      en: '/careers',
    },
    '/co-hoi-nghe-nghiep/[slug]': {
      vi: '/co-hoi-nghe-nghiep/[slug]',
      en: '/careers/[slug]',
    },
    '/lien-he': {
      vi: '/lien-he',
      en: '/contact',
    },
  },
})
