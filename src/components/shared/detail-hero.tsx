import Image from 'next/image'
import type { ReactNode } from 'react'

import BannerTopOverlay from '@/components/shared/banner-top-overlay'

type DetailHeroProps = {
  image: string
  eyebrow: string
  title: string
  description?: string
  /** Meta cạnh eyebrow (ngày, địa điểm, phòng ban…) */
  meta?: ReactNode
  titleClassName?: string
}

/** Banner chi tiết: chữ trái, ảnh phải (~56%, không đè lên cột chữ để ảnh giữ nét) */
const DetailHero = ({
  image,
  eyebrow,
  title,
  description,
  meta,
  titleClassName,
}: DetailHeroProps) => {
  return (
    <section className='business-hero-fade relative overflow-hidden bg-white pt-[9.5rem] pb-[5.5rem] xsm:pt-[25rem] xsm:pb-[3rem]'>
      <div className='absolute inset-y-0 right-0 w-[56%] xsm:inset-x-0 xsm:bottom-auto xsm:h-[24rem] xsm:w-full'>
        <Image
          src={image}
          alt=''
          fill
          priority
          unoptimized
          sizes='(max-width: 639px) 100vw, 56vw'
          className='object-cover object-center'
        />
        <div
          aria-hidden
          className='absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.6)_8%,rgba(255,255,255,0)_24%)] xsm:bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.35)_18%,rgba(255,255,255,0)_32%,rgba(255,255,255,0)_78%,#fff_100%)]'
        />
      </div>
      <BannerTopOverlay />

      <div className='relative z-[1] mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
        <header className='max-w-[34rem]'>
          <p
            className='business-hero-rise flex flex-wrap items-center gap-x-[0.875rem] gap-y-[0.375rem] text-[0.75rem]'
            style={{ animationDelay: '80ms' }}
          >
            <span className='font-bold tracking-[0.14em] text-[#B5935E] uppercase'>{eyebrow}</span>
            {meta ? (
              <>
                <span className='h-[0.75rem] w-px bg-[#1A2B48]/20' />
                {meta}
              </>
            ) : null}
          </p>
          <h1
            className={
              titleClassName ??
              'business-hero-rise mt-[1rem] text-[3rem] leading-[1.18] font-bold tracking-[-0.02em] text-balance text-[#1A2B48] xsm:text-[1.75rem]'
            }
            style={{ animationDelay: '160ms' }}
          >
            {title}
          </h1>
          {description ? (
            <p
              className='business-hero-rise mt-[1.25rem] max-w-[30rem] text-[1.0625rem] leading-[1.7] text-pretty text-[#1A2B48]/80 xsm:text-[0.9375rem]'
              style={{ animationDelay: '240ms' }}
            >
              {description}
            </p>
          ) : null}
          <span
            aria-hidden
            className='mt-[1.75rem] block h-[0.1875rem] w-[3rem] bg-[#B5935E] xsm:mt-[1.25rem]'
          />
        </header>
      </div>
    </section>
  )
}

export default DetailHero
