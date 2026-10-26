import { CalendarDays, Download, Eye, FileText, Languages } from 'lucide-react'
import { useTranslations } from 'next-intl'

import type { ProfileCategory } from '@/views/governance/data'

import DocumentCover from './document-cover'
import OwnershipRing from './ownership-ring'

type CompanyProfileProps = {
  category: ProfileCategory
}

const CompanyProfile = ({ category }: CompanyProfileProps) => {
  const t = useTranslations('Governance')
  const { profile } = category

  return (
    <>
      <h2 className='text-[1.75rem] font-bold text-[#0F5A3C] xsm:text-[1.375rem]'>
        {category.title}
        <span
          aria-hidden
          className='mt-[0.5rem] block h-[0.1875rem] w-[3.5rem] bg-[linear-gradient(90deg,#DFBA73,#B5935E)]'
        />
      </h2>

      <div className='mt-[2rem] grid grid-cols-[minmax(0,1fr)_17rem] gap-[1.5rem] xsm:grid-cols-1 xsm:gap-[1rem]'>
        {/* Card hồ sơ */}
        <article className='group relative overflow-hidden rounded-[1rem] border border-[#EEF1F5] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FAFC_55%,#FBF6EC_100%)] p-[2rem] xsm:p-[1.25rem]'>
          <div
            aria-hidden
            className='pointer-events-none absolute -top-[6rem] -right-[6rem] size-[16rem] rounded-full bg-[radial-gradient(circle,rgba(223,186,115,0.22)_0%,rgba(223,186,115,0)_70%)]'
          />

          <div className='relative grid grid-cols-[11rem_minmax(0,1fr)] items-center gap-[2.25rem] xsm:grid-cols-1 xsm:justify-items-center xsm:gap-[1.75rem] xsm:text-center'>
            <DocumentCover
              label='Company'
              title='Profile'
              year='2026'
            />

            {/* Thông tin */}
            <div>
              <p className='text-[0.6875rem] font-bold tracking-[0.2em] text-[#B5935E] uppercase'>
                {t('companyDocs')}
              </p>
              <h3 className='mt-[0.5rem] text-[1.5rem] leading-[1.3] font-bold text-[#1A2B48] xsm:text-[1.25rem]'>
                {profile.title}
              </h3>
              <p className='mt-[0.75rem] max-w-[28rem] text-[0.875rem] leading-[1.65] text-[#475569]'>
                {profile.description}
              </p>

              <ul className='mt-[1.25rem] flex flex-wrap gap-[0.5rem] xsm:justify-center'>
                {[
                  { icon: FileText, label: profile.format },
                  { icon: CalendarDays, label: profile.updatedAt },
                  { icon: Languages, label: profile.languages },
                ].map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className='inline-flex items-center gap-[0.375rem] rounded-full border border-[#E2E8F0] bg-white px-[0.75rem] py-[0.375rem] text-[0.75rem] font-medium text-[#475569]'
                  >
                    <Icon className='size-[0.8125rem] text-[#B5935E]' />
                    {label}
                  </li>
                ))}
              </ul>

              <div className='mt-[1.75rem] flex flex-wrap items-center gap-[0.75rem] xsm:mt-[1.5rem] xsm:flex-col xsm:items-stretch xsm:gap-[0.625rem]'>
                <a
                  href={profile.file}
                  download
                  className='group/btn inline-flex items-center justify-center gap-[0.5rem] rounded-[0.5rem] bg-[linear-gradient(93deg,#C9A468_0%,#B5935E_55%,#9E7C48_100%)] px-[1.375rem] py-[0.75rem] text-[0.8125rem] font-bold text-white shadow-[0_0.5rem_1.25rem_rgba(181,147,94,0.35)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[0.125rem] hover:shadow-[0_0.75rem_1.5rem_rgba(181,147,94,0.45)]'
                >
                  <Download className='size-[0.9375rem] transition-transform duration-300 group-hover/btn:translate-y-[0.125rem]' />
                  {t('download')}
                </a>
                <a
                  href={profile.viewUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center justify-center gap-[0.5rem] rounded-[0.5rem] border border-[#D7DEE8] bg-white px-[1.375rem] py-[0.75rem] text-[0.8125rem] font-bold text-[#1A2B48] transition-colors duration-300 hover:border-[#0F5A3C] hover:text-[#0F5A3C]'
                >
                  <Eye className='size-[0.9375rem]' />
                  {t('view')}
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Tỷ lệ sở hữu */}
        <aside className='flex flex-col items-center justify-center rounded-[1rem] border border-[#EEF1F5] bg-white px-[1.5rem] py-[2rem] text-center xsm:flex-row xsm:gap-[1.25rem] xsm:p-[1.25rem] xsm:text-left'>
          <OwnershipRing value={profile.ownership.value} />
          <div className='mt-[1.25rem] xsm:mt-0 xsm:flex-1'>
            <p className='text-[0.9375rem] leading-[1.5] font-bold text-balance text-[#1A2B48] xsm:text-pretty'>
              {profile.ownership.label}
            </p>
            <p className='mt-[0.5rem] text-[0.75rem] leading-[1.6] text-[#64748B] italic'>
              {profile.ownership.note}
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}

export default CompanyProfile
