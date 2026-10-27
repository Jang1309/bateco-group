import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import NextTopLoader from 'nextjs-toploader'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { AosProvider } from '@/components/providers/aos-provider'
import { LenisProvider } from '@/components/providers/lenis-provider'
import { SwrProvider } from '@/components/providers/swr-provider'
import GoogleAnalytics from '@/components/shared/google-analytics'
import { PageTransition } from '@/components/shared/page-transition'
import { Preloader } from '@/components/shared/preloader'
import { PRELOADER_STORAGE_KEY } from '@/components/shared/preloader/data'
import { Toaster } from '@/components/ui/sonner'
import { LocaleAlternateProvider } from '@/i18n/locale-alternate'
import { routing } from '@/i18n/routing'
import { arimo } from '@/styles/fonts'

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
    <html
      lang={locale}
      // Boot script preloader set data-bateco-preloader + overflow trước hydrate
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        // overflow-x-clip: chặn thanh cuộn ngang khi phần tử AOS trượt vào từ mép phải
        className={`${arimo.variable} overflow-x-clip font-sans antialiased`}
      >
        {/* Chạy trước paint: ẩn preloader nếu đã xem / khóa scroll nếu chưa — tránh lộ web */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(sessionStorage.getItem('${PRELOADER_STORAGE_KEY}')==='1'){document.documentElement.dataset.batecoPreloader='seen';return}}catch(e){}document.documentElement.dataset.batecoPreloader='pending';document.documentElement.style.overflow='hidden'})();`,
          }}
        />
        <GoogleAnalytics />
        <NextTopLoader
          color='#2563eb'
          height={3}
          crawl
          showSpinner={false}
          easing='ease'
          speed={220}
          shadow='0 0 10px #2563eb,0 0 5px #2563eb'
        />
        <SwrProvider>
          <NuqsAdapter>
            <LenisProvider>
              <AosProvider>
                <NextIntlClientProvider>
                  <Preloader />
                  <PageTransition />
                  <LocaleAlternateProvider>
                    {/* overflow-x-clip trên wrapper: Chrome mobile bỏ qua overflow của body và nới rộng viewport
                        khi phần tử AOS (fade-left) tràn phải, làm header fixed bị kéo rộng theo */}
                    <div className='overflow-x-clip'>{children}</div>
                  </LocaleAlternateProvider>
                </NextIntlClientProvider>
              </AosProvider>
              <Toaster
                richColors
                closeButton
              />
            </LenisProvider>
          </NuqsAdapter>
        </SwrProvider>
      </body>
    </html>
  )
}
