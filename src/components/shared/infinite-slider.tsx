/* eslint-disable indent */
'use client'
import { useMotionValue, animate, motion, useReducedMotion } from 'motion/react'
import { Children, cloneElement, isValidElement, useEffect, useState } from 'react'
import useMeasure from 'react-use-measure'

import { cn } from '@/lib/utils'

export type InfiniteSliderProps = {
  children: React.ReactNode
  gap?: number
  speed?: number
  speedOnHover?: number
  direction?: 'horizontal' | 'vertical'
  reverse?: boolean
  className?: string
  /** Dừng animate khi ngoài viewport — tránh giật khi Lenis/scroll đo lại layout */
  paused?: boolean
}

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
  paused = false,
}: InfiniteSliderProps) {
  const [isHovering, setIsHovering] = useState(false)
  const currentSpeed = isHovering && speedOnHover ? speedOnHover : speed
  const [ref, bounds] = useMeasure()
  // round: ResizeObserver subpixel lúc scroll không restart animation
  const measured = Math.round(direction === 'horizontal' ? bounds.width : bounds.height)
  const translation = useMotionValue(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [key, setKey] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || paused || measured === 0) return

    let controls
    const contentSize = measured + gap
    const from = reverse ? -contentSize / 2 : 0
    const to = reverse ? 0 : -contentSize / 2

    const distanceToTravel = Math.abs(to - from)
    const duration = distanceToTravel / currentSpeed

    if (isTransitioning) {
      const remainingDistance = Math.abs(translation.get() - to)
      const transitionDuration = remainingDistance / currentSpeed

      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration: transitionDuration,
        onComplete: () => {
          setIsTransitioning(false)
          setKey((prevKey) => prevKey + 1)
        },
      })
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: duration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from)
        },
      })
    }

    return controls?.stop
  }, [
    key,
    translation,
    currentSpeed,
    measured,
    gap,
    isTransitioning,
    direction,
    reverse,
    prefersReducedMotion,
    paused,
  ])

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true)
          setIsHovering(true)
        },
        onHoverEnd: () => {
          setIsTransitioning(true)
          setIsHovering(false)
        },
      }
    : {}

  return (
    <div className={cn('overflow-hidden motion-reduce:overflow-x-auto', className)}>
      <motion.div
        className='flex w-max will-change-transform'
        style={{
          ...(direction === 'horizontal' ? { x: translation } : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {Children.map(children, (child, index) =>
          isValidElement(child) ? cloneElement(child, { key: `a-${index}` }) : child,
        )}
        <div
          inert
          className='contents motion-reduce:hidden'
        >
          {Children.map(children, (child, index) =>
            isValidElement(child) ? cloneElement(child, { key: `b-${index}` }) : child,
          )}
        </div>
      </motion.div>
    </div>
  )
}
