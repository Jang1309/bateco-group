import Script from 'next/script'

import ENV from '@/configs/env'

/** GA4 gtag — loads only when `NEXT_PUBLIC_GA_ID` is set. */
export default function GoogleAnalytics() {
  const id = ENV.GA_ID
  if (!id) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy='afterInteractive'
      />
      <Script
        id='ga-gtag'
        strategy='afterInteractive'
      >
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  )
}
