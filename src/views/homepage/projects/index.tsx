'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState, type ComponentProps } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import type { ProjectListItem, ProjectsResponse } from '@/interfaces/projects.interface'
import { cn } from '@/lib/utils'
import ProjectCard from '@/views/homepage/projects/components/project-card'

import 'swiper/css'

const FALLBACK_IMAGE = '/home/news/card-1.jpg'

const NAV_BUTTON =
  'absolute top-1/2 z-10 flex size-[3rem] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#C6A15B] bg-white text-[#B88E4F] shadow-[0_0.5rem_1.25rem_rgba(153,110,39,0.2)] transition-[background-color,color,opacity] duration-300 hover:bg-[#C6A15B] hover:text-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-0 xsm:hidden'

const formatProjectDate = (value?: string) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}.${month}.${date.getFullYear()}`
}

const projectHref = (project: ProjectListItem): ComponentProps<typeof Link>['href'] => {
  const slug = project.slug || (project.id != null ? String(project.id) : '')
  if (!slug) return ROUTES.projects
  return { pathname: '/du-an/[slug]' as const, params: { slug } }
}

const Projects = ({ projects }: { projects?: ProjectsResponse }) => {
  const items =
    projects
      ?.map((project) => {
        if (!project.title && !project.slug) return null
        return {
          title: project.title || '',
          date: formatProjectDate(project.published),
          image: project.thumbnail?.url || FALLBACK_IMAGE,
          href: projectHref(project),
        }
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item)) || []

  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  const syncEdge = (instance: SwiperType) =>
    setEdge({ start: instance.isBeginning, end: instance.isEnd })

  if (!items.length) return null

  return (
    <section className='bg-white px-[3.125rem] py-[5rem] xsm:px-[1.5rem] xsm:py-[3rem]'>
      <div className='mx-auto max-w-[95rem]'>
        <div
          data-aos='fade-up'
          className='flex items-center justify-between gap-[0.75rem] border-b border-[#EEEEEE] pb-[1rem]'
        >
          <h2 className='min-w-0 text-pretty text-[2.75rem] leading-[1.2] font-light tracking-[0.04em] text-[#1F2A37] uppercase xsm:text-[1.25rem] xsm:leading-[1.3] xsm:tracking-[0.02em]'>
            Dự án tiêu biểu
          </h2>

          <Link
            href={ROUTES.projects}
            className='flex shrink-0 items-center gap-[0.5rem] text-[0.8125rem] font-semibold tracking-[0.12em] text-[#B88E4F] uppercase transition-opacity hover:opacity-80 xsm:gap-[0.25rem] xsm:text-[0.625rem] xsm:tracking-[0.06em]'
          >
            Xem tất cả
            <Image
              src='/home/news/arrow.svg'
              alt=''
              width={16}
              height={16}
              className='size-[1.25rem] xsm:size-[1rem]'
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
            {items.map((project, index) => (
              <SwiperSlide
                key={index}
                className='!h-auto'
              >
                <ProjectCard
                  title={project.title}
                  date={project.date}
                  image={project.image}
                  href={project.href}
                  aosDelay={Math.min(index, 2) * 150}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default Projects
