import type { Metadata } from 'next'
import { Arimo } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { LenisProvider } from '@/components/providers/lenis-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import '@/styles/globals.css'

// const geologica = Geologica({
//   variable: '--font-geologica',
//   subsets: ['latin', 'latin-ext', 'vietnamese'],
//   weight: ['400', '500', '600', '700'],
// })

const arimo = Arimo({
  variable: '--font-arimo',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Next.js 16 Template Docs',
  description: 'Source overview and how this Next.js 16 template works.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        suppressHydrationWarning
        className={`${arimo.variable} font-sans antialiased`}
      >
        <NextTopLoader
          color='#2563eb'
          height={3}
          crawl
          showSpinner={false}
          easing='ease'
          speed={220}
          shadow='0 0 10px #2563eb,0 0 5px #2563eb'
        />
        <QueryProvider>
          <NuqsAdapter>
            <LenisProvider>{children}</LenisProvider>
          </NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  )
}
