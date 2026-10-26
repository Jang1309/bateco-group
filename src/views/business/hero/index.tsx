import Image from 'next/image'

import BannerTopOverlay from '@/components/shared/banner-top-overlay'
import {
  type BusinessFieldBanner,
  resolveBusinessFieldImage,
} from '@/interfaces/businessField.interface'

import HeroContent from './components/content'

const FALLBACK = '/linh-vuc-kinh-doanh/d-banner.png'

type BusinessHeroProps = {
  data?: BusinessFieldBanner
}

const BusinessHero = ({ data }: BusinessHeroProps) => {
  const desktop = resolveBusinessFieldImage(data?.desktop) || FALLBACK
  const mobile = resolveBusinessFieldImage(data?.mobile) || desktop

  return (
    <section className='relative overflow-hidden bg-white xsm:flex xsm:flex-col'>
      {/* Desktop: chữ overlay trên ảnh */}
      <div className='relative overflow-hidden pt-[9.5rem] pb-[6rem] xsm:hidden'>
        <div className='absolute inset-0 overflow-hidden'>
          <Image
            src={desktop}
            alt=''
            fill
            priority
            unoptimized
            sizes='100vw'
            className='object-cover object-center'
          />
          <div
            aria-hidden
            className='absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.45)_42%,rgba(255,255,255,0.55)_100%)]'
          />
        </div>
        <BannerTopOverlay />
        <HeroContent data={data} />
      </div>

      {/* Mobile: chữ trên nền trắng → ảnh mobile full-bleed bên dưới */}
      <div className='relative hidden xsm:block'>
        <BannerTopOverlay />
        <div className='px-0 pt-[5.5rem] pb-[1.25rem]'>
          <HeroContent
            data={data}
            stacked
          />
        </div>
        <div className='relative aspect-[5/4] w-full overflow-hidden'>
          <Image
            src={mobile}
            alt=''
            fill
            priority
            unoptimized
            sizes='100vw'
            className='object-cover object-center'
          />
          <div
            aria-hidden
            className='pointer-events-none absolute inset-x-0 top-0 h-[3rem] bg-[linear-gradient(180deg,#fff_0%,transparent_100%)]'
          />
        </div>
      </div>
    </section>
  )
}

export default BusinessHero
