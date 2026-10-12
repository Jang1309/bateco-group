import { ArrowUpRight, MapPin } from 'lucide-react'
import Image from 'next/image'

import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import type { SectorProject } from '@/views/business-detail/data'

type ProjectCardProps = {
  project: SectorProject
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
    <Link
      href={ROUTES.projects}
      className='group relative flex h-full overflow-hidden bg-[#0F1C33]'
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes={featured ? '(max-width: 639px) 92vw, 55vw' : '(max-width: 639px) 92vw, 40vw'}
        className='object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]'
      />
      <div
        aria-hidden
        className='absolute inset-0 bg-[linear-gradient(180deg,rgba(10,22,44,0.45)_0%,rgba(10,22,44,0)_22%,rgba(10,22,44,0)_35%,rgba(10,22,44,0.55)_65%,rgba(10,22,44,0.92)_100%)] transition-opacity duration-500 group-hover:opacity-90'
      />

      <span className='absolute top-[1.5rem] left-[1.5rem] text-[0.8125rem] font-bold tracking-[0.12em] text-white/90 xsm:top-[1rem] xsm:left-[1rem]'>
        {String(index + 1).padStart(2, '0')}
        <span className='ml-[0.5rem] inline-block h-px w-[1.5rem] translate-y-[-0.25rem] bg-[#DFBA73]' />
      </span>

      <span className='absolute top-[1.25rem] right-[1.25rem] flex size-[2.75rem] items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-[background-color,rotate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 group-hover:bg-[#C39A5A] xsm:top-[0.75rem] xsm:right-[0.75rem] xsm:size-[2.25rem]'>
        <ArrowUpRight className='size-[1.125rem]' />
      </span>

      <div
        className={cn(
          'relative mt-auto w-full',
          featured ? 'p-[2.5rem] xsm:p-[1.5rem]' : 'p-[1.75rem] xsm:p-[1.25rem]',
        )}
      >
        <p className='text-[0.6875rem] font-bold tracking-[0.18em] text-[#DFBA73] uppercase'>
          {project.category}
        </p>
        <h3
          className={cn(
            'mt-[0.625rem] font-bold text-white',
            featured
              ? 'max-w-[30rem] text-[2rem] leading-[1.25] xsm:text-[1.5rem]'
              : 'text-[1.375rem] leading-[1.3] xsm:text-[1.125rem]',
          )}
        >
          {project.title}
        </h3>
        <p className='mt-[0.875rem] flex items-center gap-[0.375rem] text-[0.8125rem] font-medium text-white/75'>
          <MapPin className='size-[0.9375rem] text-[#DFBA73]' />
          {project.location}
        </p>
      </div>

      <span
        aria-hidden
        className='absolute inset-x-0 bottom-0 h-[0.1875rem] origin-left scale-x-0 bg-[linear-gradient(90deg,#DFBA73,#996E27)] transition-transform duration-500 ease-out group-hover:scale-x-100'
      />
    </Link>
  </div>
)

export default ProjectCard
