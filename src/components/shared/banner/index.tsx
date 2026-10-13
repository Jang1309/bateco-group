import Image from 'next/image'
import type { ComponentProps } from 'react'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

type BannerLink = {
  href: ComponentProps<typeof Link>['href']
  label: string
}

type BannerAnchor = {
  href: string
  label: string
}

type BannerProps = {
  imageSrc: string
  imageAlt?: string
  srTitle?: string
  eyebrow: string
  titleLine1: string
  titleLine2: string
  description: string
  showButton?: boolean
  primary?: BannerLink
  secondary?: BannerAnchor
  className?: string
  imageClassName?: string
  animated?: boolean
}

const Banner = ({
  imageSrc,
  imageAlt = '',
  srTitle,
  eyebrow,
  titleLine1,
  titleLine2,
  description,
  showButton = false,
  primary,
  secondary,
  className,
  imageClassName,
  animated = false,
}: BannerProps) => {
  return (
    <section className={cn('relative h-[100vh] w-full overflow-hidden', className)}>
      {srTitle ? <h1 className='sr-only'>{srTitle}</h1> : null}
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={1000}
        height={1000}
        unoptimized
        priority
        className={cn('h-auto w-full', animated && 'banner-reveal-image', imageClassName)}
      />
      <div
        aria-hidden
        className='pointer-events-none absolute inset-y-0 left-0 w-[80%] bg-[linear-gradient(90deg,#fff_0%,#fff_30%,rgba(255,255,255,0)_100%)]'
      />
      <div
        aria-hidden
        className='pointer-events-none absolute inset-x-0 top-0 h-[12rem] bg-[linear-gradient(180deg,#fff_0%,rgba(255,255,255,0.85)_38%,rgba(255,255,255,0)_100%)] xsm:h-[10rem]'
      />

      <div className='absolute inset-0 z-[1] flex items-center'>
        <div className='mx-auto w-full max-w-[95rem] px-[2.5rem] xsm:px-[1.5rem]'>
          <div className='relative border-l-[0.1875rem] border-[#b5935e] pl-[3.125rem] xsm:max-w-full xsm:pl-[1.25rem]'>
            <p
              className={cn(
                'text-[0.875rem] font-bold tracking-[0.08rem] text-[#1a2b48] uppercase',
                animated && 'banner-reveal-fade',
              )}
            >
              {eyebrow}
            </p>

            <h2 className='mt-[1.25rem] text-[3rem] leading-[1.35] font-bold uppercase xsm:mt-[1rem] xsm:text-[2.25rem]'>
              <span className={cn('block text-[#b5935e]', animated && 'banner-reveal-line')}>
                {titleLine1}
              </span>
              <span className={cn('block text-[#1a2b48]', animated && 'banner-reveal-line')}>
                {titleLine2}
              </span>
            </h2>

            <p
              className={cn(
                'mt-[1.5rem] max-w-[28rem] text-[1.0625rem] leading-[1.55] font-medium text-[#1a2b48] xsm:mt-[1rem] xsm:text-[0.9375rem]',
                animated && 'banner-reveal-fade banner-reveal-late',
              )}
            >
              {description}
            </p>

            {showButton ? (
              <div className='mt-[2.25rem] flex flex-wrap items-center gap-[1.75rem] xsm:mt-[1.5rem] xsm:gap-[1.25rem]'>
                {primary ? (
                  <Link
                    href={primary.href}
                    className='inline-flex items-center justify-center bg-[#b5935e] px-[1.5rem] py-[0.875rem] text-[0.875rem] font-bold tracking-[0.04rem] text-white uppercase shadow-[0_0.25rem_0.75rem_rgba(181,147,94,0.35)] transition-colors hover:bg-[#a4834f]'
                  >
                    {primary.label}
                  </Link>
                ) : null}

                {secondary ? (
                  <a
                    href={secondary.href}
                    className='inline-flex items-center gap-[0.35rem] text-[0.875rem] font-bold tracking-[0.04rem] text-[#b5935e] uppercase transition-opacity hover:opacity-80'
                  >
                    {secondary.label}
                    <span aria-hidden>↓</span>
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
