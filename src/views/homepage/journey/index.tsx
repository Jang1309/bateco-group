'use client'

import Image from 'next/image'
import { useState } from 'react'

import type { HomepageJourney } from '@/interfaces/homepage.interface'
import JourneyCenter, { milestoneKey } from '@/views/homepage/journey/components/journey-center'
import MilestoneCard from '@/views/homepage/journey/components/milestone-card'
import { JOURNEY_GOLD } from '@/views/homepage/journey/constants'

const HomeJourney = ({ data }: { data?: HomepageJourney }) => {
  const milestones = data?.milestones || []
  const [hovered, setHovered] = useState<string | null>(null)
  const active = milestones.find((item, index) => milestoneKey(item, index) === hovered) ?? null

  return (
    <section className='relative overflow-hidden bg-white pt-[5rem] pb-[5.5rem] xsm:pt-[3rem] xsm:pb-[3rem]'>
      <div className='absolute inset-0 overflow-hidden'>
        <Image
          src='/home/d-bg.png'
          alt=''
          fill
          sizes='100vw'
          className='scale-[1.12] object-cover object-[center_42%]'
          priority={false}
        />
      </div>
      <div
        aria-hidden
        className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.55)_45%,rgba(255,255,255,0.2)_72%,transparent_100%)]'
      />

      <div className='relative mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
        <header className='text-center'>
          {data?.subtitle ? (
            <p className='flex items-center justify-center gap-[0.75rem] text-[0.75rem] font-semibold tracking-[0.2em] text-[#1A2B48] uppercase'>
              <span className='h-px w-[2.5rem] bg-[#C6A15B]/70' />
              <span className='inline-flex items-center gap-[0.35rem]'>
                <span className='size-[0.35rem] rotate-45 bg-[#C6A15B]' />
                {data.subtitle}
                <span className='size-[0.35rem] rotate-45 bg-[#C6A15B]' />
              </span>
              <span className='h-px w-[2.5rem] bg-[#C6A15B]/70' />
            </p>
          ) : null}
          {data?.title ? (
            <h2
              className='mt-[0.875rem] text-[2.75rem] leading-[1.2] font-bold tracking-[0.04em] uppercase xsm:text-[1.625rem]'
              style={{
                background: JOURNEY_GOLD,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {data.title}
            </h2>
          ) : null}
          {data?.desc ? (
            <p className='mt-[0.625rem] text-[0.875rem] font-medium tracking-[0.18em] text-[#1A2B48]/70 uppercase xsm:text-[0.75rem]'>
              {data.desc}
            </p>
          ) : null}
        </header>

        <div className='py-[3rem] xsm:py-[2rem]'>
          <JourneyCenter
            active={active}
            logo={data?.logo}
          />
        </div>

        {milestones.length ? (
          <ul className='grid grid-cols-5 gap-[1rem] xlg:grid-cols-3 xsm:grid-cols-1 xsm:gap-[0.75rem]'>
            {milestones.map((item, i) => {
              const key = milestoneKey(item, i)

              return (
                <li key={key}>
                  <MilestoneCard
                    item={item}
                    index={i}
                    isActive={hovered === key}
                    onActivate={() => setHovered(key)}
                    onDeactivate={() => setHovered(null)}
                    onToggle={() => setHovered((prev) => (prev === key ? null : key))}
                  />
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
    </section>
  )
}

export default HomeJourney
