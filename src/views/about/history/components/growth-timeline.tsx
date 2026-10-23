'use client'

import {
  animate,
  type AnimationPlaybackControls,
  motion,
  type MotionValue,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react'
import Image from 'next/image'
import { type ReactNode, useCallback, useEffect, useId, useRef } from 'react'

import type { IntroductionMilestone } from '@/interfaces/introduction.interface'
import Reveal from '@/views/about/components/reveal'
import MilestoneCard from '@/views/about/history/components/milestone-card'
import {
  ARROW_SHAPE,
  CANVAS,
  growthPath,
  idleFrame,
  staticFrame,
  type StepSlot,
  stepSlots,
  timelineFrame,
  type TimelineFrame,
  timelinePan,
  timelineTiming,
  VISIBLE_MILESTONES,
  windowOpacity,
} from '@/views/about/lib/geometry'

const ARROW_BOX = 24

const ARROW_POINTS = ARROW_SHAPE.map(([x, y]) => `${x},${y}`).join(' ')

const revealShare = ({ headX }: TimelineFrame) => ((headX + 2) / CANVAS.width) * 100

const windowTransform = (frame: TimelineFrame) => `translateX(${(revealShare(frame) - 100) / 3}%)`

const lineTransform = (frame: TimelineFrame) => `translateX(${100 - revealShare(frame)}%)`

const arrowTransform = ({ head }: TimelineFrame) => {
  const x = ((head.x - ARROW_BOX / 2) / ARROW_BOX) * 100
  const y = ((head.y - ARROW_BOX / 2) / ARROW_BOX) * 100
  return `translate(${x}%, ${y}%) rotate(${head.angle}deg)`
}

type TimelineSlotProps = {
  pan: MotionValue<number>
  index: number
  slot: StepSlot
  children: ReactNode
}

const TimelineSlot = ({ pan, index, slot, children }: TimelineSlotProps) => {
  const opacity = useTransform(pan, (value) => windowOpacity(index, value))
  const pointerEvents = useTransform(opacity, (value) => (value < 0.5 ? 'none' : 'auto'))

  return (
    <motion.div
      className='absolute'
      style={{
        left: `${slot.left}%`,
        width: `${slot.width}%`,
        bottom: `${slot.bottom}%`,
        opacity,
        pointerEvents,
      }}
    >
      {children}
    </motion.div>
  )
}

type GrowthTimelineProps = {
  milestones: IntroductionMilestone[]
}

const GrowthTimeline = ({ milestones }: GrowthTimelineProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGSVGElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<AnimationPlaybackControls | null>(null)
  const paintedRef = useRef({ active: -1, arrow: false, panning: false })
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const visible = useInView(ref)
  const centered = useInView(ref, { margin: '-35% 0px -35% 0px' })
  const reduced = useReducedMotion()
  const count = milestones.length
  const pan = useMotionValue(0)
  const lineOpacity = useMotionValue(1)
  const shift = timelinePan(count)
  const steps = Math.max(count - VISIBLE_MILESTONES, 0)
  const panSteps = Math.max(steps, 1)
  const lineX = useTransform(pan, (value) => `${(value / panSteps) * shift.line.x}%`)
  const lineY = useTransform(pan, (value) => `${(value / panSteps) * shift.line.y}%`)
  const cardsX = useTransform(pan, (value) => `${(value / panSteps) * shift.cards.x}%`)
  const cardsY = useTransform(pan, (value) => `${(value / panSteps) * shift.cards.y}%`)
  const { d, gradient } = growthPath(count)
  const slots = stepSlots(count)
  const idle = idleFrame(count)

  const paint = useCallback(
    (frame: TimelineFrame) => {
      const root = ref.current
      const reveal = windowRef.current
      const line = lineRef.current
      const arrow = arrowRef.current
      const cards = cardsRef.current
      if (!root || !reveal || !line || !arrow || !cards) return

      pan.set(frame.pan)
      lineOpacity.set(frame.opacity)
      reveal.style.transform = windowTransform(frame)
      line.style.transform = lineTransform(frame)
      arrow.style.transform = arrowTransform(frame)

      const painted = paintedRef.current
      if (frame.arrow !== painted.arrow) {
        painted.arrow = frame.arrow
        arrow.style.opacity = frame.arrow ? '1' : '0'
      }

      const panning = frame.pan > 0 && frame.pan < steps
      if (panning !== painted.panning) {
        painted.panning = panning
        cards.style.willChange = panning ? 'transform' : ''
        for (const slot of cards.children) {
          if (slot instanceof HTMLElement) slot.style.willChange = panning ? 'opacity' : ''
        }
      }

      if (frame.active !== painted.active) {
        painted.active = frame.active
        root.querySelectorAll<HTMLElement>('article').forEach((article, index) => {
          article.dataset.active = `${index === frame.active}`
        })
      }
    },
    [steps, pan, lineOpacity],
  )

  useEffect(() => {
    const stop = () => {
      controlsRef.current?.stop()
      controlsRef.current = null
    }

    if (reduced) {
      stop()
      paint(staticFrame(count))
      return
    }
    if (!visible) {
      stop()
      paint(idleFrame(count))
      return
    }
    if (centered && !controlsRef.current) {
      const { loop } = timelineTiming(count)
      controlsRef.current = animate(0, loop, {
        duration: loop,
        ease: 'linear',
        repeat: Infinity,
        onUpdate: (time) => paint(timelineFrame(count, time)),
      })
    }
  }, [count, visible, centered, reduced, paint])

  useEffect(
    () => () => {
      controlsRef.current?.stop()
      controlsRef.current = null
    },
    [],
  )

  return (
    <div
      ref={ref}
      className='relative mx-auto mt-[1.875rem] aspect-[1186/732] w-[92.66rem] xsm:hidden'
    >
      <div className='pointer-events-none absolute inset-x-0 top-[9.65%] bottom-0 opacity-30'>
        <Image
          src='/gioi-thieu/history/line-art.jpg'
          alt=''
          fill
          sizes='93vw'
          className='object-cover object-bottom'
        />
      </div>

      <div className='absolute inset-0 [clip-path:inset(-30%_0_-30%_0)]'>
        <motion.div
          aria-hidden
          className='pointer-events-none absolute inset-0 will-change-transform'
          style={{ x: lineX, y: lineY, opacity: lineOpacity }}
        >
          <div
            ref={windowRef}
            className='absolute inset-y-0 right-0 w-[300%] overflow-x-clip will-change-transform'
            style={{ transform: windowTransform(idle) }}
          >
            <svg
              ref={lineRef}
              viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
              preserveAspectRatio='none'
              className='absolute inset-y-0 right-0 h-full w-1/3 overflow-visible will-change-transform'
              style={{ transform: lineTransform(idle) }}
            >
              <defs>
                <linearGradient
                  id={`growth-${id}`}
                  gradientUnits='userSpaceOnUse'
                  x1={gradient.x1}
                  y1={gradient.y1}
                  x2={gradient.x2}
                  y2={gradient.y2}
                >
                  <stop
                    offset='0'
                    stopColor='#C59B27'
                    stopOpacity='0.8'
                  />
                  <stop
                    offset='0.5'
                    stopColor='#D4AF37'
                  />
                  <stop
                    offset='1'
                    stopColor='#E5B94B'
                  />
                </linearGradient>
              </defs>
              <path
                d={d}
                fill='none'
                stroke={`url(#growth-${id})`}
                strokeWidth={3.94}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <div
            ref={arrowRef}
            className='absolute top-0 left-0 origin-center will-change-transform'
            style={{
              width: `${(ARROW_BOX / CANVAS.width) * 100}%`,
              height: `${(ARROW_BOX / CANVAS.height) * 100}%`,
              opacity: 0,
            }}
          >
            <svg
              viewBox={`${-ARROW_BOX / 2} ${-ARROW_BOX / 2} ${ARROW_BOX} ${ARROW_BOX}`}
              preserveAspectRatio='none'
              className='absolute inset-0 h-full w-full overflow-visible'
            >
              <polygon
                points={ARROW_POINTS}
                fill='#C59B27'
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          ref={cardsRef}
          className='absolute inset-0'
          style={{ x: cardsX, y: cardsY }}
        >
          {milestones.map((milestone, index) => (
            <TimelineSlot
              key={`${index}-${milestone.year}`}
              pan={pan}
              index={index}
              slot={slots[index]}
            >
              <Reveal
                variant='up'
                delay={index < VISIBLE_MILESTONES ? index * 0.12 : 0}
              >
                <MilestoneCard
                  milestone={milestone}
                  index={index}
                />
              </Reveal>
            </TimelineSlot>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default GrowthTimeline
