import Image from 'next/image'

import { cn } from '@/lib/utils'
import Reveal from '@/views/about/components/reveal'
import type { AboutPillar } from '@/views/about/data'

const SLANTS = [
  '[clip-path:polygon(7.8rem_0,100%_0,100%_100%,0_100%)]',
  '[clip-path:polygon(0_0,100%_0,100%_100%,7.8rem_100%)]',
]

type PillarRowProps = {
  pillar: AboutPillar
  index: number
}

const PillarRow = ({ pillar, index }: PillarRowProps) => {
  const imageFirst = index % 2 === 1

  return (
    <article
      className={cn(
        'group flex min-h-[40.625rem] overflow-hidden last:min-h-[42.1875rem] xsm:min-h-0 xsm:flex-col-reverse xsm:last:min-h-0',
        imageFirst ? 'flex-row-reverse bg-white' : 'flex-row',
      )}
    >
      <div
        className={cn(
          'relative z-[1] flex items-center py-[6.25rem] xsm:px-[1.5rem] xsm:py-[2.5rem]',
          imageFirst ? 'flex-1 pr-[3.125rem] pl-[5rem]' : 'basis-[52.34%] pr-[3.75rem] pl-[7.5rem]',
        )}
      >
        <div className='flex max-w-[45rem] flex-col gap-[0.9375rem]'>
          <Reveal
            variant='left'
            className='flex items-center gap-[0.625rem] text-[0.9375rem] leading-[1.25rem] tracking-[0.2em] text-[#B9935A] uppercase xsm:text-[0.75rem]'
          >
            <span>{pillar.index}</span>
            <span className='h-px w-[1.875rem] bg-[#B9935A]' />
            <span>{pillar.label}</span>
          </Reveal>

          <Reveal
            variant='up'
            delay={0.1}
          >
            <h2 className='flex flex-wrap items-baseline gap-x-[0.3125rem] text-[4.6875rem] leading-none tracking-[-0.025em] text-[#111E30] xsm:text-[2.5rem]'>
              {pillar.title}
              <span
                aria-hidden
                className='text-[rgba(30,41,59,0.4)]'
              >
                —
              </span>
            </h2>
          </Reveal>

          <Reveal
            variant='up'
            delay={0.2}
          >
            <p className='max-w-[35rem] pt-[0.9375rem] text-[1.40625rem] leading-[2.1875rem] text-[#55606D] xsm:pt-[0.5rem] xsm:text-[1rem] xsm:leading-[1.6]'>
              {pillar.description}
            </p>
          </Reveal>
        </div>
      </div>

      <div
        className={cn(
          'relative overflow-hidden bg-[#0B1626] xsm:h-[15rem] xsm:flex-none xsm:[clip-path:none]',
          imageFirst ? 'basis-[52.03%]' : cn('flex-1', SLANTS[(index / 2) % SLANTS.length]),
        )}
      >
        <Reveal
          variant='wipe'
          className='absolute inset-0'
        >
          <Image
            src={pillar.image.src}
            alt={pillar.image.alt}
            fill
            sizes='(max-width: 639px) 100vw, 48vw'
            className='object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]'
          />
        </Reveal>
        <div className='pointer-events-none absolute inset-0 bg-[#EDEDED] mix-blend-multiply' />
      </div>
    </article>
  )
}

export default PillarRow
