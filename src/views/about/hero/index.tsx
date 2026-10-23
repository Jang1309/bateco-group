import Banner from '@/components/shared/banner'
import type { IntroductionBanner } from '@/interfaces/introduction.interface'

const FALLBACK = '/gioi-thieu/d-banner.png'

const stripHtml = (value?: string) =>
  value
    ?.replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || ''

type AboutHeroProps = {
  data?: IntroductionBanner
}

const AboutHero = ({ data }: AboutHeroProps) => {
  const srTitle = stripHtml(data?.title) || data?.subtitle || 'Bateco Group'
  const imageSrc = data?.banner_desktop || data?.banner_mobile || FALLBACK
  const imageSrcMobile = data?.banner_mobile || data?.banner_desktop || FALLBACK

  return (
    <Banner
      imageSrc={imageSrc}
      imageSrcMobile={imageSrcMobile}
      imageAlt={srTitle}
      srTitle={srTitle}
      eyebrow={data?.subtitle || ''}
      titleHtml={data?.title}
      description={data?.desc || ''}
    />
  )
}

export default AboutHero
