import Image from 'next/image'

import Reveal from '@/views/about/components/reveal'

const BrandBar = () => (
  <div className='flex items-center gap-[1.25rem] px-[3.75rem] pt-[1.875rem] pb-[0.625rem] xsm:px-[1.5rem] xsm:pt-[2.5rem]'>
    <Reveal
      variant='grow-x'
      className='h-[0.117rem] flex-1 origin-right bg-[#C8A462]'
    />
    <Reveal
      variant='pop'
      className='flex h-[3.4375rem] items-center px-[0.625rem]'
    >
      <Image
        src='/header/d-logo.png'
        alt=''
        width={523}
        height={143}
        className='h-[2.97rem] w-auto xsm:h-[2.25rem]'
      />
    </Reveal>
    <Reveal
      variant='grow-x'
      className='h-[0.117rem] flex-1 origin-left bg-[#C8A462]'
    />
  </div>
)

export default BrandBar
