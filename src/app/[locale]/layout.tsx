import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { routing } from '@/i18n/routing'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <NextIntlClientProvider>
      {/* overflow-x-clip trên wrapper: Chrome mobile bỏ qua overflow của body và nới rộng viewport
          khi phần tử AOS (fade-left) tràn phải, làm header fixed bị kéo rộng theo */}
      <div className='overflow-x-clip'>{children}</div>
    </NextIntlClientProvider>
  )
}
