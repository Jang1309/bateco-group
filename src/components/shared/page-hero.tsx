import Image from 'next/image'
import type { ReactNode } from 'react'

import BannerTopOverlay from '@/components/shared/banner-top-overlay'

type PageHeroProps = {
  eyebrow: string
  title: string
  /** Dòng thứ hai màu vàng, in nghiêng */
  highlight: string
  description: string
  image: string
  /** Nút/CTA bên dưới mô tả */
  children?: ReactNode
}

/** Hero trang con: chữ bên trái, ảnh bên phải (mobile: ảnh trên, chữ dưới) */
const PageHero = ({ eyebrow, title, highlight, description, image, children }: PageHeroProps) => {
  return (
    <section className='relative overflow-hidden bg-white pt-[9.5rem] pb-[6rem] xsm:pt-[19rem] xsm:pb-[3rem]'>
      <div className='absolute inset-y-0 right-0 w-[70%] xsm:inset-x-0 xsm:bottom-auto xsm:h-[24rem] xsm:w-full'>
        <Image
          src={image}
          alt=''
          fill
          priority
          sizes='(max-width: 639px) 100vw, 70vw'
          className='object-cover object-center'
        />
        <div
          aria-hidden
          className='absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.85)_20%,rgba(255,255,255,0)_55%)] xsm:bg-[linear-gradient(180deg,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_30%,rgba(255,255,255,0.6)_75%,#fff_100%)]'
        />
      </div>
      <BannerTopOverlay />

      <div className='relative z-[1] mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
        <div className='max-w-[34rem]'>
          <p
            className='business-hero-rise flex items-center gap-[0.75rem] text-[0.75rem] font-bold tracking-[0.2em] text-[#B5935E] uppercase'
            style={{ animationDelay: '40ms' }}
          >
            <span className='h-px w-[2rem] bg-[#C6A15B]' />
            {eyebrow}
          </p>
          <h1
            className='business-hero-fade mt-[1.25rem] text-[3rem] leading-[1.2] font-bold text-[#1A2B48] xsm:text-[2rem]'
            style={{ animationDelay: '140ms' }}
          >
            {title}
            <span className='mt-[0.25rem] block font-normal text-[#B5935E] italic'>
              {highlight}
            </span>
          </h1>
          <p
            className='business-hero-rise mt-[1.5rem] max-w-[30rem] text-[1.0625rem] leading-[1.65] font-medium text-[#1A2B48] xsm:mt-[1rem] xsm:text-[0.9375rem]'
            style={{ animationDelay: '240ms' }}
          >
            {description}
          </p>
          {children ? (
            <div
              className='business-hero-rise mt-[2rem] xsm:mt-[1.5rem]'
              style={{ animationDelay: '340ms' }}
            >
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default PageHero
