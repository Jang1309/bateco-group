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

  return (
    <>
      <Header header={siteSettingResponse?.data?.header} />
      {children}
      <Footer footer={siteSettingResponse?.data?.footer} />
    </>
  )
}
