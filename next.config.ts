import bundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next/dist/server/config-shared'
import createNextIntlPlugin from 'next-intl/plugin'

import '@/configs/env'

const withNextIntl = createNextIntlPlugin()
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  // Cho phép mở dev server từ điện thoại / máy khác qua IP LAN
  allowedDevOrigins: ['192.168.*.*', '10.*.*.*', '172.*.*.*'],
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 2678400,
    // Dev CMS trên localhost — Next 16 chặn private IP mặc định (SSRF)
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
    deviceSizes: [430, 768, 1080, 1280, 1600, 1920],
  },
  reactStrictMode: false,
  output: 'standalone',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

// ANALYZE=true pnpm build

export default withBundleAnalyzer(withNextIntl(nextConfig))
