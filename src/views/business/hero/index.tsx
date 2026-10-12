import Image from 'next/image'

import HeroContent from './components/content'

const BusinessHero = () => {
  return (
    <section className='relative pt-[4.5rem] pb-[6rem] xsm:pt-[3rem] xsm:pb-[3.5rem]'>
      <div className='absolute inset-0 overflow-hidden'>
        {/* TODO: thay bằng ảnh hero riêng của trang lĩnh vực kinh doanh */}
        <Image
          src='/linh-vuc-kinh-doanh/d-banner.png'
          alt=''
          fill
          priority
          unoptimized
          sizes='100vw'
          className='object-cover object-center'
        />
      </div>
      <HeroContent />
    </section>
  )
}

export default BusinessHero
