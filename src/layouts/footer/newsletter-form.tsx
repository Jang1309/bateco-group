'use client'

import { ArrowRight } from 'lucide-react'

type NewsletterFormProps = {
  placeholder?: string
  submitAriaLabel?: string
}

const NewsletterForm = ({ placeholder, submitAriaLabel }: NewsletterFormProps) => {
  return (
    <form
      // TODO: nối API đăng ký nhận tin (CF7 / CMS) khi có endpoint
      onSubmit={(event) => event.preventDefault()}
      className='flex h-[3rem] w-full max-w-[28rem] overflow-hidden rounded-[0.25rem] border border-[#D9C08A] bg-white focus-within:border-[#B88E4F] xsm:max-w-none'
    >
      <label
        htmlFor='footer-newsletter'
        className='sr-only'
      >
        Email
      </label>
      <input
        id='footer-newsletter'
        type='email'
        name='email'
        required
        placeholder={placeholder || 'Nhập email của bạn'}
        className='min-w-0 flex-1 bg-transparent px-[1rem] text-[0.875rem] text-[#1F2A37] outline-none placeholder:text-[#9CA3AF]'
      />
      <button
        type='submit'
        aria-label={submitAriaLabel || 'Đăng ký nhận tin'}
        className='flex w-[3rem] shrink-0 items-center justify-center bg-[linear-gradient(180deg,#DFBA73_0%,#B88E4F_100%)] text-white transition-[filter] duration-300 hover:brightness-110'
      >
        <ArrowRight className='size-[1.1rem]' />
      </button>
    </form>
  )
}

export default NewsletterForm
