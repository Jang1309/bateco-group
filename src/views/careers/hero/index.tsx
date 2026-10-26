import Image from 'next/image'

import BannerTopOverlay from '@/components/shared/banner-top-overlay'
import type { CareersPageBanner } from '@/interfaces/careers.interface'
import { cn } from '@/lib/utils'

const FALLBACK_IMAGE = '/home/vision/d-img-2.jpg'

const FALLBACK_BANNER: CareersPageBanner = {
  subtitle: 'Cơ hội nghề nghiệp',
  title: '<p>Khám phá<br />\n<strong>Để dẫn đầu</strong></p>',
  desc: 'Tư duy kiến tạo - Năng lực thực thi',
  desktop: FALLBACK_IMAGE,
}

type CareersHeroProps = {
  data?: CareersPageBanner
}

type HeroCopyProps = {
  banner: CareersPageBanner
  stacked?: boolean
}

const HeroCopy = ({ banner, stacked }: HeroCopyProps) => (
  <div
    className={cn(stacked ? 'px-[1.25rem]' : 'relative z-[1] mx-auto max-w-[95rem] px-[3.75rem]')}
  >
    <div className={cn(stacked ? 'max-w-none' : 'max-w-[34rem]')}>
      {banner.subtitle ? (
        <p
          className={cn(
            'business-hero-rise flex items-center gap-[0.75rem] font-bold tracking-[0.2em] text-[#B5935E] uppercase',
            stacked ? 'text-[0.6875rem] tracking-[0.14em]' : 'text-[0.75rem]',
          )}
          style={{ animationDelay: '40ms' }}
        >
          <span className={cn('h-px bg-[#C6A15B]', stacked ? 'w-[1.5rem]' : 'w-[2rem]')} />
          {banner.subtitle}
        </p>
      ) : null}

      {banner.title ? (
        <div
          className={cn(
            'business-hero-fade font-bold text-[#1A2B48] [&_br]:block [&_em]:not-italic [&_p]:m-0 [&_strong]:mt-[0.2rem] [&_strong]:block [&_strong]:font-normal [&_strong]:text-[#B5935E] [&_strong]:italic',
            stacked
              ? 'mt-[0.625rem] text-[1.625rem] leading-[1.22] tracking-[-0.01em]'
              : 'mt-[1.25rem] text-[3rem] leading-[1.2]',
          )}
          style={{ animationDelay: '140ms' }}
          dangerouslySetInnerHTML={{ __html: banner.title }}
        />
      ) : null}

      {banner.desc ? (
        <p
          className={cn(
            'business-hero-rise font-medium text-[#1A2B48]/85 text-pretty',
            stacked
              ? 'mt-[0.75rem] text-[0.875rem] leading-[1.55]'
              : 'mt-[1.5rem] max-w-[30rem] text-[1.0625rem] leading-[1.65]',
          )}
          style={{ animationDelay: '240ms' }}
        >
          {banner.desc.trim()}
        </p>
      ) : null}
    </div>
  </div>
)

const CareersHero = ({ data }: CareersHeroProps) => {
  const banner = data?.title || data?.subtitle ? data : FALLBACK_BANNER
  const desktop = banner.desktop || FALLBACK_IMAGE
  const mobile = typeof banner.mobile === 'string' && banner.mobile ? banner.mobile : desktop

  return (
    <section className='relative overflow-hidden bg-white'>
      <div className='relative overflow-hidden pt-[9.5rem] pb-[6rem] xsm:hidden'>
        <div className='absolute inset-y-0 right-0 w-[70%]'>
          <Image
            src={desktop}
            alt=''
            fill
            priority
            unoptimized
            sizes='70vw'
            className='object-cover object-center'
          />
          <div
            aria-hidden
            className='absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.85)_20%,rgba(255,255,255,0)_55%)]'
          />
        </div>
        <BannerTopOverlay />
        <HeroCopy banner={banner} />
      </div>

      <div className='relative hidden xsm:block'>
        <div className='relative h-[19.5rem] w-full overflow-hidden'>
          <Image
            src={mobile}
            alt=''
            fill
            priority
            unoptimized
            sizes='100vw'
            className='origin-[center_75%] scale-[1.22] object-cover object-[center_78%]'
          />
          <div
            aria-hidden
            className='pointer-events-none absolute inset-x-0 top-0 h-[4.25rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.2)_50%,transparent_100%)]'
          />
          <div
            aria-hidden
            className='pointer-events-none absolute inset-x-0 bottom-0 h-[1.5rem] bg-[linear-gradient(180deg,transparent_0%,#fff_100%)]'
          />
        </div>
        <div className='pt-[1.25rem] pb-[2.75rem]'>
          <HeroCopy
            banner={banner}
            stacked
          />
        </div>
      </div>
    </section>
  )
}

export default CareersHero
