'use client'

import { useEffect, useRef, useState } from 'react'

import type { IntroductionMilestone } from '@/interfaces/introduction.interface'
import Reveal from '@/views/about/components/reveal'
import MilestoneCard from '@/views/about/history/components/milestone-card'

type MilestoneListProps = {
  milestones: IntroductionMilestone[]
}

const MilestoneList = ({ milestones }: MilestoneListProps) => {
  const ref = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState(-1)

  useEffect(() => {
    const list = ref.current
    if (!list) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number((entry.target as HTMLElement).dataset.index)
          if (entry.isIntersecting) setActive(index)
          else setActive((current) => (current === index ? -1 : current))
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    for (const item of list.children) observer.observe(item)

    return () => observer.disconnect()
  }, [milestones])

  return (
    <ol
      ref={ref}
      className='flex flex-col gap-[1.25rem] pr-[1.5rem] pl-[3.25rem]'
    >
      {milestones.map((milestone, index) => (
        <li
          key={`${index}-${milestone.year}`}
          data-index={index}
          className='relative'
        >
          <span className='absolute top-[1.6rem] left-[-1.85rem] size-[0.875rem] rounded-full border-2 border-[#C59B27] bg-white' />
          <Reveal variant='up'>
            <MilestoneCard
              milestone={milestone}
              index={index}
              active={active === index}
            />
          </Reveal>
        </li>
      ))}
    </ol>
  )
}

export default MilestoneList
