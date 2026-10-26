'use client'

import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'

import type { InvestorRelationsCategoryItem } from '@/interfaces/investorRelations.interface'
import { cn } from '@/lib/utils'

import SidebarLink from './sidebar-link'

type Category = InvestorRelationsCategoryItem & { slug: string; name: string }

type SidebarGroupProps = {
  group: Category
  items: Category[]
  activeSlug: string
  onSelect: (slug: string) => void
}

const SidebarGroup = ({ group, items, activeSlug, onSelect }: SidebarGroupProps) => {
  const containsActive = items.some((child) => child.slug === activeSlug)
  const [open, setOpen] = useState(containsActive)
  const panelId = useId()

  return (
    <>
      <button
        type='button'
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'group flex w-full items-center gap-[0.75rem] rounded-[0.5rem] border-l-[0.1875rem] border-transparent px-[0.875rem] py-[0.75rem] text-left text-[0.875rem] leading-[1.4] font-medium transition-colors duration-300 hover:bg-[#F7F9FB] hover:text-[#0F5A3C]',
          containsActive ? 'text-[#0F5A3C]' : 'text-[#1A2B48]',
        )}
      >
        <span
          aria-hidden
          className={cn(
            'size-[0.375rem] shrink-0 rounded-full transition-colors duration-300',
            containsActive ? 'bg-[#B5935E]' : 'bg-[#CBD2DC] group-hover:bg-[#B5935E]',
          )}
        />
        <span className='flex-1'>{group.name}</span>
        <ChevronDown
          aria-hidden
          className={cn(
            'size-[1rem] shrink-0 text-[#94A3B8] transition-transform duration-300',
            open && 'rotate-180 text-[#0F5A3C]',
          )}
        />
      </button>

      <div
        id={panelId}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <ul
          className='flex flex-col gap-[0.25rem] overflow-hidden'
          inert={!open}
        >
          {items.map((child, index) => (
            <li
              key={child.slug}
              className={cn(index === 0 && 'mt-[0.25rem]')}
            >
              <SidebarLink
                id={child.slug}
                title={child.name}
                active={child.slug === activeSlug}
                nested
                onSelect={onSelect}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default SidebarGroup
