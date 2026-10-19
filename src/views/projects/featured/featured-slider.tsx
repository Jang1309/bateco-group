'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { cn } from '@/lib/utils'
import { getSectorLabel, type Project } from '@/views/projects/data'

import 'swiper/css'
import 'swiper/css/effect-fade'

const NAV_BUTTON =
  'flex size-[2.75rem] items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#1A2B48] xsm:size-[2.5rem]'

type FeaturedSliderProps = {
  projects: Project[]
}

const pad = (n: number) => String(n).padStart(2, '0')

const FeaturedSlider = ({ projects }: FeaturedSliderProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const progressRef = useRef<HTMLSpanElement>(null)

  return (
    <div className='relative overflow-hidden rounded-[1rem] bg-[#0F1C33] shadow-[0_1.5rem_3rem_rgba(15,28,51,0.18)] xsm:rounded-[0.75rem]'>
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect='fade'
        fadeEffect={{ crossFade: true }}
        loop
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        onSwiper={setSwiper}
        onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
        onAutoplayTimeLeft={(_, __, progress) => {
          if (progressRef.current) progressRef.current.style.transform = `scaleX(${1 - progress})`
        }}
      >
        {projects.map((project, index) => {
          const active = activeIndex === index

          return (
            <SwiperSlide key={project.id}>
              <article className='relative aspect-[16/7] overflow-hidden xsm:aspect-[4/5]'>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority={index === 0}
                  sizes='(max-width: 639px) 100vw, 88vw'
                  className={cn(
                    'object-cover transition-transform ease-out',
                    active ? 'scale-[1.08] duration-[7s]' : 'scale-100 delay-1000 duration-0',
                  )}
                />
                <div
                  aria-hidden
                  className='absolute inset-0 bg-[linear-gradient(90deg,rgba(15,28,51,0.85)_0%,rgba(15,28,51,0.45)_40%,rgba(15,28,51,0)_70%),linear-gradient(0deg,rgba(15,28,51,0.8)_0%,rgba(15,28,51,0)_40%)] xsm:bg-[linear-gradient(0deg,rgba(15,28,51,0.95)_0%,rgba(15,28,51,0.5)_45%,rgba(15,28,51,0)_75%)]'
                />

                <div className='absolute inset-x-0 bottom-[6.5rem] px-[4rem] xsm:bottom-[5.5rem] xsm:px-[1.25rem]'>
                  <span
                    className={cn(
                      'inline-block border-l-[0.1875rem] border-[#C6A15B] pl-[0.75rem] text-[0.75rem] font-bold tracking-[0.18em] text-[#DFBA73] uppercase transition-[opacity,transform] duration-700 ease-out',
                      active
                        ? 'translate-y-0 opacity-100 delay-300'
                        : 'translate-y-[1rem] opacity-0',
                    )}
                  >
                    {getSectorLabel(project.sector)}
                  </span>
                  <h3
                    className={cn(
                      'mt-[1rem] max-w-[42rem] text-[3.25rem] leading-[1.12] font-bold text-white transition-[opacity,transform] duration-700 ease-out xsm:text-[1.875rem]',
                      active
                        ? 'translate-y-0 opacity-100 delay-500'
                        : 'translate-y-[1.5rem] opacity-0',
                    )}
                  >
                    {project.title}
                  </h3>
                </div>
              </article>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* Thanh điều khiển ở đáy */}
      <div className='absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-[1.5rem] px-[4rem] pb-[2.5rem] xsm:px-[1.25rem] xsm:pb-[1.5rem]'>
        <div className='flex flex-1 items-center gap-[0.5rem]'>
          {projects.map((project, index) => (
            <button
              key={project.id}
              type='button'
              aria-label={`Chuyển tới dự án ${index + 1}`}
              aria-current={index === activeIndex}
              onClick={() => swiper?.slideToLoop(index)}
              className='group/bar py-[0.75rem]'
            >
              <span className='relative block h-[0.1875rem] w-[3.5rem] overflow-hidden bg-white/25 transition-colors duration-300 group-hover/bar:bg-white/50 xsm:w-[2.5rem]'>
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

        <div className='flex items-center gap-[1.25rem] xsm:gap-[0.75rem]'>
          <p className='text-[0.875rem] font-semibold tracking-[0.08em] text-white/60 tabular-nums'>
            <span className='text-white'>{pad(activeIndex + 1)}</span> / {pad(projects.length)}
          </p>
          <div className='flex gap-[0.5rem]'>
            <button
              type='button'
              aria-label='Dự án trước'
              onClick={() => swiper?.slidePrev()}
              className={NAV_BUTTON}
            >
              <ChevronLeft className='size-[1.125rem]' />
            </button>
            <button
              type='button'
              aria-label='Dự án tiếp theo'
              onClick={() => swiper?.slideNext()}
              className={NAV_BUTTON}
            >
              <ChevronRight className='size-[1.125rem]' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedSlider
