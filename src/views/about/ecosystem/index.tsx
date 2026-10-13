import { cn } from '@/lib/utils'
import Reveal from '@/views/about/components/reveal'
import type { AboutEcosystem as AboutEcosystemData } from '@/views/about/data'
import CompanyLists from '@/views/about/ecosystem/components/company-lists'
import OrbitDiagram from '@/views/about/ecosystem/components/orbit-diagram'

type AboutEcosystemProps = {
  ecosystem: AboutEcosystemData
}

const AboutEcosystem = ({ ecosystem }: AboutEcosystemProps) => {
  return (
    <section className='bg-[#FAFAF8] px-[4.375rem] py-[5.3rem] xsm:px-[1.5rem] xsm:py-[3rem]'>
      <div className='mx-auto grid max-w-[91.4rem] grid-cols-12 items-center gap-[3.75rem] xsm:grid-cols-1 xsm:gap-[2.5rem]'>
        <div className='col-span-5 pr-[1.25rem] pl-[3.125rem] xsm:col-span-1 xsm:px-0'>
          <Reveal variant='left'>
            <h2 className='text-[3.4375rem] leading-none tracking-[-0.086rem] text-[#1E2633] xsm:text-[2.25rem]'>
              {ecosystem.title}
            </h2>
          </Reveal>

          <Reveal
            variant='up'
            delay={0.1}
            className='mt-[3.125rem] flex border-y border-[rgba(222,205,184,0.6)] py-[1.875rem] xsm:mt-[1.75rem] xsm:py-[1.25rem]'
          >
            {ecosystem.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  'flex flex-1 flex-col gap-[0.625rem]',
                  index > 0
                    ? 'border-l border-[rgba(222,205,184,0.6)] pl-[2.58rem] xsm:pl-[1.25rem]'
                    : 'pr-[1.875rem]',
                )}
              >
                <p className='text-[3.75rem] leading-none font-bold tracking-[-0.094rem] text-[#B88E56] tabular-nums xsm:text-[2.5rem]'>
                  {stat.value}
                </p>
                <p className='text-[0.9375rem] leading-[1.25rem] font-bold tracking-[0.047rem] text-[#2A3443] uppercase xsm:text-[0.75rem]'>
                  {stat.label}
                </p>
              </div>
            ))}
          </Reveal>

          <CompanyLists groups={ecosystem.groups} />
        </div>

        <div className='col-span-7 flex justify-center py-[2.5rem] xsm:col-span-1 xsm:py-0'>
          <OrbitDiagram satellites={ecosystem.satellites} />
        </div>
      </div>
    </section>
  )
}

export default AboutEcosystem
