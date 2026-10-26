import { notFound } from 'next/navigation'

import type { AppLocale } from '@/configs/routes'

/** Ensure this page file only serves its route-group locale (dual SEO trees). */
export function assertPageLocale(locale: string, expected: AppLocale) {
  if (locale !== expected) notFound()
}
