import Image from 'next/image'
import type { ComponentProps } from 'react'

import BannerTopOverlay from '@/components/shared/banner-top-overlay'
import { Link } from '@/i18n/navigation'

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
  titleHtml?: string
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
  titleHtml,
  description,
  showButton = false,
  primary,
  secondary,
}: BannerProps) => {
  return (
    <section className='relative h-[100vh] w-full overflow-hidden'>
      {srTitle ? <h1 className='sr-only'>{srTitle}</h1> : null}
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={1000}
        height={1000}
        unoptimized
        priority
        className='h-auto w-full'
      />
      <div
        aria-hidden
        className='pointer-events-none absolute inset-x-0 bottom-0 hidden h-[68%] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.88)_36%,#fff_100%)] xsm:block'
      />
      <BannerTopOverlay />

      <div className='absolute inset-0 z-[1] flex items-center'>
        <div className='mx-auto w-full max-w-[95rem] px-[2.5rem] xsm:px-[1.5rem]'>
          <div className='relative border-l-[0.1875rem] border-[#b5935e] pl-[3.125rem] xsm:max-w-full xsm:pl-[1.25rem]'>
            <p className='text-[0.875rem] font-bold tracking-[0.08rem] text-[#1a2b48] uppercase'>
              {eyebrow}
            </p>

            {titleHtml ? (
              <div
                className='mt-[1.25rem] text-[3rem] leading-[1.35] font-bold text-[#1a2b48] uppercase [&_br]:block [&_p]:m-0 [&_strong]:font-bold [&_strong]:text-[#b5935e] xsm:mt-[1rem] xsm:text-[2.25rem]'
                dangerouslySetInnerHTML={{ __html: titleHtml }}
              />
            ) : null}

            <p className='mt-[1.5rem] max-w-[28rem] text-[1.0625rem] leading-[1.55] font-medium text-[#1a2b48] xsm:mt-[1rem] xsm:text-[0.9375rem]'>
              {description}
            </p>

            {showButton ? (
              <div className='mt-[2.25rem] flex flex-wrap items-center gap-[1.75rem] xsm:mt-[1.5rem] xsm:flex-col xsm:items-start xsm:gap-[1rem]'>
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
