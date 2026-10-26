import Image from 'next/image'

import BannerTopOverlay from '@/components/shared/banner-top-overlay'
import type { SectorItem } from '@/interfaces/sectors.interface'

import HeroContent from './components/content'

const FALLBACK = '/home/investment/d-card-1.png'

const SectorHero = ({ sector }: { sector: SectorItem }) => {
  const image = sector.acf?.banner?.image || sector.acf?.image || FALLBACK

  return (
    <section className='relative overflow-hidden bg-white'>
      {/* Desktop: ảnh phải + chữ trái */}
      <div className='relative overflow-hidden pt-[9.5rem] pb-[5.5rem] xsm:hidden'>
        <div className='absolute inset-y-0 right-0 w-[68%]'>
          <Image
            src={image}
            alt={sector.name || ''}
            fill
            priority
            unoptimized
            sizes='68vw'
            className='object-cover object-center'
          />
          <div
            aria-hidden
            className='absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.88)_18%,rgba(255,255,255,0)_55%)]'
          />
        </div>
        <BannerTopOverlay />
        <HeroContent sector={sector} />
      </div>

      {/* Mobile: ảnh full → chữ + CTA trên nền trắng */}
      <div className='relative hidden xsm:block'>
        <BannerTopOverlay />
        <div className='relative aspect-[4/3] w-full overflow-hidden'>
          <Image
            src={image}
            alt={sector.name || ''}
            fill
            priority
            unoptimized
            sizes='100vw'
            className='object-cover object-center'
          />
          <div
            aria-hidden
            className='pointer-events-none absolute inset-x-0 bottom-0 h-[4rem] bg-[linear-gradient(180deg,transparent_0%,#fff_100%)]'
          />
        </div>
        <div className='px-[1.25rem] pt-[0.25rem] pb-[2.5rem]'>
          <HeroContent
            sector={sector}
            stacked
          />
        </div>
      </div>
    </section>
  )
}

export default SectorHero
