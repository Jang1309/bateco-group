import Banner from '@/components/shared/banner'
import type {
  InvestorRelationsBanner,
  InvestorRelationsBannerStat,
} from '@/interfaces/investorRelations.interface'
import HeroStats from '@/views/governance/hero/components/hero-stats'

const FALLBACK_IMAGE = '/home/d-banner.png'

const FALLBACK_BANNER: InvestorRelationsBanner = {
  subtitle: 'Bateco Group',
  title: '<p><strong>Khám phá</strong><br />\nĐể dẫn đầu</p>',
  desc: 'Tập đoàn đầu tư đa ngành, phát triển bằng năng lực thực thi và giá trị bền vững.',
  stats: [
    { value: '14+', label: 'Năm Kinh Nghiệm' },
    { value: '50+', label: 'Đối tác chiến lược' },
    { value: '05', label: 'Công ty thành viên' },
    { value: '400+', label: 'Nhân sự tâm huyết' },
  ],
}

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
  const banner = data?.title || data?.subtitle ? data : FALLBACK_BANNER
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
