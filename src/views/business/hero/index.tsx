import Image from 'next/image'

import BannerTopOverlay from '@/components/shared/banner-top-overlay'

import HeroContent from './components/content'

const BusinessHero = () => {
  return (
    <section className='relative overflow-hidden pt-[9.5rem] pb-[6rem] xsm:pt-[7rem] xsm:pb-[3.5rem]'>
      <div className='absolute inset-0 overflow-hidden'>
        {/* TODO: thay bằng ảnh hero riêng của trang lĩnh vực kinh doanh */}
        <Image
          src='/business-sectors/d-banner.png'
          alt=''
          fill
          priority
          sizes='100vw'
          className='object-cover object-center'
        />
        <div
          aria-hidden
          className='absolute inset-0 bg-white/35'
        />
      </div>
      <BannerTopOverlay />
      <HeroContent />
    </section>
  )
}

export default BusinessHero
