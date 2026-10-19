'use client'

import { motion, useReducedMotion } from 'motion/react'

import CountUp from '@/components/shared/count-up'

type OwnershipRingProps = {
  value: string
}

const RADIUS = 70

const OwnershipRing = ({ value }: OwnershipRingProps) => {
  const reducedMotion = useReducedMotion()
  const ratio = Math.min(Math.max((Number.parseFloat(value) || 0) / 100, 0), 1)

  return (
    <div className='relative size-[11rem] xsm:size-[7.5rem] xsm:shrink-0'>
      <svg
        viewBox='0 0 160 160'
        className='size-full -rotate-90'
        aria-hidden
      >
        <defs>
          <linearGradient
            id='ownership-ring-gradient'
            x1='0'
            y1='0'
            x2='1'
            y2='1'
          >
            <stop
              offset='0%'
              stopColor='#1F7A54'
            />
            <stop
              offset='100%'
              stopColor='#0F5A3C'
            />
          </linearGradient>
        </defs>
        <circle
          cx='80'
          cy='80'
          r={RADIUS}
          fill='none'
          stroke='#EEF1F5'
          strokeWidth='10'
        />
        <motion.circle
          cx='80'
          cy='80'
          r={RADIUS}
          fill='none'
          stroke='url(#ownership-ring-gradient)'
          strokeWidth='10'
          strokeLinecap='round'
          initial={{ pathLength: reducedMotion ? ratio : 0 }}
          whileInView={{ pathLength: ratio }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className='absolute inset-0 flex flex-col items-center justify-center'>
        <span className='text-[2.75rem] leading-none font-bold text-[#0F5A3C] xsm:text-[1.75rem]'>
          <CountUp value={value} />
        </span>
        <span className='mt-[0.375rem] text-[0.625rem] font-bold tracking-[0.2em] xsm:mt-[0.25rem] xsm:text-[0.5rem] xsm:tracking-[0.12em] text-[#B5935E] uppercase'>
          Nhà đầu tư
        </span>
      </div>
    </div>
  )
}

export default OwnershipRing
