'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import type { CSSProperties } from 'react'

import {
  ACTIVE_BG,
  FAN_OFFSET,
  IDLE_BG,
  SHIMMER_BORDER,
  SWEEP_TRANSITION,
} from '@/views/homepage/investment/constants'
import type { InvestmentItem } from '@/views/homepage/investment/data'

type SectorListProps = {
  items: InvestmentItem[]
  center: number
  hovered: number | null
  onPreview: (index: number) => void
  onSelect: (index: number) => void
  onLeave: () => void
  onBlur: () => void
}

const SectorList = ({
  items,
  center,
  hovered,
  onPreview,
  onSelect,
  onLeave,
  onBlur,
}: SectorListProps) => (
  <ul
    data-aos='fade-left'
    data-aos-delay='200'
    onMouseLeave={onLeave}
    className='flex min-w-0 flex-1 flex-col items-center justify-center gap-[0.75rem] xsm:gap-[0.5rem]'
  >
    {items.map((item, index) => {
      const isActive = hovered === index
      const distance = Math.abs(index - center)
      const offset = FAN_OFFSET[Math.min(distance, FAN_OFFSET.length - 1)]

      return (
        <li
          key={index}
          className='w-full max-w-[34rem] translate-x-(--fan-offset) transition-transform duration-500 ease-out xsm:max-w-none xsm:translate-x-0'
          style={{ '--fan-offset': `${offset}rem` } as CSSProperties}
        >
          <button
            type='button'
            aria-pressed={isActive}
            onMouseEnter={() => onPreview(index)}
            onFocus={() => onSelect(index)}
            onBlur={onBlur}
            onClick={() => onSelect(index)}
            className={`relative flex h-[4rem] w-full -skew-x-[16deg] cursor-pointer items-center overflow-hidden rounded-[0.3125rem] border text-left transition-all duration-500 ease-out ${isActive ? 'border-[#E5BE7D] shadow-[0_0_0_1px_rgba(197,154,82,0.40),0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)]' : 'border-[rgba(39,43,48,0.50)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)] hover:brightness-110'}`}
          >
            <span
              aria-hidden
              className='absolute inset-0'
              style={{ background: IDLE_BG }}
            />
            <motion.span
              aria-hidden
              className='absolute inset-0'
              initial={false}
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={SWEEP_TRANSITION}
              style={{ background: ACTIVE_BG, originX: isActive ? 0 : 1 }}
            />

            <span className='relative h-full w-[7rem] shrink-0 overflow-hidden border-r border-[#8a6a2f]/30 xsm:w-[4.5rem]'>
              <motion.span
                className='absolute inset-0'
                initial={false}
                animate={{
                  clipPath: isActive
                    ? 'inset(0% 0% 0% 100%)'
                    : ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'],
                }}
                transition={SWEEP_TRANSITION}
              >
                <span className='absolute inset-y-0 -inset-x-[0.6rem] skew-x-[16deg]'>
                  <Image
                    src={item.image}
                    alt=''
                    fill
                    unoptimized
                    sizes='10vw'
                    className='object-cover'
                  />
                </span>
              </motion.span>

              <span className='absolute inset-y-0 -inset-x-[0.6rem] flex skew-x-[16deg] items-center justify-center'>
                <motion.span
                  className='flex'
                  initial={false}
                  animate={
                    isActive
                      ? { opacity: 1, x: 0, filter: 'blur(0px)' }
                      : { opacity: 0, x: -12, filter: 'blur(4px)' }
                  }
                  transition={{ ...SWEEP_TRANSITION, delay: isActive ? 0.2 : 0 }}
                >
                  <Image
                    src='/home/investment/logo.svg'
                    alt='Bateco Group'
                    width={62}
                    height={15}
                    className='h-[0.9375rem] w-auto object-contain'
                  />
                </motion.span>
              </span>
            </span>

            <span
              className={`relative skew-x-[16deg] truncate px-[1.25rem] text-[0.875rem] font-semibold transition-colors duration-500 ${isActive ? 'text-[#1f1a10]' : 'text-white'}`}
            >
              {item.label}
            </span>

            <motion.span
              aria-hidden
              className={`pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
              style={SHIMMER_BORDER}
              animate={isActive ? { backgroundPosition: ['200% 0%', '0% 0%'] } : undefined}
              transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
            />
          </button>
        </li>
      )
    })}
  </ul>
)

export default SectorList
