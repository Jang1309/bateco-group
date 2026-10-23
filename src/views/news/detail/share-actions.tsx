'use client'

import { Check, Facebook, Link2, Linkedin, Twitter } from 'lucide-react'
import { useState } from 'react'

const SHARE_TARGETS = [
  { label: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/sharer/sharer.php?u=' },
  {
    label: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/sharing/share-offsite/?url=',
  },
  { label: 'X', icon: Twitter, url: 'https://twitter.com/intent/tweet?url=' },
]

const buttonClass =
  'inline-flex size-[2.5rem] items-center justify-center rounded-full border border-[#E2E8F0] text-[#1A2B48] transition-colors duration-300 hover:border-[#B5935E] hover:bg-[#B5935E] hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-[#B5935E] focus-visible:ring-offset-2'

const ShareActions = () => {
  const [copied, setCopied] = useState(false)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard bị chặn (http / quyền trình duyệt): bỏ qua
    }
  }

  return (
    <div className='flex items-center gap-[0.625rem]'>
      <span className='mr-[0.25rem] text-[0.8125rem] font-semibold text-[#64748B] xsm:hidden'>
        Chia sẻ
      </span>
      {SHARE_TARGETS.map(({ label, icon: Icon, url }) => (
        <button
          key={label}
          type='button'
          aria-label={`Chia sẻ lên ${label}`}
          onClick={() =>
            window.open(
              url + encodeURIComponent(window.location.href),
              '_blank',
              'noopener,noreferrer,width=600,height=600',
            )
          }
          className={buttonClass}
        >
          <Icon className='size-[1rem]' />
        </button>
      ))}
      <button
        type='button'
        onClick={copyLink}
        aria-label='Sao chép liên kết'
        className={buttonClass}
      >
        {copied ? <Check className='size-[1rem]' /> : <Link2 className='size-[1rem]' />}
      </button>
      <span
        aria-live='polite'
        className='sr-only'
      >
        {copied ? 'Đã sao chép liên kết' : ''}
      </span>
    </div>
  )
}

export default ShareActions
