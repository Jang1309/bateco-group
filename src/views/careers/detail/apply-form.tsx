'use client'

import { CloudUpload, Send } from 'lucide-react'
import { useRef, useState } from 'react'

import { cn } from '@/lib/utils'

type ApplyFormProps = {
  jobTitle: string
}

const FIELD =
  'h-[2.875rem] w-full rounded-[0.5rem] border border-[#E2E8F0] bg-white px-[0.875rem] text-[0.875rem] text-[#1A2B48] outline-none transition-colors duration-300 placeholder:text-[#94A3B8] focus:border-[#B5935E]'

const ApplyForm = ({ jobTitle }: ApplyFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState('')
  const [dragging, setDragging] = useState(false)

  return (
    <form
      className='rounded-[1rem] bg-white p-[1.75rem] shadow-[0_1rem_2.5rem_-1.25rem_rgba(26,43,72,0.2)] ring-1 ring-[#1A2B48]/[0.06] xsm:p-[1.25rem]'
      onSubmit={(event) => {
        event.preventDefault()
        // TODO: nối API nộp hồ sơ
      }}
    >
      <h2 className='text-[1.25rem] font-bold text-[#1A2B48]'>Ứng tuyển ngay</h2>
      <p className='mt-[0.375rem] line-clamp-2 text-[0.8125rem] leading-[1.5] text-[#64748B]'>
        {jobTitle}
      </p>

      <div className='mt-[1.5rem] space-y-[1rem]'>
        <label className='block'>
          <span className='mb-[0.375rem] block text-[0.8125rem] font-semibold text-[#1A2B48]'>
            Họ và tên
          </span>
          <input
            required
            name='name'
            type='text'
            autoComplete='name'
            placeholder='Nguyễn Văn A'
            className={FIELD}
          />
        </label>

        <div className='grid grid-cols-2 gap-[0.75rem] xsm:grid-cols-1'>
          <label className='block'>
            <span className='mb-[0.375rem] block text-[0.8125rem] font-semibold text-[#1A2B48]'>
              Email
            </span>
            <input
              required
              name='email'
              type='email'
              autoComplete='email'
              placeholder='email@example.com'
              className={FIELD}
            />
          </label>
          <label className='block'>
            <span className='mb-[0.375rem] block text-[0.8125rem] font-semibold text-[#1A2B48]'>
              Số điện thoại
            </span>
            <input
              required
              name='phone'
              type='tel'
              autoComplete='tel'
              placeholder='09xx xxx xxx'
              className={FIELD}
            />
          </label>
        </div>

        <div>
          <span className='mb-[0.375rem] block text-[0.8125rem] font-semibold text-[#1A2B48]'>
            Hồ sơ ứng tuyển
          </span>
          <button
            type='button'
            onClick={() => inputRef.current?.click()}
            onDragOver={(event) => {
              event.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault()
              setDragging(false)
              const file = event.dataTransfer.files?.[0]
              if (file) setFileName(file.name)
            }}
            className={cn(
              'flex w-full flex-col items-center gap-[0.5rem] rounded-[0.75rem] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-[1rem] py-[1.5rem] text-center transition-colors duration-300',
              dragging && 'border-[#B5935E] bg-[#FBF8F2]',
            )}
          >
            <CloudUpload
              className='size-[1.5rem] text-[#B5935E]'
              strokeWidth={1.5}
            />
            <span className='text-[0.875rem] font-semibold text-[#1A2B48]'>
              {fileName || 'Kéo thả hoặc tải CV lên'}
            </span>
            <span className='text-[0.75rem] text-[#94A3B8]'>PDF, DOC, DOCX · tối đa 5MB</span>
          </button>
          <input
            ref={inputRef}
            type='file'
            name='cv'
            accept='.pdf,.doc,.docx'
            className='sr-only'
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) setFileName(file.name)
            }}
          />
        </div>

        <button
          type='submit'
          className='inline-flex h-[2.875rem] w-full items-center justify-center gap-[0.5rem] rounded-[0.5rem] bg-[#1A2B48] text-[0.875rem] font-bold text-white transition-colors duration-300 hover:bg-[#243656]'
        >
          <Send
            className='size-[1rem]'
            strokeWidth={1.75}
          />
          Gửi hồ sơ ứng tuyển
        </button>
      </div>
    </form>
  )
}

export default ApplyForm
