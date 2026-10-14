import Reveal from '@/views/about/components/reveal'
import type { AboutLeadership as AboutLeadershipData } from '@/views/about/data'
import ChairmanCard from '@/views/about/leadership/components/chairman-card'
import TeamMarquee from '@/views/about/leadership/components/team-marquee'

type AboutLeadershipProps = {
  leadership: AboutLeadershipData
}

const AboutLeadership = ({ leadership }: AboutLeadershipProps) => {
  return (
    <section className='bg-[linear-gradient(180deg,#F6F3EC_0,#F6F3EC_24rem,#fff_24rem)] pt-[1.40625rem] pb-[1.875rem] xsm:bg-[linear-gradient(180deg,#F6F3EC_0,#F6F3EC_14rem,#fff_14rem)] xsm:pt-[2.5rem]'>
      <div className='flex flex-col items-center gap-[3.75rem] px-[1.875rem] xsm:gap-[2rem] xsm:px-[1.5rem]'>
        <div className='flex flex-col items-center gap-[0.625rem] pt-[0.7rem] text-center'>
          <Reveal
            variant='up'
            className='flex items-center gap-[0.625rem]'
          >
            <span className='h-[0.156rem] w-[2.5rem] bg-[#C59B27]' />
            <span className='text-[0.9375rem] leading-[1.25rem] font-bold tracking-[0.234rem] text-[#C59B27] uppercase xsm:text-[0.6875rem]'>
              {leadership.eyebrow}
            </span>
            <span className='h-[0.156rem] w-[2.5rem] bg-[#C59B27]' />
          </Reveal>
          <Reveal
            variant='up'
            delay={0.1}
          >
            <h2 className='pb-[0.625rem] text-[3.75rem] leading-none font-bold tracking-[-0.094rem] text-[#0B2545] uppercase xsm:text-[1.75rem] xsm:leading-[1.2]'>
              {leadership.title}
            </h2>
          </Reveal>
          <Reveal
            variant='grow-x'
            delay={0.25}
            className='h-[0.3125rem] w-[7.5rem] rounded-full bg-[linear-gradient(90deg,rgba(197,155,39,0),#C59B27_50%,rgba(197,155,39,0))]'
          />
        </div>

        <ChairmanCard chairman={leadership.chairman} />
      </div>

      <div className='mt-[1.25rem] flex flex-col gap-[1.875rem] pt-[1.25rem] xsm:mt-[2.5rem] xsm:gap-[1rem] xsm:pt-0'>
        <Reveal
          variant='left'
          className='mx-auto w-full max-w-[96.25rem] px-[0.3125rem] xsm:px-[1.5rem]'
        >
          <h3 className='text-[1.875rem] leading-[2.5rem] font-bold text-[#0B2545] xsm:text-[1.25rem] xsm:leading-[1.4]'>
            {leadership.teamTitle}
          </h3>
        </Reveal>
        <div className='px-[0.625rem] xsm:px-0'>
          <TeamMarquee team={leadership.team} />
        </div>
      </div>
    </section>
  )
}

export default AboutLeadership
