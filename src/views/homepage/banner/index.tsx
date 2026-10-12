import { getTranslations } from 'next-intl/server'

import Banner from '@/components/shared/banner'
import ROUTES from '@/configs/routes'

const HomeBanner = async () => {
  const t = await getTranslations('Banner')

  return (
    <Banner
      imageSrc='/home/d-banner.png'
      imageAlt='banner'
      srTitle='Bateco Group'
      eyebrow={t('eyebrow')}
      titleLine1={t('titleLine1')}
      titleLine2={t('titleLine2')}
      description={t('description')}
      showButton
      primary={{ href: ROUTES.about, label: t('ctaPrimary') }}
      secondary={{ href: '#ecosystem', label: t('ctaSecondary') }}
    />
  )
}

export default HomeBanner
