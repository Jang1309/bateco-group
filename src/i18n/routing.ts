import { defineRouting } from 'next-intl/routing'

/**
 * Dual App Router trees for per-locale SEO:
 * - `(vi)/gioi-thieu` → public `/gioi-thieu`
 * - `(en)/introduction` → public `/en/introduction`
 *
 * No cross-locale pathnames: each folder is a real URL so metadata can live
 * on separate page files. Use `pathFor()` / locale switcher map to jump locales.
 */
export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  localePrefix: 'as-needed',
  localeDetection: false,
})
