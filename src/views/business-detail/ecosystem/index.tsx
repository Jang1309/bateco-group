import type { Ecosystem } from '@/interfaces/siteSetting.interface'

import Member from './components/member'
import MemberMarquee from './components/member-marquee'
import Stat from './components/stat'

type SectorEcosystemProps = {
  data?: Ecosystem
}

const SectorEcosystem = ({ data }: SectorEcosystemProps) => {
  if (!data) return null

  const stats = data.stats?.filter((stat) => stat.value || stat.label) ?? []
  const members = data.members?.filter(Boolean) ?? []
  const useMarquee = members.length > 4

  return (
    <section className='bg-white px-[3.75rem] py-[5.5rem] xsm:px-[1.25rem] xsm:py-[3rem]'>
      <div className='mx-auto max-w-[75rem] text-center'>
        {data.title ? (
          <h2
            data-aos='business-rise'
            data-aos-duration='800'
            className='text-[2.5rem] leading-[1.25] font-bold tracking-[0.02em] text-[#1A2B48] uppercase text-pretty xsm:text-[1.25rem] xsm:leading-[1.35] xsm:tracking-[0.01em]'
          >
            {data.title}
          </h2>
        ) : null}

        {stats.length > 0 ? (
          <dl className='mx-auto mt-[3rem] grid max-w-[44rem] grid-cols-2 xsm:mt-[2rem]'>
            {stats.map((stat, index) => (
              <Stat
                key={stat.label || index}
                stat={stat}
                index={index}
              />
            ))}
          </dl>
        ) : null}

        {members.length > 0 ? (
          useMarquee ? (
            <MemberMarquee members={members} />
          ) : (
            <ul className='mt-[3.5rem] grid grid-cols-4 gap-[1.25rem] xsm:mt-[2.5rem] xsm:grid-cols-2 xsm:gap-[0.75rem]'>
              {members.map((logo, index) => (
                <Member
                  key={`${logo}-${index}`}
                  logo={logo}
                  index={index}
                />
              ))}
            </ul>
          )
        ) : null}

        {data.footnote ? (
          <p className='mx-auto mt-[1.5rem] max-w-[46rem] text-[0.8125rem] leading-[1.6] text-[#94A3B8]'>
            {data.footnote}
          </p>
        ) : null}
      </div>
    </section>
  )
}

export default SectorEcosystem
