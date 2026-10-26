import { ArrowLeft, Briefcase, Building2, GraduationCap, MapPin, Wallet } from 'lucide-react'

import DetailHero from '@/components/shared/detail-hero'
import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import ApplySection from '@/views/careers/detail/apply-section'
import type { CareerDetailModel } from '@/views/careers/map-career'

import './styles/styles.css'

type CareersDetailViewProps = {
  job: CareerDetailModel
  /** Ảnh banner từ trang danh sách cơ hội nghề nghiệp */
  bannerImage: string
}

const CareersDetailView = ({ job, bannerImage }: CareersDetailViewProps) => {
  const facts = [
    { label: 'Mức lương', value: job.salary, icon: Wallet },
    { label: 'Hình thức làm việc', value: job.type, icon: Briefcase },
    { label: 'Học vấn', value: job.education, icon: GraduationCap },
    { label: 'Địa điểm làm việc', value: job.location, icon: MapPin },
  ].filter((fact) => fact.value)

  return (
    <main className='xsm:pb-[5.5rem]'>
      <DetailHero
        image={bannerImage}
        eyebrow={job.type || 'Tuyển dụng'}
        title={job.title}
        titleClassName='business-hero-rise mt-[1rem] max-w-[36rem] text-[2.125rem] leading-[1.28] font-bold tracking-[-0.01em] text-pretty text-[#1A2B48] xsm:mt-[0.875rem] xsm:max-w-none xsm:text-[1.5rem] xsm:leading-[1.32]'
        meta={
          job.department ? (
            <span className='inline-flex items-center gap-[0.375rem] text-[0.8125rem] font-medium text-[#64748B]'>
              <Building2
                className='size-[0.875rem] text-[#B5935E]'
                strokeWidth={1.5}
              />
              {job.department}
            </span>
          ) : undefined
        }
      />

      <article className='career-detail-content'>
        <div className='career-detail-content__inner !grid !max-w-[95rem] grid-cols-[minmax(0,54rem)_26rem] justify-center gap-[4rem] !px-[3.75rem] xlg:grid-cols-1 xlg:gap-[2rem] xsm:!px-[1rem]'>
          <div className='career-detail-content__article-wrap w-full'>
            <div className='career-detail-content__article'>
              {facts.length > 0 ? (
                <ul className='mb-[2.5rem] grid grid-cols-2 gap-[0.75rem] xsm:grid-cols-1'>
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
                          <span className='block text-[0.6875rem] text-[#64748B]'>
                            {fact.label}:
                          </span>
                          <span className='mt-[0.125rem] block text-[0.875rem] font-bold text-[#1A2B48]'>
                            {fact.value}
                          </span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              ) : null}

              {job.content ? (
                <div
                  id='career_detail'
                  dangerouslySetInnerHTML={{ __html: job.content }}
                />
              ) : (
                <p className='text-[0.9375rem] text-[#64748B]'>Nội dung đang được cập nhật.</p>
              )}

              <div className='mt-[3.5rem] border-t border-[#E2E8F0] pt-[1.5rem]'>
                <Link
                  href={ROUTES.careers}
                  className='group inline-flex items-center gap-[0.5rem] text-[0.875rem] font-bold text-[#1A2B48] transition-colors duration-300 hover:text-[#B5935E]'
                >
                  <ArrowLeft className='size-[1rem] transition-transform duration-300 group-hover:-translate-x-[0.1875rem]' />
                  Quay lại danh sách tuyển dụng
                </Link>
              </div>
            </div>
          </div>

          <ApplySection jobTitle={job.title} />
        </div>
      </article>
    </main>
  )
}

export default CareersDetailView
