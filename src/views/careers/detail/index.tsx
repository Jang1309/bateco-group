import { ArrowLeft, Briefcase, Building2, GraduationCap, MapPin, Wallet } from 'lucide-react'

import DetailHero from '@/components/shared/detail-hero'
import { Link } from '@/i18n/navigation'
import type { Job } from '@/views/careers/data'
import ApplyForm from '@/views/careers/detail/apply-form'

type CareersDetailViewProps = {
  job: Job
}

const CareersDetailView = ({ job }: CareersDetailViewProps) => {
  const facts = [
    { label: 'Mức lương', value: job.salary, icon: Wallet },
    { label: 'Hình thức làm việc', value: job.type, icon: Briefcase },
    { label: 'Học vấn', value: job.education, icon: GraduationCap },
    { label: 'Địa điểm làm việc', value: job.location, icon: MapPin },
  ]

  return (
    <main>
      <DetailHero
        image='/home/vision/d-img-2.jpg'
        eyebrow={job.type}
        title={job.title}
        titleClassName='business-hero-rise mt-[1rem] text-[2.5rem] leading-[1.22] font-bold tracking-[-0.015em] text-balance text-[#1A2B48] uppercase xsm:text-[1.5rem]'
        meta={
          <span className='inline-flex items-center gap-[0.375rem] font-medium text-[#475569]'>
            <Building2
              className='size-[0.875rem] text-[#B5935E]'
              strokeWidth={1.75}
            />
            {job.department}
          </span>
        }
      />

      <section className='bg-white pt-[3rem] pb-[5rem] xsm:pt-[2rem] xsm:pb-[3rem]'>
        <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
          <ul className='grid grid-cols-4 gap-[0.75rem] xsm:grid-cols-1'>
            {facts.map((fact) => {
              const Icon = fact.icon
              return (
                <li
                  key={fact.label}
                  className='flex items-start gap-[0.75rem] rounded-[0.75rem] bg-[#F3F7FB] px-[1rem] py-[0.875rem]'
                >
                  <Icon
                    className='mt-[0.125rem] size-[1.0625rem] shrink-0 text-[#1A2B48]'
                    strokeWidth={1.5}
                  />
                  <span className='min-w-0'>
                    <span className='block text-[0.6875rem] text-[#64748B]'>{fact.label}:</span>
                    <span className='mt-[0.125rem] block text-[0.875rem] font-bold text-[#1A2B48]'>
                      {fact.value}
                    </span>
                  </span>
                </li>
              )
            })}
          </ul>

          <div className='mt-[3rem] grid grid-cols-[minmax(0,1fr)_26rem] items-start gap-[3rem] xlg:grid-cols-1 xlg:gap-[2rem]'>
            <div className='min-w-0'>
              {/* content là HTML từ CMS nội bộ (nguồn tin cậy) */}
              <div
                className='news-content [&>h2:first-child]:mt-0'
                dangerouslySetInnerHTML={{ __html: job.content }}
              />
              <div className='mt-[3rem] border-t border-[#E2E8F0] pt-[1.5rem]'>
                <Link
                  href='/careers'
                  className='group inline-flex items-center gap-[0.5rem] text-[0.875rem] font-bold text-[#1A2B48] transition-colors duration-300 hover:text-[#B5935E]'
                >
                  <ArrowLeft className='size-[1rem] transition-transform duration-300 group-hover:-translate-x-[0.125rem] xsm:transition-none' />
                  Quay lại danh sách tuyển dụng
                </Link>
              </div>
            </div>

            <aside className='min-w-0 lg:sticky lg:top-[7rem]'>
              <ApplyForm jobTitle={job.title} />
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CareersDetailView
