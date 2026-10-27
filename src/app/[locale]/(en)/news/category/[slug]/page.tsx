import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { newsCategoryListingHref } from '@/configs/routes'
import { assertPageLocale } from '@/i18n/assert-locale'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

/** Legacy `/news/category/[slug]` → filter query on category listing */
const NewsCategoryRedirectPage = async ({ params }: Props) => {
  const { locale, slug } = await params
  assertPageLocale(locale, 'en')
  setRequestLocale(locale)

  redirect(newsCategoryListingHref('en', slug))
}

export default NewsCategoryRedirectPage
