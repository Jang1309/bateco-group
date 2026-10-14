'use client'

import { ChevronDown } from 'lucide-react'
import { type ReactNode, useId, useState } from 'react'

import { cn } from '@/lib/utils'

type SidebarShellProps = {
  title: string
  activeTitle: string
  children: ReactNode
}

/** Desktop: luôn hiện danh mục. Mobile: thu gọn thành nút chọn, bấm để mở danh mục. */
const SidebarShell = ({ title, activeTitle, children }: SidebarShellProps) => {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <>
      <h2 className='border-b border-[#EEF1F5] pb-[1rem] text-[1rem] font-bold tracking-[0.04em] text-[#1A2B48] uppercase xsm:hidden'>
        <span className='border-l-[0.1875rem] border-[#B5935E] pl-[0.75rem]'>{title}</span>
      </h2>

      <button
        type='button'
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className='hidden w-full items-center gap-[0.75rem] text-left xsm:flex'
      >
        <span className='flex-1 border-l-[0.1875rem] border-[#B5935E] pl-[0.75rem]'>
          <span className='block text-[0.6875rem] font-bold tracking-[0.12em] text-[#94A3B8] uppercase'>
            {title}
          </span>
          <span className='mt-[0.125rem] block text-[1rem] font-bold text-[#0F5A3C]'>
            {activeTitle}
          </span>
        </span>
        <span className='flex size-[2.25rem] shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] text-[#1A2B48]'>
          <ChevronDown
            className={cn(
              'size-[1.125rem] transition-transform duration-300',
              open && 'rotate-180',
            )}
          />
        </span>
      </button>

      <div
        id={panelId}
        className={cn(
          'mt-[1rem] xsm:mt-[0.75rem] xsm:border-t xsm:border-[#EEF1F5] xsm:pt-[0.75rem]',
          !open && 'xsm:hidden',
        )}
      >
        {children}
      </div>
    </>
  )
}

export default SidebarShell
