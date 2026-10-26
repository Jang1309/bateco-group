'use client'

import { ArrowRight, Building2, MapPin, Wallet } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { hrefFor } from '@/configs/routes'
import { Link, toAppHref } from '@/i18n/navigation'
import type { CareerCardModel } from '@/views/careers/map-career'

type JobCardProps = {
  job: CareerCardModel
  index?: number
}

const JobCard = ({ job, index = 0 }: JobCardProps) => {
  const locale = useLocale()
  const t = useTranslations('Careers')
  const detailHref = toAppHref(hrefFor('careerDetail', locale, { slug: job.slug }))

  return (
    <div
      data-aos='business-rise'
      data-aos-duration='800'
      data-aos-delay={index * 80}
    >
      <article className='group flex items-center justify-between gap-[2rem] rounded-[1.25rem] bg-white p-[1.75rem] shadow-[0_0.75rem_2rem_-1.5rem_rgba(26,43,72,0.1)] ring-1 ring-[#1A2B48]/[0.06] transition-[box-shadow,translate] duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[0.25rem] hover:shadow-[0_2rem_3.5rem_-1.75rem_rgba(26,43,72,0.22)] xsm:flex-col xsm:items-stretch xsm:gap-[1.25rem] xsm:rounded-[1rem] xsm:p-[1.25rem] xsm:transition-none xsm:hover:translate-y-0 xsm:hover:shadow-[0_0.75rem_2rem_-1.5rem_rgba(26,43,72,0.1)]'>
        <div className='min-w-0 flex-1'>
          {job.type ? (
            <div className='flex flex-wrap items-center gap-[0.625rem]'>
              <span className='rounded-[0.25rem] bg-[#F1F4F8] px-[0.625rem] py-[0.25rem] text-[0.6875rem] font-bold tracking-[0.08em] text-[#1A2B48] uppercase'>
                {job.type}
              </span>
            </div>
          ) : null}

          <h3 className='mt-[0.875rem] text-[1.1875rem] leading-[1.35] font-bold tracking-[-0.01em] text-pretty text-[#1A2B48] uppercase transition-all duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-[#0F1C33] xsm:text-[1.0625rem]'>
            <Link
              href={detailHref}
              className='hover:text-[#B5935E] focus-visible:rounded-[0.25rem] focus-visible:ring-2 focus-visible:ring-[#B5935E] focus-visible:ring-offset-2 focus-visible:outline-none transition-all duration-300'
            >
              {job.title}
            </Link>
          </h3>

          <ul className='mt-[1.125rem] flex flex-wrap gap-x-[1.25rem] gap-y-[0.5rem] text-[0.8125rem] text-[#64748B]'>
            {job.department ? (
              <li className='inline-flex items-center gap-[0.375rem]'>
                <Building2
                  className='size-[0.875rem] text-[#B5935E]'
                  strokeWidth={1.5}
                />
                {job.department}
              </li>
            ) : null}
            {job.location ? (
              <li className='inline-flex items-center gap-[0.375rem]'>
                <MapPin
                  className='size-[0.875rem] text-[#B5935E]'
                  strokeWidth={1.5}
                />
                {job.location}
              </li>
            ) : null}
            {job.salary ? (
              <li className='inline-flex items-center gap-[0.375rem]'>
                <Wallet
                  className='size-[0.875rem] text-[#B5935E]'
                  strokeWidth={1.5}
                />
                {job.salary}
              </li>
            ) : null}
          </ul>
        </div>

        <Link
          href={toAppHref(hrefFor('careerDetail', locale, { slug: job.slug }))}
          className='inline-flex shrink-0 items-center gap-[0.75rem] rounded-full bg-[#1A2B48] py-[0.5rem] pr-[0.5rem] pl-[1.25rem] text-[0.8125rem] font-bold text-white transition-all duration-300 hover:bg-[#243656] focus-visible:ring-2 focus-visible:ring-[#B5935E] focus-visible:ring-offset-2 focus-visible:outline-none xsm:w-full xsm:justify-between'
        >
          {t('viewDetail')}
          <span
            aria-hidden
            className='flex size-[2rem] items-center justify-center rounded-full bg-white/10 transition-[transform,background-color] duration-300 group-hover:translate-x-[0.125rem] group-hover:bg-[#B5935E] xsm:transition-none xsm:group-hover:translate-x-0'
          >
            <ArrowRight className='size-[0.875rem]' />
          </span>
        </Link>
      </article>
    </div>
  )
}

export default JobCard
