import { ArrowUpRight, MapPin } from 'lucide-react'
import Image from 'next/image'
import type { ComponentProps } from 'react'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export type SectorProjectCard = {
  title: string
  category?: string
  location?: string
  image: string
  href: ComponentProps<typeof Link>['href']
}

type ProjectCardProps = {
  project: SectorProjectCard
  index: number
  featured?: boolean
  className?: string
}

const ProjectCard = ({ project, index, featured, className }: ProjectCardProps) => (
  <div
    data-aos='business-rise'
    data-aos-duration='800'
    data-aos-delay={index * 120}
    className={className}
  >
    {/* Desktop: overlay cinematic */}
    <Link
      href={project.href}
      prefetch={false}
      className='group relative flex h-full overflow-hidden bg-[#0F1C33] xsm:hidden'
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        unoptimized={project.image.startsWith('http')}
        sizes={featured ? '55vw' : '40vw'}
        className='object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]'
      />
      <div
        aria-hidden
        className='absolute inset-0 bg-[linear-gradient(180deg,rgba(10,22,44,0.45)_0%,rgba(10,22,44,0)_22%,rgba(10,22,44,0)_35%,rgba(10,22,44,0.55)_65%,rgba(10,22,44,0.92)_100%)] transition-opacity duration-500 group-hover:opacity-90'
      />

      <span className='absolute top-[1.5rem] left-[1.5rem] text-[0.8125rem] font-bold tracking-[0.12em] text-white/90'>
        {String(index + 1).padStart(2, '0')}
        <span className='ml-[0.5rem] inline-block h-px w-[1.5rem] translate-y-[-0.25rem] bg-[#DFBA73]' />
      </span>

      <span className='absolute top-[1.25rem] right-[1.25rem] flex size-[2.75rem] items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-[background-color,rotate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 group-hover:bg-[#C39A5A]'>
        <ArrowUpRight className='size-[1.125rem]' />
      </span>

      <div className={cn('relative mt-auto w-full', featured ? 'p-[2.5rem]' : 'p-[1.75rem]')}>
        {project.category ? (
          <p className='text-[0.6875rem] font-bold tracking-[0.18em] text-[#DFBA73] uppercase'>
            {project.category}
          </p>
        ) : null}
        <h3
          className={cn(
            'font-bold text-white',
            project.category ? 'mt-[0.625rem]' : '',
            featured ? 'max-w-[30rem] text-[2rem] leading-[1.25]' : 'text-[1.375rem] leading-[1.3]',
          )}
        >
          {project.title}
        </h3>
        {project.location ? (
          <p className='mt-[0.875rem] flex items-center gap-[0.375rem] text-[0.8125rem] font-medium text-white/75'>
            <MapPin className='size-[0.9375rem] shrink-0 text-[#DFBA73]' />
            {project.location}
          </p>
        ) : null}
      </div>

      <span
        aria-hidden
        className='absolute inset-x-0 bottom-0 h-[0.1875rem] origin-left scale-x-0 bg-[linear-gradient(90deg,#DFBA73,#996E27)] transition-transform duration-500 ease-out group-hover:scale-x-100'
      />
    </Link>

    {/* Mobile: ảnh + panel chữ tách — title chỉ 2 dòng */}
    <Link
      href={project.href}
      prefetch={false}
      className={cn(
        'group hidden overflow-hidden border border-[#EADFC8] bg-white xsm:block',
        'transition-[border-color,box-shadow] duration-300 hover:border-[#C6A15B] hover:shadow-[0_0.75rem_1.75rem_rgba(153,110,39,0.12)]',
      )}
    >
      <div className='relative aspect-[16/10] overflow-hidden bg-[#0F1C33]'>
        <Image
          src={project.image}
          alt={project.title}
          fill
          unoptimized={project.image.startsWith('http')}
          sizes='92vw'
          className='object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]'
        />
        <span className='absolute top-[0.875rem] left-[0.875rem] text-[0.75rem] font-bold tracking-[0.12em] text-white'>
          {String(index + 1).padStart(2, '0')}
          <span className='ml-[0.375rem] inline-block h-px w-[1.25rem] translate-y-[-0.2rem] bg-[#DFBA73]' />
        </span>
        <span className='absolute top-[0.75rem] right-[0.75rem] flex size-[2rem] items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm'>
          <ArrowUpRight className='size-[0.9375rem]' />
        </span>
      </div>

      <div className='px-[1rem] pt-[1rem] pb-[1.125rem]'>
        {project.category ? (
          <p className='line-clamp-1 text-[0.625rem] font-bold tracking-[0.14em] text-[#B88E4F] uppercase'>
            {project.category}
          </p>
        ) : null}
        <h3
          className={cn(
            'line-clamp-2 text-[0.9375rem] leading-[1.4] font-bold text-[#1A2B48] normal-case transition-colors duration-300 group-hover:text-[#B88E4F]',
            project.category ? 'mt-[0.375rem]' : '',
          )}
        >
          {project.title}
        </h3>
        {project.location ? (
          <p className='mt-[0.5rem] flex items-center gap-[0.25rem] text-[0.75rem] text-[#64748B]'>
            <MapPin className='size-[0.8125rem] shrink-0 text-[#B88E4F]' />
            <span className='line-clamp-1'>{project.location}</span>
          </p>
        ) : null}
      </div>
    </Link>
  </div>
)

export default ProjectCard
