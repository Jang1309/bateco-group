'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import type { HomepageVisionSlide } from '@/interfaces/homepage.interface'
import { AUTOPLAY_DELAY } from '@/views/homepage/vision/constants'

import 'swiper/css'
import 'swiper/css/effect-fade'

type VisionSliderProps = {
  slides: HomepageVisionSlide[]
}

const VisionSlider = ({ slides }: VisionSliderProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [active, setActive] = useState(0)

  return (
    <div
      data-aos='fade-right'
      className='w-[46%] shrink-0 xsm:w-full'
    >
      <div className='relative pr-[1.25rem] pb-[1.25rem] xsm:pr-[0.75rem] xsm:pb-[0.75rem]'>
        <span
          aria-hidden
          className='absolute top-[1.25rem] right-0 bottom-0 left-[1.25rem] rounded-[1.25rem] border border-[#C6A15B]/70 xsm:top-[0.75rem] xsm:left-[0.75rem]'
        />
        <span
          aria-hidden
          className='absolute -top-[0.6rem] -left-[0.6rem] size-[4.5rem] rounded-tl-[1.5rem] border-t-2 border-l-2 border-[#C6A15B] xsm:size-[2.5rem]'
        />

        <div className='group relative overflow-hidden rounded-[1.25rem] bg-[#0B1A33] shadow-[0_1.5rem_3.5rem_rgba(16,40,72,0.28)]'>
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect='fade'
            fadeEffect={{ crossFade: true }}
            speed={900}
            loop={slides.length > 1}
            autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
            onSwiper={setSwiper}
            onSlideChange={(instance) => setActive(instance.realIndex)}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className='relative aspect-[4/3] overflow-hidden'>
                  {slide.image ? (
                    <Image
                      src={slide.image}
                      alt={slide.title || ''}
                      fill
                      priority={index === 0}
                      sizes='(max-width: 639px) 92vw, 42vw'
                      className={`object-cover transition-transform duration-[6000ms] ease-out ${active === index ? 'scale-[1.08]' : 'scale-100'}`}
                    />
                  ) : null}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[45%] bg-[linear-gradient(180deg,transparent_0%,rgba(5,10,20,0.55)_55%,rgba(5,10,20,0.85)_100%)]' />

          <div className='absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-[1rem] px-[1.5rem] pb-[1.25rem] xsm:px-[1rem] xsm:pb-[0.9rem]'>
            <div className='min-w-0'>
              <p className='flex items-baseline gap-[0.35rem] font-bold text-[#E4C36A]'>
                <span className='text-[1.75rem] leading-none xsm:text-[1.25rem]'>
                  {String(active + 1).padStart(2, '0')}
                </span>
                <span className='text-[0.85rem] text-white/60'>
                  / {String(slides.length).padStart(2, '0')}
                </span>
              </p>
              {slides[active]?.title ? (
                <p
                  key={active}
                  className='mt-[0.4rem] animate-in truncate text-[1rem] font-semibold tracking-[0.03em] text-white uppercase duration-700 fade-in slide-in-from-bottom-2 xsm:text-[0.8rem]'
                >
                  {slides[active].title}
                </p>
              ) : null}
              <div className='mt-[0.75rem] flex gap-[0.4rem]'>
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type='button'
                    aria-label={`Ảnh ${index + 1}`}
                    onClick={() => swiper?.slideToLoop(index)}
                    className={`relative h-[0.2rem] overflow-hidden rounded-full transition-all duration-500 ${active === index ? 'w-[2.75rem] bg-[#C6A15B]/45' : 'w-[1rem] bg-white/35 hover:bg-white/70'}`}
                  >
                    {active === index ? (
                      <span
                        key={active}
                        className='absolute inset-y-0 left-0 rounded-full bg-[#F2C96B]'
                        style={{
                          animation: `vision-progress ${AUTOPLAY_DELAY}ms linear forwards`,
                        }}
                      />
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            <div className='flex shrink-0 gap-[0.5rem]'>
              <button
                type='button'
                aria-label='Ảnh trước'
                onClick={() => swiper?.slidePrev()}
                className='flex size-[2.6rem] cursor-pointer items-center justify-center rounded-full border border-[#C6A15B]/80 bg-[#0B1A33]/40 text-[#E4C36A] backdrop-blur-sm transition-colors hover:bg-[#C6A15B] hover:text-[#0B1A33] xsm:size-[2.1rem]'
              >
                <ChevronLeft className='size-[1.1rem]' />
              </button>
              <button
                type='button'
                aria-label='Ảnh tiếp theo'
                onClick={() => swiper?.slideNext()}
                className='flex size-[2.6rem] cursor-pointer items-center justify-center rounded-full border border-[#C6A15B]/80 bg-[#0B1A33]/40 text-[#E4C36A] backdrop-blur-sm transition-colors hover:bg-[#C6A15B] hover:text-[#0B1A33] xsm:size-[2.1rem]'
              >
                <ChevronRight className='size-[1.1rem]' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisionSlider
