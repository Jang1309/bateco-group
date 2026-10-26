'use client'

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { hrefFor } from '@/configs/routes'
import { Link, toAppHref } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import type { ProjectCardModel } from '@/views/projects/map-project'

import 'swiper/css'
import 'swiper/css/effect-fade'

const NAV_BUTTON =
  'flex size-[2.5rem] items-center justify-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-sm transition-[border-color,background-color,color] duration-300 hover:border-white hover:bg-white hover:text-[#1A2B48] xsm:size-[2.25rem]'

type FeaturedSliderProps = {
  projects: ProjectCardModel[]
}

const pad = (n: number) => String(n).padStart(2, '0')

const FeaturedSlider = ({ projects }: FeaturedSliderProps) => {
  const locale = useLocale()
  const t = useTranslations('Projects')
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const progressRef = useRef<HTMLSpanElement>(null)

  return (
    <div className='relative overflow-hidden rounded-[0.75rem] bg-[#0F1C33] xsm:rounded-[0.5rem]'>
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect='fade'
        fadeEffect={{ crossFade: true }}
        loop={projects.length > 1}
        speed={900}
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        onSwiper={setSwiper}
        onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
        onAutoplayTimeLeft={(_, __, progress) => {
          if (progressRef.current) progressRef.current.style.transform = `scaleX(${1 - progress})`
        }}
      >
        {projects.map((project, index) => {
          const isActive = activeIndex === index

          return (
            <SwiperSlide key={project.id}>
              <article className='relative aspect-[16/8] overflow-hidden xsm:aspect-[3/4]'>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority={index === 0}
                  unoptimized
                  sizes='(max-width: 639px) 100vw, 88vw'
                  className={cn(
                    'object-cover transition-transform ease-out',
                    isActive ? 'scale-[1.04] duration-[8s]' : 'scale-100 delay-1000 duration-0',
                  )}
                />
                <div
                  aria-hidden
                  className='absolute inset-0 bg-[linear-gradient(180deg,rgba(15,28,51,0.1)_0%,rgba(15,28,51,0.35)_50%,rgba(15,28,51,0.92)_100%)]'
                />

                <div className='absolute inset-x-0 bottom-0 px-[2.5rem] pt-[6rem] pb-[5.25rem] xsm:px-[1.25rem] xsm:pt-[4rem] xsm:pb-[4.75rem]'>
                  <div className='max-w-[32rem]'>
                    {project.sectorLabel ? (
                      <p
                        className={cn(
                          'flex items-center gap-[0.625rem] text-[0.6875rem] font-semibold tracking-[0.14em] text-[#DFBA73] uppercase transition-[opacity,transform] duration-500 ease-out xsm:text-[0.625rem] xsm:tracking-[0.12em]',
                          isActive
                            ? 'translate-y-0 opacity-100 delay-150'
                            : 'translate-y-[0.75rem] opacity-0',
                        )}
                      >
                        <span
                          aria-hidden
                          className='h-px w-[1.5rem] shrink-0 bg-[#C6A15B] xsm:w-[1rem]'
                        />
                        <span className='line-clamp-1'>{project.sectorLabel}</span>
                      </p>
                    ) : null}

                    <h3
                      className={cn(
                        'mt-[0.75rem] text-[1.625rem] leading-[1.3] font-bold text-pretty text-white transition-[opacity,transform] duration-700 ease-out xsm:mt-[0.5rem] xsm:text-[1.125rem] xsm:leading-[1.35]',
                        isActive
                          ? 'translate-y-0 opacity-100 delay-200'
                          : 'translate-y-[1rem] opacity-0',
                      )}
                    >
                      <Link
                        href={toAppHref(hrefFor('projectDetail', locale, { slug: project.slug }))}
                        className='line-clamp-3 transition-colors duration-300 hover:text-[#DFBA73] xsm:line-clamp-4'
                      >
                        {project.title}
                      </Link>
                    </h3>

                    <Link
                      href={toAppHref(hrefFor('projectDetail', locale, { slug: project.slug }))}
                      className={cn(
                        'group mt-[1rem] inline-flex items-center gap-[0.5rem] text-[0.75rem] font-bold tracking-[0.08em] text-white/75 uppercase transition-[opacity,transform,color] duration-700 ease-out hover:text-[#DFBA73] xsm:mt-[0.75rem] xsm:text-[0.6875rem]',
                        isActive
                          ? 'translate-y-0 opacity-100 delay-300'
                          : 'translate-y-[0.75rem] opacity-0',
                      )}
                    >
                      {t('viewProject')}
                      <ArrowRight className='size-[0.875rem] transition-transform duration-300 group-hover:translate-x-[0.2rem]' />
                    </Link>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          )
        })}
      </Swiper>

      <div className='absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-[0.75rem] px-[2.5rem] pb-[1.75rem] xsm:px-[1.25rem] xsm:pb-[1.15rem]'>
        <div className='flex min-w-0 flex-1 items-center gap-[0.375rem] overflow-hidden'>
          {projects.map((project, index) => (
            <button
              key={project.id}
              type='button'
              aria-label={t('goto', { n: index + 1 })}
              aria-current={index === activeIndex}
              onClick={() => swiper?.slideToLoop(index)}
              className='group/bar shrink-0 py-[0.5rem]'
            >
              <span
                className={cn(
                  'relative block h-[0.125rem] overflow-hidden bg-white/25 transition-[width,background-color] duration-300 group-hover/bar:bg-white/50',
                  index === activeIndex ? 'w-[2.5rem] xsm:w-[1.75rem]' : 'w-[1rem] xsm:w-[0.75rem]',
                )}
              >
                {index === activeIndex ? (
                  <span
                    ref={progressRef}
                    style={{ transform: 'scaleX(0)' }}
                    className='absolute inset-0 origin-left bg-[#C6A15B]'
                  />
                ) : null}
              </span>
            </button>
          ))}
        </div>

        <div className='flex shrink-0 items-center gap-[0.75rem] xsm:gap-[0.5rem]'>
          <p className='text-[0.75rem] font-medium tracking-[0.1em] text-white/50 tabular-nums xsm:text-[0.6875rem]'>
            <span className='text-white'>{pad(activeIndex + 1)}</span>
            <span className='mx-[0.25rem]'>/</span>
            {pad(projects.length)}
          </p>
          {projects.length > 1 ? (
            <div className='flex gap-[0.375rem]'>
              <button
                type='button'
                aria-label={t('prev')}
                onClick={() => swiper?.slidePrev()}
                className={NAV_BUTTON}
              >
                <ChevronLeft className='size-[1rem]' />
              </button>
              <button
                type='button'
                aria-label={t('next')}
                onClick={() => swiper?.slideNext()}
                className={NAV_BUTTON}
              >
                <ChevronRight className='size-[1rem]' />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default FeaturedSlider
