import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { assertPageLocale } from '@/i18n/assert-locale'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

/** Legacy `/danh-muc/[slug]` → filter query trên trang danh mục */
const NewsCategoryRedirectPage = async ({ params }: Props) => {
  const { locale, slug } = await params
  assertPageLocale(locale, 'vi')
  setRequestLocale(locale)

  redirect(`/tin-tuc/danh-muc?danh-muc=${encodeURIComponent(slug)}`)
}

export default NewsCategoryRedirectPage
