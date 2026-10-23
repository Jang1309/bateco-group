import Image from 'next/image'

import type { HomepageBrand } from '@/interfaces/homepage.interface'
import Logo from '@/layouts/header/components/logo'
import BrandFrame, {
  BRAND_FRAME,
  BRAND_FRAME_FLIP,
} from '@/views/homepage/brand/components/brand-frame'

const HomeBrand = ({ data }: { data?: HomepageBrand }) => {
  const image1 = data?.image_1 || '/home/brand/image-1.png'
  const image2 = data?.image_2 || '/home/brand/image-2.png'

  return (
    <section className='bg-white'>
      <div className='mx-auto grid w-full max-w-[95rem] grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center gap-[4.5rem] px-[3.75rem] py-[4.5rem] xsm:grid-cols-1 xsm:gap-[2rem] xsm:px-[1.5rem] xsm:py-[2.5rem]'>
        <div className='relative pr-[11rem] xsm:pr-0'>
          <div
            data-aos='fade-right'
            className='flex flex-col gap-[0.45rem]'
          >
            <BrandFrame
              id='brand-field'
              src={image2}
              alt={data?.content?.title || 'Bateco'}
              d={BRAND_FRAME}
            />
            <Logo
              logo={data?.logo}
              className='mx-auto hidden py-[0.35rem] xsm:block'
            />
            <BrandFrame
              id='brand-team'
              src={image1}
              alt={data?.content?.title || 'Bateco'}
              d={BRAND_FRAME_FLIP}
            />
          </div>
          <Logo
            logo={data?.logo}
            className='absolute top-1/2 right-0 -translate-y-1/2 xsm:hidden'
          />
        </div>

        <div className='relative px-[0.25rem] py-[0.5rem]'>
          <Image
            src='/home/brand/bg.svg'
            alt=''
            width={100}
            height={100}
            className='absolute inset-0 z-0 h-full w-full'
          />
          <div
            data-aos='fade-up'
            data-aos-delay='150'
            className='relative z-10'
          >
            <span className='block h-[0.14rem] w-[3.25rem] bg-[#F6A600]' />
            {data?.content?.title ? (
              <h2 className='mt-[0.85rem] text-[2.35rem] leading-[1.15] font-bold text-[#1a2b48] uppercase xsm:text-[1.75rem]'>
                {data.content.title}
              </h2>
            ) : null}
            {data?.content?.desc ? (
              <div
                className='mt-[1.35rem] max-w-[36rem] text-justify text-[1rem] leading-[1.7] text-[#3a3a3a] xsm:text-[0.9375rem] [&_blockquote]:my-[1.5rem] [&_blockquote]:border-l-[0.18rem] [&_blockquote]:border-[#D97706CC] [&_blockquote]:bg-[#F59E0B0D] [&_blockquote]:px-[1.15rem] [&_blockquote]:py-[0.95rem] [&_blockquote]:not-italic [&_blockquote_p]:m-0 [&_p]:mt-[1.5rem] [&_p]:first:mt-0 [&_strong]:font-bold [&_strong]:text-[#b5935e]'
                dangerouslySetInnerHTML={{ __html: data.content.desc }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeBrand
