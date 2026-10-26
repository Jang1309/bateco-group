import type { Metadata } from 'next'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Bateco Group',
  description:
    'Bateco Group — multi-sector investment group driven by execution and lasting value.',
}

// <html> lives in `[locale]/layout` so `lang` follows the locale; root not-found renders its own.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
