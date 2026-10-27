import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { newsCategoryListingHref } from '@/configs/routes'
import { assertPageLocale } from '@/i18n/assert-locale'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

/** Legacy `/danh-muc/[slug]` → filter query trên trang danh mục */
const NewsCategoryRedirectPage = async ({ params }: Props) => {
  const { locale, slug } = await params
  assertPageLocale(locale, 'vi')
  setRequestLocale(locale)

  redirect(newsCategoryListingHref('vi', slug))
}

export default NewsCategoryRedirectPage
