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
  imageSrcMobile?: string
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

const BannerContent = ({
  eyebrow,
  titleHtml,
  description,
  showButton,
  primary,
  secondary,
}: Pick<
  BannerProps,
  'eyebrow' | 'titleHtml' | 'description' | 'showButton' | 'primary' | 'secondary'
>) => (
  <div className='relative max-w-[40rem] border-l-[0.1875rem] border-[#b5935e] pl-[3.125rem] xsm:max-w-full xsm:pl-[1rem]'>
    {eyebrow ? (
      <p className='text-[0.875rem] font-bold tracking-[0.08rem] text-[#1a2b48] uppercase xsm:text-[0.75rem] xsm:tracking-[0.06rem]'>
        {eyebrow}
      </p>
    ) : null}

    {titleHtml ? (
      <div
        className='mt-[1.25rem] text-[3rem] leading-[1.35] font-bold text-[#1a2b48] uppercase [&_br]:block [&_p]:m-0 [&_strong]:font-bold [&_strong]:text-[#b5935e] xsm:mt-[0.75rem] xsm:text-[1.75rem] xsm:leading-[1.3]'
        dangerouslySetInnerHTML={{ __html: titleHtml }}
      />
    ) : null}

    {description ? (
      <p className='mt-[1.5rem] max-w-[28rem] text-[1.0625rem] leading-[1.55] font-medium text-[#1a2b48] xsm:mt-[0.75rem] xsm:max-w-none xsm:text-[0.875rem] xsm:leading-[1.5]'>
        {description}
      </p>
    ) : null}

    {showButton ? (
      <div className='mt-[2.25rem] flex flex-wrap items-center gap-[1.75rem] xsm:mt-[1.25rem] xsm:flex-col xsm:items-stretch xsm:gap-[0.75rem]'>
        {primary ? (
          <Link
            href={primary.href}
            className='inline-flex cursor-pointer items-center justify-center bg-[#b5935e] px-[1.5rem] py-[0.875rem] text-[0.875rem] font-bold tracking-[0.04rem] text-white uppercase shadow-[0_0.25rem_0.75rem_rgba(181,147,94,0.35)] transition-colors hover:bg-[#a4834f] xsm:w-full xsm:py-[0.8rem] xsm:text-[0.8125rem]'
          >
            {primary.label}
          </Link>
        ) : null}

        {secondary ? (
          <a
            href={secondary.href}
            className='inline-flex cursor-pointer items-center justify-center gap-[0.35rem] text-[0.875rem] font-bold tracking-[0.04rem] text-[#b5935e] uppercase transition-opacity hover:opacity-80 xsm:justify-start xsm:text-[0.8125rem]'
          >
            {secondary.label}
            <span aria-hidden>↓</span>
          </a>
        ) : null}
      </div>
    ) : null}
  </div>
)

const Banner = ({
  imageSrc,
  imageSrcMobile,
  imageAlt = '',
  srTitle,
  eyebrow,
  titleHtml,
  description,
  showButton = false,
  primary,
  secondary,
}: BannerProps) => {
  const mobileSrc = imageSrcMobile || imageSrc
  const content = (
    <BannerContent
      eyebrow={eyebrow}
      titleHtml={titleHtml}
      description={description}
      showButton={showButton}
      primary={primary}
      secondary={secondary}
    />
  )

  return (
    <section className='relative h-dvh w-full overflow-hidden xsm:flex xsm:h-auto xsm:min-h-0 xsm:flex-col xsm:overflow-visible'>
      {srTitle ? <h1 className='sr-only'>{srTitle}</h1> : null}

      {/* Desktop: full-bleed cover */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes='100vw'
        className='object-cover object-[center_center] xsm:hidden'
      />
      <BannerTopOverlay />

      {/* Mobile: ảnh ngắn ~42vh, không full viewport */}
      <div className='relative hidden h-[42vh] max-h-[22rem] min-h-[16rem] w-full shrink-0 overflow-hidden xsm:block'>
        <Image
          src={mobileSrc}
          alt={imageAlt}
          fill
          priority
          sizes='100vw'
          className='object-cover object-center'
        />
      </div>

      {/* Desktop overlay copy */}
      <div className='absolute inset-0 z-[1] flex items-center xsm:hidden'>
        <div className='mx-auto w-full max-w-[95rem] px-[2.5rem]'>{content}</div>
      </div>

      {/* Mobile: copy dưới ảnh, nền trắng — không đè lên skyline */}
      <div className='relative z-[1] hidden bg-white px-[1.25rem] pt-[1.5rem] pb-[2rem] xsm:block'>
        {content}
      </div>
    </section>
  )
}

export default Banner
