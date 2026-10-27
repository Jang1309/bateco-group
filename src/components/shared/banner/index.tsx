import Image from 'next/image'
import type { ComponentProps, ReactNode } from 'react'

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
  children?: ReactNode
}

const BannerContent = ({
  eyebrow,
  titleHtml,
  description,
  showButton,
  primary,
  secondary,
  animated,
  children,
}: Pick<
  BannerProps,
  | 'eyebrow'
  | 'titleHtml'
  | 'description'
  | 'showButton'
  | 'primary'
  | 'secondary'
  | 'animated'
  | 'children'
>) => (
  <div
    className={`relative max-w-[40rem] border-l-[0.1875rem] border-[#b5935e] pl-[3.125rem] xsm:max-w-full xsm:pl-[0.875rem] ${animated ? 'banner-reveal-line' : ''}`}
  >
    {eyebrow ? (
      <p
        className={`text-[0.875rem] font-bold tracking-[0.12em] text-[#1a2b48] uppercase xsm:text-[0.6875rem] xsm:tracking-[0.14em] ${animated ? 'banner-reveal-fade' : ''}`}
      >
        {eyebrow}
      </p>
    ) : null}

    {titleHtml ? (
      <div
        className={`mt-[1.25rem] text-[3rem] leading-[1.2] font-bold tracking-[0.01em] text-[#1a2b48] uppercase [&_br]:block [&_p]:m-0 [&_strong]:font-bold [&_strong]:text-[#b5935e] xsm:mt-[0.55rem] xsm:text-[1.75rem] xsm:leading-[1.18] ${animated ? 'banner-reveal-fade banner-reveal-late' : ''}`}
        dangerouslySetInnerHTML={{ __html: titleHtml }}
      />
    ) : null}

    {description ? (
      <p
        className={`mt-[1.5rem] max-w-[28rem] text-[1.0625rem] leading-[1.6] font-medium text-[#1a2b48]/90 xsm:mt-[0.65rem] xsm:max-w-none xsm:text-[0.8125rem] xsm:leading-[1.5] ${animated ? 'banner-reveal-fade banner-reveal-late' : ''}`}
      >
        {description}
      </p>
    ) : null}

    {showButton ? (
      <div
        className={`mt-[2.25rem] flex flex-wrap items-center gap-[1.75rem] xsm:mt-[1.1rem] xsm:flex-col xsm:items-stretch xsm:gap-[0.7rem] ${animated ? 'banner-reveal-fade banner-reveal-late' : ''}`}
      >
        {primary ? (
          <Link
            href={primary.href}
            className='inline-flex cursor-pointer items-center justify-center bg-[#b5935e] px-[1.75rem] py-[0.95rem] text-[0.875rem] font-bold tracking-[0.06em] text-white uppercase shadow-[0_0.35rem_1.25rem_rgba(181,147,94,0.28)] transition-[background-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#a4834f] hover:shadow-[0_0.45rem_1.5rem_rgba(181,147,94,0.38)] active:scale-[0.98] xsm:w-full xsm:py-[0.8rem] xsm:text-[0.75rem]'
          >
            {primary.label}
          </Link>
        ) : null}

        {secondary ? (
          <a
            href={secondary.href}
            className='group inline-flex cursor-pointer items-center justify-center gap-[0.45rem] text-[0.875rem] font-bold tracking-[0.06em] text-[#b5935e] uppercase transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-75 xsm:justify-start xsm:text-[0.75rem]'
          >
            {secondary.label}
            <span
              aria-hidden
              className='inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0.5'
            >
              ↓
            </span>
          </a>
        ) : null}
      </div>
    ) : null}

    {children}
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
  animated = true,
  children,
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
      animated={animated}
    >
      {children}
    </BannerContent>
  )

  return (
    <section className='relative h-dvh w-full overflow-hidden tablet:h-[60vh] xsm:flex xsm:h-auto xsm:min-h-[100dvh] xsm:flex-col xsm:overflow-visible'>
      {srTitle ? <h1 className='sr-only'>{srTitle}</h1> : null}

      {/* Desktop: full-bleed cover */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes='100vw'
        unoptimized
        className={`object-cover object-center xsm:hidden ${animated ? 'banner-reveal-image' : ''}`}
      />
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.9)_16%,rgba(255,255,255,0.45)_36%,rgba(255,255,255,0)_58%)] xsm:hidden'
      />
      <BannerTopOverlay />

      {/* Desktop overlay copy */}
      <div className='absolute inset-0 z-[1] flex items-center xsm:hidden'>
        <div className='mx-auto w-full max-w-[95rem] px-[2.5rem]'>{content}</div>
      </div>

      {/* Mobile: text trên (gọn), ảnh dưới chiếm phần còn lại */}
      <div className='relative z-[1] hidden shrink-0 bg-white px-[1.25rem] translate-y-[8.5rem] pb-[1.15rem] xsm:block'>
        {content}
      </div>
      <div
        className={`relative hidden min-h-[48vh] w-full flex-1 overflow-hidden xsm:block ${animated ? 'banner-reveal-image' : ''}`}
      >
        <Image
          src={mobileSrc}
          alt={imageAlt}
          fill
          priority
          sizes='100vw'
          unoptimized
          className='object-cover object-[center_42%]'
        />
      </div>
    </section>
  )
}

export default Banner
