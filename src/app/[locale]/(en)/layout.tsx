import SiteJsonLd from '@/components/shared/site-json-ld'
import Footer from '@/layouts/footer'
import Header from '@/layouts/header'
import siteSettingService from '@/services/site-setting'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function SiteLayout({ children, params }: Props) {
  const { locale } = await params
  const siteSettingResponse = await siteSettingService.getSiteSettings(locale)
  const header = siteSettingResponse?.data?.header

  return (
    <>
      <SiteJsonLd
        locale={locale}
        logo={header?.logo}
      />
      <Header header={header} />
      {children}
      <Footer footer={siteSettingResponse?.data?.footer} />
    </>
  )
}
