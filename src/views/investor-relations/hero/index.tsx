import { useTranslations } from 'next-intl'

import Banner from '@/components/shared/banner'
import type {
  InvestorRelationsBanner,
  InvestorRelationsBannerStat,
} from '@/interfaces/investorRelations.interface'
import HeroStats from '@/views/governance/hero/components/hero-stats'

const FALLBACK_IMAGE = '/home/d-banner.png'

const stripHtml = (value?: string) =>
  value
    ?.replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || ''

const resolveMobile = (mobile?: string | false) =>
  typeof mobile === 'string' && mobile.length > 0 ? mobile : undefined

type InvestorHeroProps = {
  data?: InvestorRelationsBanner
}

const InvestorHero = ({ data }: InvestorHeroProps) => {
  const t = useTranslations('Investor')
  const fallbackStats: InvestorRelationsBannerStat[] = [
    { value: '14+', label: t('statExperience') },
    { value: '50+', label: t('statPartners') },
    { value: '05', label: t('statMembers') },
    { value: '400+', label: t('statStaff') },
  ]
  const fallbackBanner: InvestorRelationsBanner = {
    subtitle: t('heroEyebrow'),
    title: `<p>${t('heroTitle')}</p>`,
    desc: t('heroDesc'),
    stats: fallbackStats,
  }
  const banner = data?.title || data?.subtitle ? data : fallbackBanner
  const stats: InvestorRelationsBannerStat[] = banner.stats ?? []
  const imageSrc = banner.desktop || resolveMobile(banner.mobile) || FALLBACK_IMAGE
  const imageSrcMobile = resolveMobile(banner.mobile) || banner.desktop || FALLBACK_IMAGE
  const srTitle = stripHtml(banner.title) || banner.subtitle || 'Bateco Group'

  return (
    <Banner
      imageSrc={imageSrc}
      imageSrcMobile={imageSrcMobile}
      imageAlt={srTitle}
      srTitle={srTitle}
      eyebrow={banner.subtitle || ''}
      titleHtml={banner.title}
      description={banner.desc || ''}
    >
      <HeroStats stats={stats} />
    </Banner>
  )
}

export default InvestorHero
