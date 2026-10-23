import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { routing } from '@/i18n/routing'
import Footer from '@/layouts/footer'
import Header from '@/layouts/header'
import siteSettingService from '@/services/site-setting'

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

  const siteSettingResponse = await siteSettingService.getSiteSettings(locale)

  return (
    <NextIntlClientProvider>
      {/* overflow-x-clip trên wrapper: Chrome mobile bỏ qua overflow của body và nới rộng viewport
          khi phần tử AOS (fade-left) tràn phải, làm header fixed bị kéo rộng theo */}
      <div className='overflow-x-clip'>
        <Header header={siteSettingResponse?.data?.header} />
        {children}
        <Footer footer={siteSettingResponse?.data?.footer} />
      </div>
    </NextIntlClientProvider>
  )
}
