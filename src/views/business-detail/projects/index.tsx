import { ArrowUpRight } from 'lucide-react'

import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import type { SectorDetail } from '@/views/business-detail/data'

import ProjectCard from './components/card'

const SectorProjects = ({ sector }: { sector: SectorDetail }) => {
  const [featured, ...others] = sector.projects

  return (
    <section
      id='du-an'
      className='scroll-mt-[6rem] bg-[#FAFBFC] px-[3.75rem] py-[6rem] xsm:px-[1.5rem] xsm:py-[3.5rem]'
    >
      <div className='mx-auto max-w-[95rem]'>
        <div
          data-aos='business-rise'
          data-aos-duration='800'
          className='grid grid-cols-[minmax(0,1fr)_auto] items-end gap-[2rem] border-b border-[#E7DCC6] pb-[2rem] xsm:grid-cols-1 xsm:gap-[1.25rem] xsm:pb-[1.5rem]'
        >
          <div>
            <p className='flex items-center gap-[0.75rem] text-[0.75rem] font-bold tracking-[0.2em] text-[#B88E4F] uppercase'>
              <span className='h-px w-[2rem] bg-[#C6A15B]' />
              Dự án tiêu biểu
            </p>
            <h2 className='mt-[1rem] text-[2.5rem] leading-[1.25] font-bold text-[#1A2B48] xsm:text-[1.625rem]'>
              Những dự án tạo nên <span className='text-[#B88E4F]'>giá trị khác biệt</span>
            </h2>
          </div>

          <Link
            href={ROUTES.projects}
            className='group/all flex w-fit items-center gap-[0.875rem] text-[0.8125rem] font-bold tracking-[0.12em] text-[#1A2B48] uppercase'
          >
            Xem tất cả dự án
            <span className='flex size-[2.75rem] items-center justify-center rounded-full border border-[#C6A15B] text-[#B88E4F] transition-colors duration-300 group-hover/all:bg-[#C6A15B] group-hover/all:text-white'>
              <ArrowUpRight className='size-[1.125rem] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/all:rotate-45' />
            </span>
          </Link>
        </div>

        <div className='mt-[2.5rem] grid h-[38rem] grid-cols-12 grid-rows-2 gap-[1.5rem] xsm:mt-[1.75rem] xsm:h-auto xsm:grid-cols-1 xsm:grid-rows-none xsm:gap-[1rem]'>
          {featured ? (
            <ProjectCard
              project={featured}
              index={0}
              featured
              className='col-span-7 row-span-2 xsm:col-span-1 xsm:row-span-1 xsm:aspect-[4/5]'
            />
          ) : null}
          {others.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index + 1}
              className='col-span-5 xsm:col-span-1 xsm:aspect-[16/11]'
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SectorProjects
