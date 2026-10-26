import type { AppLocale } from '@/configs/routes'

/**
 * Anchor / section id dùng cho click-scroll.
 * vi → slug tiếng Việt, en → slug tiếng Anh.
 */
export const SECTION_IDS = {
  aboutVision: { vi: 'tam-nhin', en: 'vision' },
  aboutLeadership: { vi: 'lanh-dao', en: 'leadership' },
  aboutHistory: { vi: 'lich-su', en: 'history' },
  aboutEcosystem: { vi: 'he-sinh-thai', en: 'ecosystem' },
  documents: { vi: 'van-ban', en: 'documents' },
  projectsListing: { vi: 'du-an-khac', en: 'other-projects' },
  businessProjects: { vi: 'du-an', en: 'projects' },
  careersJobs: { vi: 'vi-tri-tuyen-dung', en: 'job-openings' },
  newsListing: { vi: 'tin-tuc-danh-sach', en: 'news-list' },
} as const

export type SectionIdKey = keyof typeof SECTION_IDS

export function sectionId(key: SectionIdKey, locale: string = 'vi'): string {
  const entry = SECTION_IDS[key]
  return entry[(locale === 'en' ? 'en' : 'vi') as AppLocale]
}
