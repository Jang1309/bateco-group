'use client'

import { motion, type TargetAndTransition } from 'motion/react'
import type { ReactNode } from 'react'

export type RevealVariant =
  'up' | 'left' | 'right' | 'wipe' | 'unveil' | 'grow-x' | 'grow-y' | 'pop'

type RevealState = {
  hidden: TargetAndTransition
  show: TargetAndTransition
  duration: number
}

const EASE = [0.22, 1, 0.36, 1] as const

const STATES: Record<RevealVariant, RevealState> = {
  up: { hidden: { opacity: 0, y: '2.5rem' }, show: { opacity: 1, y: 0 }, duration: 0.92 },
  left: { hidden: { opacity: 0, x: '-3.5rem' }, show: { opacity: 1, x: 0 }, duration: 0.92 },
  right: { hidden: { opacity: 0, x: '3.5rem' }, show: { opacity: 1, x: 0 }, duration: 0.92 },
  wipe: {
    hidden: { clipPath: 'inset(0 100% 0 0)', scale: 1.035 },
    show: { clipPath: 'inset(0 0% 0 0)', scale: 1 },
    duration: 1.15,
  },
  unveil: {
    hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    show: { opacity: 1, clipPath: 'inset(0 0 0% 0)' },
    duration: 1.2,
  },
  'grow-x': { hidden: { scaleX: 0 }, show: { scaleX: 1 }, duration: 0.8 },
  'grow-y': { hidden: { scaleY: 0 }, show: { scaleY: 1 }, duration: 0.9 },
  pop: { hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1 }, duration: 0.7 },
}

type RevealProps = {
  children?: ReactNode
  variant?: RevealVariant
  delay?: number
  amount?: number
  className?: string
}

const CLIPPED_VARIANTS: RevealVariant[] = ['wipe', 'unveil']

const Reveal = ({ children, variant = 'up', delay = 0, amount = 0.2, className }: RevealProps) => {
  const { hidden, show, duration } = STATES[variant]
  const transition = { duration, delay, ease: EASE }

  if (CLIPPED_VARIANTS.includes(variant)) {
    return (
      <motion.div
        className={className}
        initial='hidden'
        whileInView='show'
        viewport={{ once: false, amount }}
      >
        <motion.div
          data-reveal
          className='relative size-full'
          variants={{ hidden, show }}
          transition={transition}
        >
          {children}
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      data-reveal
      className={className}
      initial={hidden}
      whileInView={show}
      viewport={{ once: false, amount }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
