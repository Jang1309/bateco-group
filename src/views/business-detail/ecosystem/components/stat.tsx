'use client'

import CountUp from '@/components/shared/count-up'
import type { EcosystemStat } from '@/interfaces/siteSetting.interface'

type StatProps = {
  stat: EcosystemStat
  index: number
}

const Stat = ({ stat, index }: StatProps) => {
  return (
    <div
      data-aos='business-rise'
      data-aos-duration='800'
      data-aos-delay={index * 120}
      className='flex flex-col-reverse items-center border-r border-[#EADFC8] last:border-r-0'
    >
      {stat.label ? (
        <dt className='mt-[0.5rem] text-[0.75rem] font-bold tracking-[0.18em] text-[#64748B] uppercase'>
          {stat.label}
        </dt>
      ) : null}
      {stat.value ? (
        <dd className='text-[3.5rem] leading-none font-bold text-[#1A2B48] xsm:text-[2rem]'>
          <CountUp
            value={stat.value}
            delay={0.15 + index * 0.1}
          />
        </dd>
      ) : null}
    </div>
  )
}

export default Stat
