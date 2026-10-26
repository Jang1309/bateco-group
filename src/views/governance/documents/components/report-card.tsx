import { CalendarDays, Download, Eye } from 'lucide-react'
import { useTranslations } from 'next-intl'

import type { InvestorReport, ReportsCategory } from '@/views/governance/data'

import DocumentCover from './document-cover'

type ReportCardProps = {
  report: InvestorReport
  category: ReportsCategory
}

/**
 * Desktop: [bìa | thông tin + nút]. Mobile: [bìa nhỏ | thông tin], nút full width bên dưới.
 */
const ReportCard = ({ report, category }: ReportCardProps) => {
  const t = useTranslations('Governance')

  return (
    <li className='group grid grid-cols-[11rem_minmax(0,1fr)] gap-x-[2.5rem] gap-y-[1.5rem] rounded-[1rem] border border-[#EEF1F5] bg-white p-[1.75rem] transition-[box-shadow,border-color] duration-300 hover:border-[#E5D6B8] hover:shadow-[0_1rem_2.5rem_rgba(15,28,51,0.08)] xsm:grid-cols-[6.5rem_minmax(0,1fr)] xsm:gap-x-[1rem] xsm:gap-y-[1rem] xsm:rounded-[0.75rem] xsm:p-[1rem]'>
      <DocumentCover
        label={t('report')}
        title={category.coverTitle}
        year={report.period}
        image={report.cover}
        tone={category.coverTone}
        compactOnMobile
        className='row-span-2 self-center xsm:row-span-1 xsm:self-start'
      />

      <div className='self-end xsm:self-center'>
        <p className='text-[1.75rem] leading-none font-bold text-[#0F5A3C] xsm:text-[1.25rem]'>
          {report.period}
        </p>
        <span
          aria-hidden
          className='mt-[0.625rem] block h-[0.1875rem] w-[2.5rem] bg-[#B5935E] transition-[width] duration-500 ease-out group-hover:w-[4rem] xsm:mt-[0.5rem] xsm:h-[0.125rem] xsm:w-[1.75rem]'
        />

        <h3 className='mt-[1.25rem] text-[1.375rem] leading-[1.35] font-bold text-[#1A2B48] xsm:mt-[0.75rem] xsm:text-[1rem]'>
          {report.title}
        </h3>
        {report.theme ? (
          <p className='mt-[0.5rem] text-[0.8125rem] leading-[1.5] font-semibold tracking-[0.06em] text-[#B5935E] uppercase xsm:mt-[0.375rem] xsm:text-[0.6875rem] xsm:tracking-[0.03em]'>
            {t('topic')} “{report.theme}”
          </p>
        ) : null}
        <p className='mt-[0.75rem] flex flex-wrap items-center gap-x-[0.5rem] gap-y-[0.125rem] text-[0.8125rem] text-[#64748B] xsm:mt-[0.5rem] xsm:text-[0.75rem]'>
          <CalendarDays className='size-[0.9375rem] text-[#94A3B8] xsm:size-[0.8125rem]' />
          {t('published')}
          <time className='font-bold text-[#1A2B48]'>{report.publishedAt}</time>
        </p>
      </div>

      <div className='col-start-2 flex flex-wrap items-center gap-[0.75rem] self-start border-t border-[#EEF1F5] pt-[1.5rem] xsm:col-span-2 xsm:col-start-1 xsm:flex-col xsm:items-stretch xsm:gap-[0.5rem] xsm:pt-[1rem]'>
        <a
          href={report.file}
          download
          className='group/btn inline-flex items-center justify-center gap-[0.5rem] rounded-[0.5rem] bg-[linear-gradient(93deg,#C9A468_0%,#B5935E_55%,#9E7C48_100%)] px-[1.25rem] py-[0.75rem] text-[0.8125rem] font-bold text-white shadow-[0_0.5rem_1.25rem_rgba(181,147,94,0.3)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[0.125rem] hover:shadow-[0_0.75rem_1.5rem_rgba(181,147,94,0.4)] xsm:text-[0.875rem]'
        >
          <Download className='size-[0.9375rem] transition-transform duration-300 group-hover/btn:translate-y-[0.125rem]' />
          {t('download')} ({report.fileSize})
        </a>
        <a
          href={report.viewUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center justify-center gap-[0.5rem] rounded-[0.5rem] border border-[#D7DEE8] bg-white px-[1.25rem] py-[0.75rem] text-[0.8125rem] font-bold text-[#1A2B48] transition-colors duration-300 hover:border-[#0F5A3C] hover:text-[#0F5A3C] xsm:text-[0.875rem]'
        >
          <Eye className='size-[0.9375rem]' />
          {t('view')}
        </a>
      </div>
    </li>
  )
}

export default ReportCard
