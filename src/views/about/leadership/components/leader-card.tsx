import Image from 'next/image'

import type { IntroductionLeader } from '@/interfaces/introduction.interface'

const FALLBACK = '/gioi-thieu/placeholder-avatar.png'

type LeaderCardProps = {
  leader: IntroductionLeader
}

const LeaderCard = ({ leader }: LeaderCardProps) => {
  return (
    <article className='flex w-[20rem] shrink-0 flex-col items-center rounded-[0.9375rem] border border-[rgba(197,155,39,0.35)] bg-white p-[1.25rem] drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)] xsm:w-[14rem] xsm:p-[0.875rem]'>
      <div className='relative aspect-square w-full overflow-hidden rounded-[0.625rem] border border-[#F1F5F9] bg-[#F1F5F9]'>
        <Image
          src={leader.image || FALLBACK}
          alt={leader.name || ''}
          fill
          sizes='(max-width: 639px) 56vw, 18vw'
          className='object-cover'
        />
        <span
          aria-hidden
          className='pointer-events-none absolute inset-0 shadow-[inset_0_0.15625rem_0.3125rem_0.078rem_rgba(0,0,0,0.05)]'
        />
      </div>

      {leader.name ? (
        <p className='mt-[1.09rem] text-center text-[1.25rem] leading-[1.72rem] font-bold text-balance text-[#0B2545] xsm:text-[1rem]'>
          {leader.name}
        </p>
      ) : null}

      {leader.role ? (
        <div className='mt-[0.3125rem] flex flex-col items-center text-center'>
          <p className='text-[0.9375rem] leading-[1.25rem] font-bold tracking-[0.0234rem] text-[#C59B27] uppercase xsm:text-[0.6875rem] xsm:leading-[1.4]'>
            {leader.role}
          </p>
        </div>
      ) : null}
    </article>
  )
}

export default LeaderCard
