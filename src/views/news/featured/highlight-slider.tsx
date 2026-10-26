'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { resolveCategoryTitle, type NewsArticle } from '@/views/news/data'

import 'swiper/css'

const NAV_BUTTON =
  'absolute top-1/2 z-10 flex size-[2.5rem] -translate-y-1/2 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#1A2B48] shadow-[0_0.5rem_1rem_-0.25rem_rgba(26,43,72,0.18)] transition-[background-color,border-color,color,opacity,scale] duration-300 hover:border-[#1A2B48] hover:bg-[#1A2B48] hover:text-white active:scale-[0.94] disabled:pointer-events-none disabled:opacity-0 outline-none focus-visible:ring-2 focus-visible:ring-[#B5935E] focus-visible:ring-offset-2 xsm:hidden'

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
        {articles.map((article) => {
          const categoryTitle = resolveCategoryTitle(article)

          return (
            <SwiperSlide
              key={article.id}
              className='!h-auto'
            >
              <Link
                href={{ pathname: '/tin-tuc/[slug]', params: { slug: article.id } }}
                className='group flex h-full gap-[1.25rem] rounded-[0.875rem] border border-[#1A2B48]/[0.07] bg-white p-[1rem] outline-none transition-[border-color] duration-300 hover:border-[#B5935E]/40 focus-visible:ring-2 focus-visible:ring-[#B5935E] focus-visible:ring-inset xsm:gap-[0.875rem] xsm:p-[0.75rem]'
              >
                <div className='relative aspect-[4/3] w-[11rem] shrink-0 overflow-hidden rounded-[0.5rem] xsm:w-[7.5rem]'>
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    unoptimized
                    sizes='(max-width: 639px) 7.5rem, 11rem'
                    className='object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]'
                  />
                </div>
                <div className='flex min-w-0 flex-col py-[0.25rem]'>
                  <h3 className='line-clamp-2 text-[1rem] leading-[1.45] font-bold text-pretty text-[#1A2B48] transition-colors duration-300 group-hover:text-[#B5935E] xsm:text-[0.9375rem]'>
                    {article.title}
                  </h3>
                  {article.excerpt ? (
                    <p className='mt-[0.375rem] line-clamp-2 text-[0.8125rem] leading-[1.55] text-[#64748B] xsm:hidden'>
                      {article.excerpt}
                    </p>
                  ) : null}
                  <p className='mt-auto flex flex-wrap items-center gap-x-[0.5rem] pt-[0.5rem] text-[0.6875rem] font-bold tracking-[0.06em] uppercase'>
                    {categoryTitle ? <span className='text-[#B5935E]'>{categoryTitle}</span> : null}
                    {article.date ? (
                      <time className='font-semibold tracking-normal text-[#94A3B8] tabular-nums'>
                        {article.date}
                      </time>
                    ) : null}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default HighlightSlider
