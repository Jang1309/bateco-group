'use client'

import { Send } from 'lucide-react'
import { useState } from 'react'

import DrawerProvider from '@/components/providers/drawer-provider'
import ApplyForm from '@/views/careers/detail/apply-form'

type ApplySectionProps = {
  jobTitle: string
}

const ApplySection = ({ jobTitle }: ApplySectionProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop / tablet: form sticky cạnh nội dung */}
      <aside className='self-start lg:sticky lg:top-[7rem] xsm:hidden'>
        <ApplyForm jobTitle={jobTitle} />
      </aside>

      {/* Mobile: CTA sticky đáy màn hình */}
      <div className='pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden p-[1rem] pb-[max(1rem,env(safe-area-inset-bottom))] xsm:block'>
        <button
          type='button'
          aria-haspopup='dialog'
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className='pointer-events-auto inline-flex h-[3.25rem] w-full items-center justify-center gap-[0.5rem] rounded-[0.75rem] bg-[#1A2B48] text-[0.9375rem] font-bold text-white shadow-[0_-0.5rem_2rem_rgba(26,43,72,0.22)] transition-colors duration-300 hover:bg-[#243656]'
        >
          <Send
            className='size-[1rem]'
            strokeWidth={1.75}
          />
          Ứng tuyển ngay
        </button>
      </div>

      <DrawerProvider
        open={open}
        setOpen={setOpen}
        className='max-h-[92vh] overflow-hidden pb-[max(0.5rem,env(safe-area-inset-bottom))]'
      >
        <div className='flex max-h-[calc(92vh-1.5rem)] flex-col overflow-hidden px-[1.25rem] pt-[0.5rem]'>
          <p className='shrink-0 text-[1.125rem] font-bold text-[#1A2B48]'>Ứng tuyển ngay</p>
          <p className='mt-[0.25rem] line-clamp-2 shrink-0 text-[0.8125rem] leading-[1.5] text-[#64748B]'>
            {jobTitle}
          </p>
          <div className='mt-[1rem] min-h-0 flex-1 overflow-y-auto pb-[0.5rem]'>
            <ApplyForm
              jobTitle={jobTitle}
              variant='drawer'
              onSuccess={() => setOpen(false)}
            />
          </div>
        </div>
      </DrawerProvider>
    </>
  )
}

export default ApplySection
