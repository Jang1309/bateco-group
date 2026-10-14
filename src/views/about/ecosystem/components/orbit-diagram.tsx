'use client'

import { motion, useInView } from 'motion/react'
import Image from 'next/image'
import { type CSSProperties, useRef } from 'react'

import Reveal from '@/views/about/components/reveal'
import type { AboutSatellite } from '@/views/about/data'
import { ORBIT_RADIUS, orbitNodes } from '@/views/about/lib/geometry'

type OrbitDiagramProps = {
  satellites: AboutSatellite[]
}

const OrbitDiagram = ({ satellites }: OrbitDiagramProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.1 })
  const nodes = orbitNodes(satellites.length)

  return (
    <div
      ref={ref}
      data-paused={!inView}
      className='about-orbit @container relative aspect-square w-[51.76rem] max-w-full overflow-hidden xsm:w-full'
    >
      <div className='about-orbit-spin absolute inset-0'>
        <svg
          aria-hidden
          viewBox='0 0 100 100'
          className='absolute inset-0 h-full w-full overflow-visible'
        >
          <circle
            cx='50'
            cy='50'
            r={ORBIT_RADIUS}
            fill='none'
            stroke='#D8C2A0'
            strokeWidth='0.214'
            strokeDasharray='0.856 0.856'
            opacity='0.85'
          />
          {nodes.map((node, index) => (
            <motion.line
              key={`${node.angle}`}
              data-reveal-path
              x1='50'
              y1='50'
              x2={node.x}
              y2={node.y}
              stroke='#E2D4C0'
              strokeWidth='0.171'
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.9, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </svg>

        {nodes.map((node, index) => (
          <span
            key={`${node.angle}`}
            aria-hidden
            className='about-orbit-signal'
            style={
              {
                '--angle': `${node.angle}deg`,
                '--delay': `${Math.round((1 + index * 0.31) * 100) / 100}s`,
              } as CSSProperties
            }
          />
        ))}

        {satellites.map((satellite, index) => (
          <div
            key={`${satellite.label}-${index}`}
            className='absolute -translate-x-1/2 -translate-y-1/2'
            style={{ left: `${nodes[index].x}%`, top: `${nodes[index].y}%` }}
          >
            <div className='about-orbit-counter'>
              <Reveal
                variant='pop'
                delay={0.3 + index * 0.06}
                amount={0.1}
              >
                <div className='flex size-[5.48rem] flex-col items-center justify-center rounded-full border border-[#D8C2A0] bg-white p-[0.55rem] text-center shadow-[0_0.3125rem_1.09rem_-0.078rem_rgba(184,142,86,0.12),0_0.156rem_0.47rem_-0.078rem_rgba(0,0,0,0.05)] xsm:size-[3.9rem] xsm:p-[0.3rem]'>
                  <span className='text-[0.547rem] leading-[0.547rem] font-bold tracking-[-0.0137rem] text-[#0F2B48] uppercase xsm:text-[0.5rem]'>
                    {satellite.name}
                  </span>
                  <span className='pt-[0.078rem] text-[0.43rem] leading-[0.645rem] font-bold tracking-[0.0215rem] text-[#B88E56] uppercase xsm:text-[0.4375rem]'>
                    {satellite.label}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        ))}
      </div>

      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Reveal
          variant='pop'
          amount={0.1}
        >
          <div className='relative flex size-[13.75rem] items-center justify-center rounded-full border-[0.234rem] border-[#B88E56] bg-white shadow-[0_0.625rem_2.34rem_-0.3125rem_rgba(184,142,86,0.2),0_0.3125rem_0.9375rem_0_rgba(0,0,0,0.04)] xsm:size-[7.5rem]'>
            <span
              aria-hidden
              className='absolute inset-[0.234rem] rounded-full border border-[#D5B88D]'
            />
            <span
              aria-hidden
              className='about-hub-ring'
            />
            <Image
              src='/header/d-logo.png'
              alt='Bateco Group'
              width={523}
              height={143}
              className='relative h-auto w-[11.4rem] xsm:w-[6rem]'
            />
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export default OrbitDiagram
