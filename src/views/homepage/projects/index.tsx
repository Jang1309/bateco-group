'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

import { PROJECTS } from './data'

import 'swiper/css'

// Nút nổi 2 bên slider, căn giữa theo chiều cao card
const NAV_BUTTON =
  'absolute top-1/2 z-10 flex size-[3rem] -translate-y-1/2 items-center justify-center rounded-full border border-[#C6A15B] bg-white text-[#B88E4F] shadow-[0_0.5rem_1.25rem_rgba(153,110,39,0.2)] transition-[background-color,color,opacity] duration-300 hover:bg-[#C6A15B] hover:text-white disabled:pointer-events-none disabled:opacity-0 xsm:size-[2.5rem]'

const Projects = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  const syncEdge = (instance: SwiperType) =>
    setEdge({ start: instance.isBeginning, end: instance.isEnd })

  return (
    <section className='bg-white px-[3.125rem] py-[5rem] xsm:px-[1.5rem] xsm:py-[3rem]'>
      <div className='mx-auto max-w-[95rem]'>
        <div
          data-aos='fade-up'
          className='flex items-end justify-between gap-[1rem] border-b border-[#EEEEEE] pb-[1rem]'
        >
          <h2 className='text-[2.75rem] leading-[1.2] font-light tracking-[0.04em] text-[#1F2A37] uppercase xsm:text-[1.6rem]'>
            Dự án tiêu biểu
          </h2>

          <Link
            href={ROUTES.projects}
            className='flex items-center gap-[0.5rem] text-[0.8125rem] font-semibold tracking-[0.12em] text-[#B88E4F] uppercase transition-opacity hover:opacity-80 xsm:text-[0.7rem]'
          >
            Xem tất cả
            <Image
              src='/home/news/arrow.svg'
              alt=''
              width={16}
              height={16}
              className='size-[1.25rem]'
            />
          </Link>
        </div>

        <div className='relative mt-[2.5rem] xsm:mt-[1.5rem]'>
          <button
            type='button'
            aria-label='Dự án trước'
            disabled={edge.start}
            onClick={() => swiper?.slidePrev()}
            className={cn(NAV_BUTTON, 'left-0 -translate-x-1/2')}
          >
            <ChevronLeft className='size-[1.25rem]' />
          </button>
          <button
            type='button'
            aria-label='Dự án tiếp theo'
            disabled={edge.end}
            onClick={() => swiper?.slideNext()}
            className={cn(NAV_BUTTON, 'right-0 translate-x-1/2')}
          >
            <ChevronRight className='size-[1.25rem]' />
          </button>

          <Swiper
            slidesPerView={1.15}
            spaceBetween={16}
            speed={600}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            onSwiper={(instance) => {
              setSwiper(instance)
              syncEdge(instance)
            }}
            onSlideChange={syncEdge}
            onResize={syncEdge}
            className='!pb-[0.5rem]'
          >
            {PROJECTS.map((project, index) => (
              <SwiperSlide
                key={project.title}
                className='!h-auto'
              >
                {/* Bọc ngoài để AOS không đè transition hover của card; các card hiện lần lượt */}
                <div
                  data-aos='fade-up'
                  data-aos-delay={Math.min(index, 2) * 150}
                  className='h-full'
                >
                  <Link
                    href={project.href}
                    className='group flex h-full flex-col border border-[#EADFC8] bg-white transition-[border-color,box-shadow] duration-300 hover:border-[#C6A15B] hover:shadow-[0_1rem_2.5rem_rgba(153,110,39,0.14)]'
                  >
                    <div className='relative aspect-[4/3] overflow-hidden bg-[#F5F5F5]'>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes='(max-width: 639px) 85vw, (max-width: 1023px) 45vw, 30vw'
                        className='object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]'
                      />
                    </div>
                    <div className='flex flex-1 flex-col items-center px-[2rem] pt-[1.75rem] pb-[1.5rem] text-center xsm:px-[1.25rem]'>
                      <h3 className='line-clamp-3 text-[1rem] leading-[1.6] font-bold tracking-[0.02em] text-[#1F2A37] uppercase transition-colors duration-300 group-hover:text-[#B88E4F]'>
                        {project.title}
                      </h3>
                      <time className='mt-auto pt-[1.5rem] text-[0.75rem] font-medium tracking-[0.08em] text-[#6B7280]'>
                        {project.date}
                      </time>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default Projects
