'use client'

import { useInView } from 'motion/react'
import { useRef } from 'react'

import { InfiniteSlider } from '@/components/shared/infinite-slider'
import type { IntroductionLeader } from '@/interfaces/introduction.interface'
import LeaderCard from '@/views/about/leadership/components/leader-card'

type TeamMarqueeProps = {
  team: IntroductionLeader[]
}

const TeamMarquee = ({ team }: TeamMarqueeProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '20% 0px', amount: 0.15 })

  if (team.length === 0) return null

  return (
    <div
      ref={ref}
      className='relative w-full py-[1.25rem]'
    >
      {/* fade cạnh bằng overlay — nhẹ hơn mask-image khi đang transform */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-y-0 left-0 z-[1] w-[6%] bg-[linear-gradient(90deg,#fff,transparent)]'
      />
      <div
        aria-hidden
        className='pointer-events-none absolute inset-y-0 right-0 z-[1] w-[6%] bg-[linear-gradient(270deg,#fff,transparent)]'
      />
      <InfiniteSlider
        gap={0}
        speed={50}
        paused={!inView}
      >
        {team.map((leader, index) => (
          <div
            key={`${index}-${leader.name}`}
            className='flex pr-[1.5625rem] xsm:pr-[1rem]'
          >
            <LeaderCard leader={leader} />
          </div>
        ))}
      </InfiniteSlider>
    </div>
  )
}

export default TeamMarquee
