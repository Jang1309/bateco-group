'use client'

import CountUp from '@/components/shared/count-up'
import type { AdministrativeDocumentHeroStat } from '@/interfaces/administrativeDocument.interface'

type HeroStatsProps = {
  stats: AdministrativeDocumentHeroStat[]
}

const HeroStats = ({ stats }: HeroStatsProps) => {
  if (!stats.length) return null

  return (
    <dl className='mt-[2rem] grid max-w-[26rem] grid-cols-2 gap-x-[2.5rem] gap-y-[1.5rem] xsm:mt-[1.25rem] xsm:max-w-none xsm:gap-x-[1.25rem] xsm:gap-y-[1rem]'>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className='flex flex-col-reverse border-l-[0.1875rem] border-[#1A2B48] pl-[1rem] xsm:pl-[0.75rem]'
        >
          <dt className='mt-[0.25rem] text-[0.875rem] font-medium text-[#475569] xsm:text-[0.8125rem]'>
            {stat.label}
          </dt>
          <dd className='text-[2rem] leading-[1.1] font-bold text-[#1A2B48] xsm:text-[1.625rem]'>
            {stat.value ? (
              <CountUp
                value={stat.value}
                delay={0.4}
              />
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export default HeroStats
