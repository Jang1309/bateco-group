'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import ArticleCard from '@/views/news/components/article-card'
import type { NewsArticle } from '@/views/news/data'

import 'swiper/css'

const NAV_BUTTON =
  'flex size-[2.75rem] items-center justify-center rounded-full border border-[#E2E8F0] text-[#1A2B48] transition-colors duration-300 hover:border-[#B5935E] hover:bg-[#B5935E] hover:text-white disabled:pointer-events-none disabled:opacity-40 xsm:size-[2.5rem]'

type RelatedSliderProps = {
  articles: NewsArticle[]
}

const RelatedSlider = ({ articles }: RelatedSliderProps) => {
  const t = useTranslations('News')
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const syncEdges = (instance: SwiperType) =>
    setEdges({ start: instance.isBeginning, end: instance.isEnd })

  return (
    <div className='mt-[2.25rem] xsm:mt-[1.5rem]'>
      <div className='-mx-[0.5rem] overflow-visible px-[0.5rem] pt-[0.5rem] pb-[1.25rem]'>
        <Swiper
          slidesPerView={1.1}
          spaceBetween={20}
          speed={700}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
          onSwiper={(instance) => {
            setSwiper(instance)
            syncEdges(instance)
          }}
          onSlideChange={syncEdges}
          onResize={syncEdges}
          className='!overflow-visible'
        >
          {articles.map((item) => (
            <SwiperSlide
              key={item.id}
              className='!flex !h-auto !overflow-visible'
            >
              <ArticleCard article={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='mt-[2rem] flex justify-end gap-[0.5rem] xsm:mt-[1.25rem]'>
        <button
          type='button'
          aria-label={t('prev')}
          disabled={edges.start}
          onClick={() => swiper?.slidePrev()}
          className={NAV_BUTTON}
        >
          <ChevronLeft className='size-[1.125rem]' />
        </button>
        <button
          type='button'
          aria-label={t('next')}
          disabled={edges.end}
          onClick={() => swiper?.slideNext()}
          className={NAV_BUTTON}
        >
          <ChevronRight className='size-[1.125rem]' />
        </button>
      </div>
    </div>
  )
}

export default RelatedSlider
