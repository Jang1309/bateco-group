'use client'

import Image from 'next/image'
import { useLocale } from 'next-intl'

import { hrefFor } from '@/configs/routes'
import { Link, toAppHref } from '@/i18n/navigation'
import type { ProjectCardModel } from '@/views/projects/map-project'

type ProjectCardProps = {
  project: ProjectCardModel
  number: number
}

const ProjectCard = ({ project, number }: ProjectCardProps) => {
  const locale = useLocale()

  return (
    <Link
      href={toAppHref(hrefFor('projectDetail', locale, { slug: project.slug }))}
      className='group relative block aspect-[3/4] overflow-hidden rounded-[0.75rem] bg-[#0F1C33] shadow-[0_0.75rem_2rem_rgba(15,28,51,0.12)] xsm:aspect-[4/5] xsm:rounded-[0.5rem]'
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        unoptimized
        sizes='(max-width: 639px) 92vw, 30vw'
        className='object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]'
      />
      <div
        aria-hidden
        className='absolute inset-0 bg-[linear-gradient(180deg,rgba(15,28,51,0)_35%,rgba(15,28,51,0.65)_65%,rgba(15,28,51,0.95)_100%)]'
      />
      <div
        aria-hidden
        className='absolute inset-0 bg-[#1E3A6E]/25 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0'
      />

      <div className='absolute inset-x-0 bottom-0 p-[1.75rem] xsm:p-[1.25rem]'>
        <p
          aria-hidden
          className='text-[4.5rem] leading-none font-bold text-white/25 transition-colors duration-500 group-hover:text-white/40 xsm:text-[3.5rem]'
        >
          {String(number).padStart(2, '0')}.
        </p>
        {project.sectorLabel ? (
          <p className='mt-[0.75rem] text-[0.6875rem] font-bold tracking-[0.12em] text-[#DFBA73] uppercase xsm:mt-[0.5rem] xsm:text-[0.625rem]'>
            {project.sectorLabel}
          </p>
        ) : null}
        <h3 className='mt-[0.375rem] line-clamp-2 text-[1.5rem] leading-[1.3] font-bold text-white xsm:text-[1.25rem]'>
          {project.title}
        </h3>
        <span
          aria-hidden
          className='mt-[1rem] block h-[0.125rem] w-[2rem] bg-[#C6A15B] transition-[width] duration-500 ease-out group-hover:w-[4rem] xsm:mt-[0.75rem]'
        />
      </div>
    </Link>
  )
}

export default ProjectCard
