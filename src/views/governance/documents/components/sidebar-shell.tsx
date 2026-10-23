'use client'

import { ChevronDown } from 'lucide-react'
import { type ReactNode, useState } from 'react'

import DrawerProvider from '@/components/providers/drawer-provider'

type SidebarShellProps = {
  title: string
  activeTitle: string
  children: ReactNode
}

/** Desktop: danh mục luôn hiện. Mobile: nút mở DrawerProvider. */
const SidebarShell = ({ title, activeTitle, children }: SidebarShellProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <h2 className='border-b border-[#EEF1F5] pb-[1rem] text-[1rem] font-bold tracking-[0.04em] text-[#1A2B48] uppercase xsm:hidden'>
        <span className='border-l-[0.1875rem] border-[#B5935E] pl-[0.75rem]'>{title}</span>
      </h2>

      <div className='mt-[1rem] xsm:hidden'>{children}</div>

      <button
        type='button'
        aria-haspopup='dialog'
        aria-expanded={open}
        onClick={() => setOpen(true)}
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
          <ChevronDown className='size-[1.125rem]' />
        </span>
      </button>

      <DrawerProvider
        open={open}
        setOpen={setOpen}
        className='pb-[max(1.5rem,env(safe-area-inset-bottom))]'
      >
        <div className='px-[1.25rem] pt-[1rem]'>
          <p className='text-[1.125rem] font-bold text-[#1A2B48]'>{title}</p>
          <div className='mt-[0.75rem] max-h-[70vh] overflow-y-auto pb-[0.5rem]'>{children}</div>
        </div>
      </DrawerProvider>
    </>
  )
}

export default SidebarShell
