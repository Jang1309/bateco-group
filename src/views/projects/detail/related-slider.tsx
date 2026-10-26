'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import ProjectCard from '@/views/projects/listing/components/project-card'
import type { ProjectCardModel } from '@/views/projects/map-project'

import 'swiper/css'

const NAV_BUTTON =
  'flex size-[2.75rem] items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#1A2B48] transition-colors duration-300 hover:border-[#B5935E] hover:bg-[#B5935E] hover:text-white disabled:pointer-events-none disabled:opacity-40 xsm:size-[2.5rem]'

type RelatedProjectsSliderProps = {
  projects: ProjectCardModel[]
}

const RelatedProjectsSlider = ({ projects }: RelatedProjectsSliderProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const syncEdges = (instance: SwiperType) =>
    setEdges({ start: instance.isBeginning, end: instance.isEnd })

  if (projects.length === 0) return null

  return (
    <div className='mt-[2.5rem] xsm:mt-[1.5rem]'>
      <Swiper
        slidesPerView={1.15}
        spaceBetween={16}
        speed={700}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 28 },
        }}
        onSwiper={(instance) => {
          setSwiper(instance)
          syncEdges(instance)
        }}
        onSlideChange={syncEdges}
        onResize={syncEdges}
        className='!overflow-visible xsm:!overflow-hidden'
      >
        {projects.map((project, index) => (
          <SwiperSlide
            key={project.id}
            className='!h-auto'
          >
            <ProjectCard
              project={project}
              number={index + 1}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {projects.length > 1 ? (
        <div className='mt-[2rem] flex justify-end gap-[0.5rem] xsm:mt-[1.25rem]'>
          <button
            type='button'
            aria-label='Dự án trước'
            disabled={edges.start}
            onClick={() => swiper?.slidePrev()}
            className={NAV_BUTTON}
          >
            <ChevronLeft className='size-[1.125rem]' />
          </button>
          <button
            type='button'
            aria-label='Dự án tiếp theo'
            disabled={edges.end}
            onClick={() => swiper?.slideNext()}
            className={NAV_BUTTON}
          >
            <ChevronRight className='size-[1.125rem]' />
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default RelatedProjectsSlider
