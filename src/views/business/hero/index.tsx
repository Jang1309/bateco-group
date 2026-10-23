import Image from 'next/image'

import BannerTopOverlay from '@/components/shared/banner-top-overlay'
import type { BusinessFieldBanner } from '@/interfaces/businessField.interface'

import HeroContent from './components/content'

const FALLBACK = '/linh-vuc-kinh-doanh/d-banner.png'

type BusinessHeroProps = {
  data?: BusinessFieldBanner
}

const BusinessHero = ({ data }: BusinessHeroProps) => {
  const desktop = data?.desktop || FALLBACK
  const mobile = typeof data?.mobile === 'string' && data.mobile ? data.mobile : desktop

  return (
    <section className='relative overflow-hidden pt-[9.5rem] pb-[6rem] xsm:pt-[7rem] xsm:pb-[3.5rem]'>
      <div className='absolute inset-0 overflow-hidden'>
        <Image
          src={desktop}
          alt=''
          fill
          priority
          unoptimized
          sizes='100vw'
          className='object-cover object-center xsm:hidden'
        />
        <Image
          src={mobile}
          alt=''
          fill
          priority
          unoptimized
          sizes='100vw'
          className='hidden object-cover object-center xsm:block'
        />
        <div
          aria-hidden
          className='absolute inset-0 bg-white/35'
        />
      </div>
      <BannerTopOverlay />
      <HeroContent data={data} />
    </section>
  )
}

export default BusinessHero
