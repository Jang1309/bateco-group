import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import BannerTopOverlay from '@/components/shared/banner-top-overlay'
import type { AboutHero as AboutHeroData } from '@/views/about/data'
import ScrollCue from '@/views/about/hero/components/scroll-cue'

type AboutHeroProps = {
  hero: AboutHeroData
}

const AboutHero = async ({ hero }: AboutHeroProps) => {
  const t = await getTranslations('AboutPage')

  return (
    <section className='relative overflow-hidden bg-white pt-[10rem] pb-[5.5rem] xsm:pt-[17rem] xsm:pb-[2.5rem]'>
      <h1 className='sr-only'>{hero.srTitle}</h1>

      <div className='absolute inset-y-0 right-0 w-[68%] xsm:inset-x-0 xsm:bottom-auto xsm:h-[24rem] xsm:w-full'>
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes='(max-width: 639px) 100vw, 68vw'
          className='object-cover object-[center_20%]'
        />
        <div
          aria-hidden
          className='absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.85)_22%,rgba(255,255,255,0)_60%)] xsm:bg-[linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0)_35%,rgba(255,255,255,0.7)_75%,#fff_100%)]'
        />
      </div>
      <BannerTopOverlay />
      <ScrollCue label={t('scrollCue')} />

      <div className='relative z-[1] mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
        <div className='max-w-[34rem] border-l-[0.1875rem] border-[#B5935E] pl-[1.75rem] xsm:pl-[1rem]'>
          <p
            className='business-hero-rise text-[0.875rem] font-bold tracking-[0.04em] text-[#1A2B48] uppercase xsm:text-[0.75rem]'
            style={{ animationDelay: '40ms' }}
          >
            {hero.eyebrow}
          </p>
          <h2
            className='business-hero-fade mt-[1rem] text-[3rem] leading-[1.25] font-bold tracking-[0.02em] uppercase xsm:mt-[0.75rem] xsm:text-[2rem]'
            style={{ animationDelay: '140ms' }}
          >
            <span className='block text-[#B5935E]'>{hero.titleLine1}</span>
            <span className='block text-[#1A2B48]'>{hero.titleLine2}</span>
          </h2>
          <p
            className='business-hero-rise mt-[1.25rem] max-w-[30rem] text-[1.0625rem] leading-[1.6] font-medium text-[#1A2B48] xsm:text-[0.9375rem]'
            style={{ animationDelay: '240ms' }}
          >
            {hero.description}
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutHero
