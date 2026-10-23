import Banner from '@/components/shared/banner'
import type { HomepageBanner } from '@/interfaces/homepage.interface'

const stripHtml = (value?: string) =>
  value
    ?.replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || ''

const HomeBanner = ({ data }: { data?: HomepageBanner }) => {
  const plainTitle = stripHtml(data?.title) || 'Bateco Group'
  const imageSrc = data?.background_pc || data?.background_mobile || '/home/d-banner.png'
  const primary =
    data?.button_1?.url && data.button_1.title
      ? { href: data.button_1.url, label: data.button_1.title }
      : undefined
  const secondary =
    data?.button_2?.url && data.button_2.title
      ? { href: data.button_2.url, label: data.button_2.title }
      : undefined

  return (
    <Banner
      imageSrc={imageSrc}
      imageAlt={plainTitle}
      srTitle={plainTitle}
      eyebrow={data?.subtitle || ''}
      titleHtml={data?.title}
      description={data?.desc || ''}
      showButton={Boolean(primary || secondary)}
      primary={primary}
      secondary={secondary}
    />
  )
}

export default HomeBanner
