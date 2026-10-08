import Image from 'next/image'

import BannerContent from './components/content'

const Banner = () => {
  return (
    <section className='relative w-full overflow-hidden'>
      <h1 className='sr-only'>Bateco Group</h1>
      <Image
        src='/home/d-banner.png'
        alt='banner'
        width={1000}
        height={1000}
        unoptimized
        priority
        className='h-auto w-full'
      />
      <div
        aria-hidden
        className='pointer-events-none absolute inset-y-0 left-0 w-[80%] bg-[linear-gradient(90deg,#fff_0%,#fff_30%,rgba(255,255,255,0)_100%)]'
      />
      <BannerContent />
    </section>
  )
}

export default Banner
