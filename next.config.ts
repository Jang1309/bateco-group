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
    // Trên server IIS, cms.bateco-investment.vn trỏ về 127.0.0.1 (file hosts)
    // → phải cho phép IP nội bộ cả ở production, nếu không ảnh WordPress bị chặn
    dangerouslyAllowLocalIP: true,
    // Giới hạn domain được tải ảnh (an toàn hơn '**')
    remotePatterns: [
      { protocol: 'https', hostname: 'cms.bateco-investment.vn' },
      { protocol: 'http', hostname: 'cms.bateco-investment.vn' },
      { protocol: 'https', hostname: 'cms.bateco.vn' },
      { protocol: 'http', hostname: 'cms.bateco.vn' },
      // CMS chạy local lúc dev
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: '127.0.0.1' },
    ],
    deviceSizes: [430, 768, 1080, 1280, 1600, 1920],
  },

  reactStrictMode: false,
  output: 'standalone',
  poweredByHeader: false,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],
    // next-intl rewrite (/tin-tuc → /vi/tin-tuc) làm lệch hash header RSC
    // → prefetch Link bị 307?_rsc=... lặp vô hạn. Tắt validate để cắt vòng đó.
    validateRSCRequestHeaders: false,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
}

// ANALYZE=true pnpm build

export default withBundleAnalyzer(withNextIntl(nextConfig))
