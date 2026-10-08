import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import Logo from '@/layouts/header/components/logo'

const FRAME = 'M0 226.5H331.717L445.5 82.8172L408.5 0H0V226.5Z'
const FRAME_FLIP = 'M0 0H331.717L445.5 143.6828L408.5 226.5H0V0Z'

function BrandFrame({ src, alt, id, d }: { src: string; alt: string; id: string; d: string }) {
  const clipId = `${id}-clip`
  const maskId = `${id}-stroke`

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 446 227'
      className='block h-auto w-full'
      role='img'
      aria-label={alt}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={d} />
        </clipPath>
        <mask
          id={maskId}
          fill='white'
        >
          <path d={d} />
        </mask>
      </defs>
      <image
        href={src}
        width='446'
        height='227'
        preserveAspectRatio='xMidYMid slice'
        clipPath={`url(#${clipId})`}
      />
      <path
        d={d}
        fill='none'
        stroke='#F4B700'
        strokeWidth='2'
        mask={`url(#${maskId})`}
      />
    </svg>
  )
}

const HomeBrand = async () => {
  const t = await getTranslations('HomeBrand')

  return (
    <section className='bg-white'>
      <div className='mx-auto grid w-full max-w-[95rem] grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center gap-[4.5rem] px-[3.75rem] py-[4.5rem] xsm:grid-cols-1 xsm:gap-[2rem] xsm:px-[1.5rem] xsm:py-[2.5rem]'>
        <div className='relative pr-[11rem] xsm:pr-0'>
          <div className='flex flex-col gap-[0.45rem]'>
            <BrandFrame
              id='brand-field'
              src='/home/brand/image-2.png'
              alt={t('fieldAlt')}
              d={FRAME}
            />
            <Logo className='mx-auto hidden py-[0.35rem] xsm:block' />
            <BrandFrame
              id='brand-team'
              src='/home/brand/image-1.png'
              alt={t('teamAlt')}
              d={FRAME_FLIP}
            />
          </div>
          <Logo className='absolute top-1/2 right-0 -translate-y-1/2 xsm:hidden' />
        </div>

        <div className='relative px-[0.25rem] py-[0.5rem]'>
          <Image
            src='/home/brand/bg.svg'
            alt='pattern'
            width={100}
            height={100}
            className='absolute inset-0 z-0 h-full w-full'
          />
          <div className='relative z-10'>
            <span className='block h-[0.14rem] w-[3.25rem] bg-[#F6A600]' />
            <h2 className='mt-[0.85rem] text-[2.35rem] font-bold uppercase leading-[1.15] text-[#1a2b48] xsm:text-[1.75rem]'>
              <span className='block'>{t('titleLine1')}</span>
              <span className='block'>{t('titleLine2')}</span>
            </h2>
            <p className='mt-[1.35rem] max-w-[36rem] text-[1rem] leading-[1.7] text-[#3a3a3a] xsm:text-[0.9375rem]'>
              {t('meaning')}
            </p>
            <p className='mt-[1.5rem] max-w-[36rem] border-l-[0.18rem] border-[#D97706CC] bg-[#F59E0B0D] px-[1.15rem] py-[0.95rem] text-[1rem] leading-[1.7] text-[#3a3a3a] xsm:text-[0.9375rem]'>
              {t('mark')}
            </p>
            <p className='mt-[1.5rem] max-w-[36rem] text-[1rem] leading-[1.7] text-[#2c2c2c] xsm:text-[0.9375rem]'>
              {t('cultureLead')} <strong className='font-bold'>{t('cultureValues')}</strong>{' '}
              {t('cultureRest')}
            </p>
          </div>
        </div>
      </div>

      <div className='mx-auto w-full max-w-[95rem] px-[3.75rem] pb-[0.5rem] xsm:px-[1.5rem]'>
        <span className='block h-[0.08rem] bg-[#c8a462]' />
      </div>
    </section>
  )
}

export default HomeBrand
