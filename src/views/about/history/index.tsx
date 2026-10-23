import Image from 'next/image'

import Reveal from '@/views/about/components/reveal'
import type { AboutHistory as AboutHistoryData } from '@/views/about/data'
import GrowthTimeline from '@/views/about/history/components/growth-timeline'
import MilestoneList from '@/views/about/history/components/milestone-list'

type AboutHistoryProps = {
  history: AboutHistoryData
}

const AboutHistory = ({ history }: AboutHistoryProps) => {
  return (
    <section
      id='lich-su'
      className='relative h-[67.27rem] scroll-mt-[6rem] overflow-hidden border-t border-b-[0.234rem] border-t-[rgba(232,223,208,0.6)] border-b-[#E5E7EB] bg-[#FDFBF7] bg-[radial-gradient(ellipse_26.8rem_24.77rem_at_10%_20%,rgba(197,155,39,0.04),transparent),radial-gradient(ellipse_37.6rem_34.6rem_at_90%_80%,rgba(11,27,43,0.03),transparent),linear-gradient(90deg,rgba(232,223,208,0.3)_1px,transparent_1px),linear-gradient(180deg,rgba(232,223,208,0.3)_1px,transparent_1px)] bg-[size:auto,auto,4.6875rem_4.6875rem,4.6875rem_4.6875rem] xsm:h-auto xsm:pb-[3rem]'
    >
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 opacity-30 xsm:hidden'
      >
        <Image
          src='/gioi-thieu/history/sketch-skyscraper.svg'
          alt=''
          width={750}
          height={422}
          className='absolute top-[-1.8rem] left-[25rem] h-[32.96rem] w-[58.6rem] drop-shadow-[0_0.3125rem_0.47rem_rgba(197,155,39,0.15)]'
        />
        <Image
          src='/gioi-thieu/history/sketch-industrial.svg'
          alt=''
          width={620}
          height={362}
          className='absolute right-0 bottom-[-2.5rem] h-[28.3rem] w-[48.4375rem] drop-shadow-[0_0.3125rem_0.47rem_rgba(197,155,39,0.15)]'
        />
        <Image
          src='/gioi-thieu/history/flying-cranes.svg'
          alt=''
          width={144}
          height={108}
          className='absolute top-[8.83rem] left-[5rem] h-[8.44rem] w-[11.25rem]'
        />
      </div>

      <div className='relative z-[1] flex items-center justify-between px-[5rem] pt-[4.0625rem] pb-[1.25rem] xsm:flex-col xsm:items-start xsm:gap-[1.25rem] xsm:px-[1.5rem] xsm:pt-[3rem]'>
        <Reveal
          variant='left'
          className='flex items-center gap-[0.9375rem] pt-[1.3rem] xsm:pt-0'
        >
          <span className='h-[0.156rem] w-[2.5rem] bg-[#C59B27]' />
          <span className='text-[1.17rem] leading-[1.25rem] font-bold text-[#C59B27] uppercase xsm:text-[0.8125rem]'>
            {history.eyebrow}
          </span>
        </Reveal>
        <Reveal variant='unveil'>
          <div className='flex flex-col items-end xsm:items-start'>
            <p className='flex items-center gap-[0.625rem] pb-[0.3125rem] text-[1.09rem] leading-[1.5625rem] font-bold text-[#64748B] uppercase xsm:text-[0.8125rem]'>
              <span className='size-[0.625rem] rounded-full bg-[#C59B27]' />
              {history.kicker}
            </p>
            <h2 className='text-[3.75rem] leading-none font-bold tracking-[-0.094rem] text-[#0B1B2B] xsm:text-[2.25rem] xsm:leading-[1.15]'>
              {history.title}{' '}
              <span className='bg-[linear-gradient(90deg,#C59B27,#F59E0B_50%,#9A7416)] bg-clip-text font-normal text-transparent'>
                {history.highlight}
              </span>
            </h2>
          </div>
        </Reveal>
      </div>

      {history.milestones.length > 0 ? <GrowthTimeline milestones={history.milestones} /> : null}

      <div className='relative mt-[1.5rem] hidden xsm:block'>
        <Reveal
          variant='grow-y'
          className='absolute top-0 bottom-0 left-[1.75rem] w-[0.125rem] origin-top bg-[linear-gradient(180deg,#C59B27,#E5B94B)]'
        />
        <MilestoneList milestones={history.milestones} />
      </div>
    </section>
  )
}

export default AboutHistory
