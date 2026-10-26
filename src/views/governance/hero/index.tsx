import { useTranslations } from 'next-intl'

import Banner from '@/components/shared/banner'
import type { AdministrativeDocumentBanner } from '@/interfaces/administrativeDocument.interface'
import { HERO_STATS } from '@/views/governance/data'
import HeroStats from '@/views/governance/hero/components/hero-stats'

const FALLBACK_IMAGE = '/home/d-banner.png'

const stripHtml = (value?: string) =>
  value
    ?.replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || ''

type GovernanceHeroProps = {
  data?: AdministrativeDocumentBanner
}

const GovernanceHero = ({ data }: GovernanceHeroProps) => {
  const t = useTranslations('Governance')
  const fallbackBanner: AdministrativeDocumentBanner = {
    banner: {
      subtitle: t('heroEyebrow'),
      title: `<p>${t('heroTitle')}</p>`,
      desc: t('heroDesc'),
    },
    hero_stats: HERO_STATS,
  }
  const resolved = data?.banner?.title || data?.banner?.subtitle ? data : fallbackBanner
  const banner = resolved.banner
  const stats = resolved.hero_stats ?? []
  const imageSrc = banner?.banner_desktop || banner?.banner_mobile || FALLBACK_IMAGE
  const imageSrcMobile = banner?.banner_mobile || banner?.banner_desktop || FALLBACK_IMAGE
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
