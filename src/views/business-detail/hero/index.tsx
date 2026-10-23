import Image from 'next/image'

import BannerTopOverlay from '@/components/shared/banner-top-overlay'
import type { SectorDetail } from '@/views/business-detail/data'

import HeroContent from './components/content'

const SectorHero = ({ sector }: { sector: SectorDetail }) => {
  return (
    <section className='relative overflow-hidden bg-white pt-[9.5rem] pb-[5.5rem] xsm:pt-[19rem] xsm:pb-[3rem]'>
      <div className='absolute inset-y-0 right-0 w-[68%] xsm:inset-x-0 xsm:bottom-auto xsm:h-[24rem] xsm:w-full'>
        <Image
          src={sector.hero.image}
          alt=''
          fill
          priority
          sizes='(max-width: 639px) 100vw, 68vw'
          className='object-cover object-center'
        />
        <div
          aria-hidden
          className='absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.88)_18%,rgba(255,255,255,0)_55%)] xsm:bg-[linear-gradient(180deg,rgba(255,255,255,0.75)_0%,rgba(255,255,255,0)_28%,rgba(255,255,255,0.55)_75%,#fff_100%)]'
        />
      </div>
      <BannerTopOverlay />
      <HeroContent sector={sector} />
    </section>
  )
}

export default SectorHero
