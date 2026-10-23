'use client'

import Image from 'next/image'
import type { ReactNode } from 'react'

import { InfiniteSlider } from '@/components/shared/infinite-slider'
import { cn } from '@/lib/utils'

const CELL =
  'flex shrink-0 items-center justify-center border-r border-[#EEEEEE] bg-white transition-colors duration-300 hover:bg-[#FBF7EF]'

type LogoRowProps = {
  title: string
  reverse?: boolean
  children: ReactNode
}

export const LogoRow = ({ title, reverse, children }: LogoRowProps) => (
  <div
    data-aos='fade-up'
    className='mt-[3.5rem] xsm:mt-[2.5rem]'
  >
    <h3 className='text-[0.75rem] font-bold tracking-[0.2em] text-[#1A1A1A] uppercase xsm:text-[0.6875rem]'>
      {title}
    </h3>
    <div className='mt-[1.25rem] border-y border-[#EEEEEE] [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] xsm:[mask-image:none]'>
      <InfiniteSlider
        gap={0}
        speed={90}
        speedOnHover={40}
        reverse={reverse}
      >
        {children}
      </InfiniteSlider>
    </div>
  </div>
)

type LogoCellProps = {
  logo: string
  className: string
  imageClassName: string
}

export const LogoCell = ({ logo, className, imageClassName }: LogoCellProps) => (
  <div className={cn(CELL, 'group', className)}>
    <Image
      src={logo}
      alt=''
      width={240}
      height={120}
      className={cn(
        'h-auto w-auto max-w-full object-contain mix-blend-multiply grayscale-[30%] transition-[filter,scale] duration-300 group-hover:scale-[1.05] group-hover:grayscale-0',
        imageClassName,
      )}
    />
  </div>
)
