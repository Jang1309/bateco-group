import Image from 'next/image'

import type { IntroductionChairman } from '@/interfaces/introduction.interface'
import Reveal from '@/views/about/components/reveal'

const FALLBACK = '/gioi-thieu/placeholder-avatar.png'

type ChairmanCardProps = {
  chairman: IntroductionChairman
}

const ChairmanCard = ({ chairman }: ChairmanCardProps) => (
  <Reveal
    variant='up'
    className='w-full max-w-[74.375rem]'
  >
    <article className='relative flex items-center justify-center gap-[1.875rem] overflow-hidden rounded-[1.25rem] border border-[rgba(197,155,39,0.7)] bg-white p-[2.5rem] shadow-[0_0.3125rem_1.875rem_0_rgba(0,0,0,0.03)] xsm:flex-col xsm:gap-[1.5rem] xsm:p-[1.25rem]'>
      <span
        aria-hidden
        className='pointer-events-none absolute -top-[3.75rem] -right-[3.75rem] size-[8.75rem] rounded-full bg-[linear-gradient(135deg,rgba(254,243,199,0.4)_0%,rgba(254,243,199,0)_50%)]'
      />

      <div className='relative h-[29.375rem] w-[25.23rem] shrink-0 overflow-hidden rounded-[0.9375rem] border border-[rgba(226,232,240,0.8)] bg-[#F1F5F9] p-px xsm:h-[22rem] xsm:w-full'>
        <Reveal
          variant='wipe'
          delay={0.15}
          className='absolute inset-px overflow-hidden rounded-[0.875rem]'
        >
          <Image
            src={chairman.image || FALLBACK}
            alt={chairman.name || ''}
            fill
            sizes='(max-width: 639px) 90vw, 26vw'
            className='object-cover object-[50%_28%]'
          />
        </Reveal>
        <span
          aria-hidden
          className='pointer-events-none absolute inset-0 rounded-[0.9375rem] shadow-[inset_0_0.15625rem_0.3125rem_0.078rem_rgba(0,0,0,0.05)]'
        />
      </div>

      <div className='flex w-[33.2rem] flex-col items-center justify-center gap-[2.89rem] xsm:w-full xsm:gap-[1.5rem]'>
        <Reveal
          variant='up'
          delay={0.2}
          className='flex flex-col items-center gap-[0.3125rem] text-center'
        >
          {chairman.name ? (
            <h3 className='text-[1.875rem] leading-[2.5rem] font-bold text-[#0B2545] xsm:text-[1.375rem] xsm:leading-[1.4]'>
              {chairman.name}
            </h3>
          ) : null}
          <div className='flex flex-col items-start gap-[0.55rem] pt-[0.234rem]'>
            {chairman.role ? (
              <p className='text-[1.09375rem] leading-[1.5625rem] font-bold tracking-[0.0547rem] text-[#C59B27] uppercase xsm:text-[0.8125rem]'>
                {chairman.role}
              </p>
            ) : null}
            <span className='h-[0.156rem] w-[3.75rem] bg-[#C59B27]' />
          </div>
          {chairman.quote ? (
            <p className='max-w-[20rem] pt-[0.9375rem] text-[1.25rem] leading-[1.875rem] text-[#475569] italic xsm:text-[0.9375rem] xsm:leading-[1.6]'>
              {chairman.quote}
            </p>
          ) : null}
        </Reveal>

        {chairman.signature ? (
          <div className='flex w-full justify-end border-t border-[#F1F5F9] pt-[1.95rem] xsm:pt-[1rem]'>
            <p className='text-[0.9375rem] leading-[1.25rem] text-[#C59B27] uppercase xsm:text-[0.75rem]'>
              {chairman.signature}
            </p>
          </div>
        ) : null}
      </div>
    </article>
  </Reveal>
)

export default ChairmanCard
