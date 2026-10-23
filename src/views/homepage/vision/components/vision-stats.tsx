'use client'

import { motion, useInView } from 'motion/react'
import { useRef, useState } from 'react'

import type { HomepageVisionStat } from '@/interfaces/homepage.interface'
import CountUp from '@/views/homepage/vision/components/count-up'
import { STAT_TOPS, VISION_SPRING } from '@/views/homepage/vision/constants'

type VisionStatsProps = {
  stats: HomepageVisionStat[]
  featuredStat: number
}

const VisionStats = ({ stats, featuredStat }: VisionStatsProps) => {
  const [focused, setFocused] = useState<number | null>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const inView = useInView(statsRef, { once: true, amount: 0.4 })

  return (
    <div
      ref={statsRef}
      className='mt-[2rem] flex h-[24rem] items-stretch gap-[0.9rem] xsm:h-[18rem] xsm:gap-[0.35rem]'
    >
      {stats.map((stat, index) => {
        const [topLeft, topRight] = STAT_TOPS[index % STAT_TOPS.length]
        const offset = Math.min(topLeft, topRight)
        const gradientId = `vision-col-${index}`
        const isOn = focused === index
        const shape = `polygon(0 ${topLeft}%, 100% ${topRight}%, 100% 100%, 0 100%)`
        const lines = (stat.desc || '').split(/\n|\\n/).filter(Boolean)

        return (
          <motion.div
            key={index}
            className='relative min-w-0 flex-1'
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ ...VISION_SPRING, delay: Math.abs(index - featuredStat) * 0.12 }}
          >
            <motion.div
              onHoverStart={() => setFocused(index)}
              onHoverEnd={() => setFocused(null)}
              className='absolute inset-0 cursor-default'
              animate={{
                y: isOn ? -12 : 0,
                filter: focused !== null && !isOn ? 'brightness(0.8)' : 'brightness(1)',
              }}
              transition={VISION_SPRING}
            >
              <svg
                viewBox='0 0 100 100'
                preserveAspectRatio='none'
                aria-hidden
                className='absolute inset-0 size-full overflow-visible'
              >
                <defs>
                  <linearGradient
                    id={gradientId}
                    x1='0'
                    y1='0'
                    x2='0'
                    y2='1'
                  >
                    <stop
                      offset='0%'
                      stopColor='#24509C'
                    />
                    <stop
                      offset='55%'
                      stopColor='#15306A'
                    />
                    <stop
                      offset='100%'
                      stopColor='#050A14'
                    />
                  </linearGradient>
                  <linearGradient
                    id={`${gradientId}-on`}
                    x1='0'
                    y1='0'
                    x2='0'
                    y2='1'
                  >
                    <stop
                      offset='0%'
                      stopColor='#3466C2'
                    />
                    <stop
                      offset='55%'
                      stopColor='#1C3C84'
                    />
                    <stop
                      offset='100%'
                      stopColor='#0A1430'
                    />
                  </linearGradient>
                </defs>
                <path
                  d={`M0,${topLeft} L100,${topRight} L100,100 L0,100 Z`}
                  fill={`url(#${gradientId})`}
                />
                <motion.path
                  d={`M0,${topLeft} L100,${topRight} L100,100 L0,100 Z`}
                  fill={`url(#${gradientId}-on)`}
                  initial={false}
                  animate={{ opacity: isOn ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.path
                  d={`M0,100 L0,${topLeft} L100,${topRight} L100,100`}
                  fill='none'
                  vectorEffect='non-scaling-stroke'
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: inView ? 1 : 0,
                    stroke: isOn ? '#F2C96B' : '#C6A15B',
                    strokeWidth: isOn || index === featuredStat ? 3 : 1.5,
                  }}
                  transition={{
                    opacity: { duration: 0.6, delay: 0.3 + index * 0.1 },
                    default: { duration: 0.4 },
                  }}
                />
              </svg>

              <div
                aria-hidden
                className='pointer-events-none absolute inset-0 overflow-hidden'
                style={{ clipPath: shape }}
              >
                <motion.span
                  className='absolute inset-y-0 w-[60%] -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,236,190,0.28),transparent)]'
                  initial={{ left: '-100%' }}
                  animate={isOn ? { left: ['-100%', '130%'] } : { left: '-100%' }}
                  transition={isOn ? { duration: 0.9, ease: 'easeInOut' } : { duration: 0 }}
                />
              </div>

              <div
                className='absolute inset-x-0 bottom-0 flex flex-col items-center text-center'
                style={{ top: `${offset + 9}%` }}
              >
                <motion.span
                  className='w-px flex-1 origin-top'
                  initial={{ scaleY: 0 }}
                  animate={{
                    scaleY: inView ? 1 : 0,
                    backgroundColor: isOn ? 'rgba(228,195,106,0.8)' : 'rgba(198,161,91,0.35)',
                  }}
                  transition={{
                    scaleY: { duration: 0.8, delay: 0.6 + index * 0.1 },
                    default: { duration: 0.4 },
                  }}
                />
                {stat.number ? (
                  <motion.p
                    className='py-[0.6rem] text-[2.5rem] leading-none font-extrabold xsm:text-[1.1rem]'
                    style={{
                      background: 'linear-gradient(178deg, #FFF 40.58%, #F6A600 78.32%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                    animate={{ scale: isOn ? 1.14 : 1 }}
                    transition={VISION_SPRING}
                  >
                    <CountUp
                      value={stat.number}
                      start={inView}
                      delay={0.4 + index * 0.1}
                    />
                  </motion.p>
                ) : null}
                <p className='mt-[0.4rem] h-[4.4rem] px-[0.25rem] text-[0.8rem] leading-[1.35] font-semibold tracking-[0.02em] text-white uppercase xsm:h-[2.5rem] xsm:text-[0.45rem]'>
                  {lines.map((line, lineIndex) => (
                    <span
                      key={lineIndex}
                      className='block'
                    >
                      {line}
                    </span>
                  ))}
                </p>
                <motion.span
                  className='mt-[0.9rem] h-[0.12rem] w-[70%] shrink-0 xsm:mt-[0.5rem]'
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: inView ? (isOn ? 1 : 0.64) : 0,
                    backgroundColor: isOn ? '#F2C96B' : '#C6A15B',
                  }}
                  transition={VISION_SPRING}
                />
                <motion.span
                  className='h-[2.75rem] w-px shrink-0 xsm:h-[1.25rem]'
                  animate={{
                    backgroundColor: isOn ? 'rgba(228,195,106,0.8)' : 'rgba(198,161,91,0.35)',
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default VisionStats
