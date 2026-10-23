import Image from 'next/image'
import type { ComponentProps } from 'react'

import { Link } from '@/i18n/navigation'

type ProjectCardProps = {
  title: string
  date: string
  image: string
  href: ComponentProps<typeof Link>['href']
  aosDelay?: number
}

const ProjectCard = ({ title, date, image, href, aosDelay = 0 }: ProjectCardProps) => (
  <div
    data-aos='fade-up'
    data-aos-delay={aosDelay}
    className='h-full'
  >
    <Link
      href={href}
      className='group flex h-full flex-col border border-[#EADFC8] bg-white transition-[border-color,box-shadow] duration-300 hover:border-[#C6A15B] hover:shadow-[0_1rem_2.5rem_rgba(153,110,39,0.14)]'
    >
      <div className='relative aspect-[4/3] overflow-hidden bg-[#F5F5F5]'>
        <Image
          src={image}
          alt={title}
          fill
          sizes='(max-width: 639px) 85vw, (max-width: 1023px) 45vw, 30vw'
          className='object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]'
        />
      </div>
      <div className='flex flex-1 flex-col items-center px-[2rem] pt-[1.75rem] pb-[1.5rem] text-center xsm:px-[1rem] xsm:pt-[1.25rem] xsm:pb-[1.25rem]'>
        <h3 className='line-clamp-3 text-pretty text-[1rem] leading-[1.6] font-bold tracking-[0.02em] text-[#1F2A37] uppercase transition-colors duration-300 group-hover:text-[#B88E4F] xsm:text-[0.8125rem] xsm:leading-[1.45] xsm:tracking-normal xsm:normal-case'>
          {title}
        </h3>
        <time className='mt-auto pt-[1.5rem] text-[0.75rem] font-medium tracking-[0.08em] text-[#6B7280] xsm:pt-[1rem] xsm:text-[0.6875rem]'>
          {date}
        </time>
      </div>
    </Link>
  </div>
)

export default ProjectCard
