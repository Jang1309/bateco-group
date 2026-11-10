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
      // CMS tách tiêu đề thành 2 <p> → nối lại để chữ tự xuống dòng theo bề rộng, không vỡ dòng lẻ trên mobile
      titleHtml={data?.title?.replace(/<\/p>\s*<p>/gi, ' ')}
      description={data?.desc || ''}
    />
  )
}

export default AboutHero
