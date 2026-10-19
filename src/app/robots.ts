import ENV from '@/configs/env'

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${ENV.DOMAIN}/sitemap.xml`,
  }
}
