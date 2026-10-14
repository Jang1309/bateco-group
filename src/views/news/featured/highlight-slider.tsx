'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { cn } from '@/lib/utils'
import { getCategoryTitle, type NewsArticle } from '@/views/news/data'

import 'swiper/css'

const NAV_BUTTON =
  'absolute top-1/2 z-10 flex size-[2.5rem] -translate-y-1/2 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#1A2B48] shadow-[0_0.25rem_0.75rem_rgba(15,28,51,0.08)] transition-colors duration-300 hover:border-[#1A2B48] hover:bg-[#1A2B48] hover:text-white disabled:pointer-events-none disabled:opacity-0 xsm:hidden'

type HighlightSliderProps = {
  articles: NewsArticle[]
}

const HighlightSlider = ({ articles }: HighlightSliderProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  const syncEdge = (instance: SwiperType) =>
    setEdge({ start: instance.isBeginning, end: instance.isEnd })

  return (
    <div className='relative'>
      <button
        type='button'
        aria-label='Tin trước'
        disabled={edge.start}
        onClick={() => swiper?.slidePrev()}
        className={cn(NAV_BUTTON, 'left-0 -translate-x-1/2')}
      >
        <ChevronLeft className='size-[1.125rem]' />
      </button>
      <button
        type='button'
        aria-label='Tin tiếp theo'
        disabled={edge.end}
        onClick={() => swiper?.slideNext()}
        className={cn(NAV_BUTTON, 'right-0 translate-x-1/2')}
      >
        <ChevronRight className='size-[1.125rem]' />
      </button>

      <Swiper
        slidesPerView={1.1}
        spaceBetween={12}
        speed={600}
        breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 24 } }}
        onSwiper={(instance) => {
          setSwiper(instance)
          syncEdge(instance)
        }}
        onSlideChange={syncEdge}
        onResize={syncEdge}
      >
        {articles.map((article) => (
          <SwiperSlide
            key={article.id}
            className='!h-auto'
          >
            <a
              href={article.href}
              className='group flex h-full gap-[1.25rem] rounded-[0.75rem] border border-[#EEF1F5] bg-white p-[1rem] transition-[border-color,box-shadow] duration-300 hover:border-[#E5D6B8] hover:shadow-[0_0.75rem_2rem_rgba(15,28,51,0.08)] xsm:gap-[0.875rem] xsm:p-[0.75rem]'
            >
              <div className='relative aspect-[4/3] w-[11rem] shrink-0 overflow-hidden rounded-[0.5rem] xsm:w-[7.5rem]'>
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes='(max-width: 639px) 7.5rem, 11rem'
                  className='object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]'
                />
              </div>
              <div className='flex min-w-0 flex-col py-[0.25rem]'>
                <h3 className='line-clamp-2 text-[1rem] leading-[1.45] font-bold text-[#1A2B48] transition-colors duration-300 group-hover:text-[#B5935E] xsm:text-[0.9375rem]'>
                  {article.title}
                </h3>
                <p className='mt-[0.375rem] line-clamp-2 text-[0.8125rem] leading-[1.55] text-[#64748B] xsm:hidden'>
                  {article.excerpt}
                </p>
                <p className='mt-auto flex flex-wrap items-center gap-x-[0.5rem] pt-[0.5rem] text-[0.6875rem] font-bold tracking-[0.06em] uppercase'>
                  <span className='text-[#B5935E]'>{getCategoryTitle(article.category)}</span>
                  <time className='font-semibold tracking-normal text-[#94A3B8]'>
                    {article.date}
                  </time>
                </p>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HighlightSlider
