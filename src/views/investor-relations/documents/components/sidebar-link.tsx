'use client'

import { cn } from '@/lib/utils'

type SidebarLinkProps = {
  id: string
  title: string
  active: boolean
  nested?: boolean
  onSelect: (id: string) => void
}

const SidebarLink = ({ id, title, active, nested = false, onSelect }: SidebarLinkProps) => {
  return (
    <button
      type='button'
      onClick={() => onSelect(id)}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group flex w-full items-center gap-[0.75rem] rounded-[0.5rem] border-l-[0.1875rem] py-[0.75rem] pr-[0.875rem] text-left text-[0.875rem] leading-[1.4] transition-colors duration-300',
        nested ? 'pl-[1.75rem]' : 'pl-[0.875rem]',
        active
          ? 'border-[#0F5A3C] bg-[#EEF8F2] font-bold text-[#0F5A3C]'
          : 'border-transparent font-medium text-[#1A2B48] hover:bg-[#F7F9FB] hover:text-[#0F5A3C]',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'size-[0.375rem] shrink-0 rounded-full transition-colors duration-300',
          active ? 'bg-[#B5935E]' : 'bg-[#CBD2DC] group-hover:bg-[#B5935E]',
        )}
      />
      {title}
    </button>
  )
}

export default SidebarLink
