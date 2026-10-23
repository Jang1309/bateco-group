'use client'

import { useTranslations } from 'next-intl'
import { useId, useState } from 'react'

import { cn } from '@/lib/utils'
import Reveal from '@/views/about/components/reveal'
import type { AboutCompanyGroup } from '@/views/about/data'

type CompanyListsProps = {
  groups: AboutCompanyGroup[]
}

const CompanyLists = ({ groups }: CompanyListsProps) => {
  const t = useTranslations('AboutPage')
  const [open, setOpen] = useState(true)
  const panelId = useId()

  return (
    <>
      <Reveal
        variant='up'
        delay={0.15}
        className='mt-[2.1875rem] flex justify-center'
      >
        <button
          type='button'
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className='rounded-full border border-[#B88E56] px-[2.58rem] py-[0.7rem] text-[0.86rem] leading-[1.29rem] font-bold tracking-[0.043rem] text-[#353D4A] uppercase transition-colors duration-300 hover:bg-[#B88E56] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B88E56] xsm:text-[0.75rem]'
        >
          {open ? t('collapse') : t('expand')}
        </button>
      </Reveal>

      <div
        id={panelId}
        role='region'
        aria-label={t('companyLists')}
        inert={!open}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className='min-h-0 overflow-hidden'>
          <div className='flex flex-col gap-[2.1875rem] pt-[2.5rem] xsm:pt-[1.75rem]'>
            {groups.map((group, groupIndex) => (
              <Reveal
                key={`${groupIndex}-${group.title}`}
                variant='up'
              >
                <h3 className='text-[0.9375rem] leading-[1.25rem] font-bold tracking-[0.047rem] text-[#B88E56] uppercase xsm:text-[0.75rem]'>
                  {group.title}
                </h3>
                <ol className='mt-[1.09rem] grid grid-cols-2 xsm:grid-cols-1'>
                  {group.companies.map((company, index) => (
                    <li
                      key={`${company}-${index}`}
                      className={cn(
                        'flex items-center py-[0.625rem]',
                        index > 1 && 'border-t border-[#EFE7DC]',
                        index > 0 && 'xsm:border-t xsm:border-[#EFE7DC]',
                        index % 2 === 0 ? 'pr-[0.625rem] xsm:pr-0' : 'pl-[0.625rem] xsm:pl-0',
                      )}
                    >
                      <span className='w-[1.5625rem] shrink-0 text-[0.9375rem] leading-[1.25rem] font-bold text-[#B88E56] xsm:w-[1.5rem] xsm:text-[0.75rem]'>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className='pl-[0.9375rem] text-[0.977rem] leading-[1.587rem] text-[#333C48] xsm:pl-[0.5rem] xsm:text-[0.8125rem]'>
                        {company}
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default CompanyLists
