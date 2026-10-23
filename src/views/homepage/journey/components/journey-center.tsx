'use client'

import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'

import type { HomepageMilestone } from '@/interfaces/homepage.interface'
import { JOURNEY_EASE, JOURNEY_GOLD } from '@/views/homepage/journey/constants'

const milestoneKey = (item: HomepageMilestone, index: number) =>
  item.year || item.title || String(index)

type JourneyCenterProps = {
  active: HomepageMilestone | null
  logo?: string
}

const JourneyCenter = ({ active, logo }: JourneyCenterProps) => (
  <div className='relative flex min-h-[11rem] w-full items-center justify-center xsm:min-h-[9rem]'>
    <AnimatePresence mode='wait'>
      {!active ? (
        <motion.div
          key='logo'
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: JOURNEY_EASE }}
          className='flex flex-col items-center justify-center'
        >
          <Image
            src={logo || '/header/d-logo.png'}
            alt='Bateco Group'
            width={320}
            height={96}
            className='h-[3.75rem] w-auto object-contain xsm:h-[2.75rem]'
            priority
          />
        </motion.div>
      ) : (
        <motion.div
          key={milestoneKey(active, 0)}
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: JOURNEY_EASE }}
          className='mx-auto max-w-[40rem] px-[1rem] text-center'
        >
          {active.year ? (
            <p className='text-[1.75rem] font-bold tracking-[-0.02em] text-[#1A2B48] xsm:text-[1.375rem]'>
              {active.year}
            </p>
          ) : null}
          {active.title ? (
            <h3
              className='mt-[0.625rem] text-[1.5rem] leading-[1.35] font-bold xsm:text-[1.125rem]'
              style={{
                background: JOURNEY_GOLD,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {active.title}
            </h3>
          ) : null}
          {active.desc ? (
            <p className='mt-[1rem] text-[0.9375rem] leading-[1.7] text-[#1A2B48]/75 xsm:text-[0.875rem]'>
              {active.desc}
            </p>
          ) : null}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

export default JourneyCenter
export { milestoneKey }
