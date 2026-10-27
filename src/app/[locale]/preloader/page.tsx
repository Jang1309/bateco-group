import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { Preloader } from '@/components/shared/preloader'

type Props = {
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: 'Preloader preview',
  robots: { index: false, follow: false },
}

export default async function PreloaderPreviewPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className='min-h-dvh bg-[#eaf4fb]'>
      <Preloader
        force
        loop
      />
    </main>
  )
}
