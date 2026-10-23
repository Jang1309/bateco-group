'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

import type { HomepageMilestone } from '@/interfaces/homepage.interface'
import { cn } from '@/lib/utils'
import { JOURNEY_EASE } from '@/views/homepage/journey/constants'

type MilestoneCardProps = {
  item: HomepageMilestone
  index: number
  isActive: boolean
  onActivate: () => void
  onDeactivate: () => void
  onToggle: () => void
}

const MilestoneCard = ({
  item,
  index,
  isActive,
  onActivate,
  onDeactivate,
  onToggle,
}: MilestoneCardProps) => {
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.button
      type='button'
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      onClick={onToggle}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.35, ease: JOURNEY_EASE }}
      aria-pressed={isActive}
      className={cn(
        'group flex h-full w-full cursor-pointer flex-col rounded-[0.875rem] border px-[1.25rem] py-[1.25rem] text-left',
        isActive
          ? 'border-transparent bg-[linear-gradient(135deg,#DFBA73_0%,#C9A468_50%,#B5935E_100%)] text-[#1A2B48] shadow-[0_0.875rem_2rem_rgba(181,147,94,0.4)]'
          : 'border-[#C9A468]/45 bg-white/90 text-[#1A2B48] shadow-[0_0.25rem_0.75rem_rgba(26,43,72,0.04)]',
      )}
      style={{
        transition:
          'background 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.35s, box-shadow 0.35s, color 0.35s',
      }}
    >
      <span className='flex items-start justify-between gap-[0.75rem]'>
        <span
          className={cn(
            'text-[0.8125rem] font-medium tabular-nums transition-colors duration-300',
            isActive ? 'text-[#1A2B48]/70' : 'text-[#64748B]',
          )}
        >
          {num}
        </span>
        {item.icon ? (
          <motion.span
            animate={isActive ? { rotate: 8, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: JOURNEY_EASE }}
            className='relative size-[1.125rem]'
          >
            <Image
              src={item.icon}
              alt=''
              fill
              className='object-contain'
            />
          </motion.span>
        ) : null}
      </span>
      {item.year ? (
        <span
          className={cn(
            'mt-[1.25rem] text-[1.125rem] leading-[1.3] font-bold transition-colors duration-300',
            isActive ? 'text-[#1A2B48]' : 'text-[#B5935E]',
          )}
        >
          {item.year}
        </span>
      ) : null}
      {item.title ? (
        <span
          className={cn(
            'mt-[0.5rem] text-[0.8125rem] leading-[1.45] transition-colors duration-300',
            isActive ? 'text-[#1A2B48]/80' : 'text-[#475569]',
          )}
        >
          {item.title}
        </span>
      ) : null}
    </motion.button>
  )
}

export default MilestoneCard
