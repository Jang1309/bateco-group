import Banner from '@/components/shared/banner'
import type { AdministrativeDocumentBanner } from '@/interfaces/administrativeDocument.interface'
import HeroStats from '@/views/governance/hero/components/hero-stats'

const FALLBACK = '/home/d-banner.png'

const stripHtml = (value?: string) =>
  value
    ?.replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || ''

type GovernanceHeroProps = {
  data?: AdministrativeDocumentBanner
}

const GovernanceHero = ({ data }: GovernanceHeroProps) => {
  const banner = data?.banner
  const stats = data?.hero_stats ?? []
  const imageSrc = banner?.banner_desktop || banner?.banner_mobile || FALLBACK
  const imageSrcMobile = banner?.banner_mobile || banner?.banner_desktop || FALLBACK
  const srTitle = stripHtml(banner?.title) || banner?.subtitle || 'Bateco Group'

  return (
    <Banner
      imageSrc={imageSrc}
      imageSrcMobile={imageSrcMobile}
      imageAlt={srTitle}
      srTitle={srTitle}
      eyebrow={banner?.subtitle || ''}
      titleHtml={banner?.title}
      description={banner?.desc || ''}
    >
      <HeroStats stats={stats} />
    </Banner>
  )
}

export default GovernanceHero
