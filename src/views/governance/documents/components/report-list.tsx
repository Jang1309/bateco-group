import { REPORTS_PER_PAGE, type ReportsCategory } from '@/views/governance/data'

import GovernancePagination, { paginate } from './pagination'
import ReportCard from './report-card'

type ReportListProps = {
  category: ReportsCategory
  heading: string
  page: number
}

const ReportList = ({ category, heading, page }: ReportListProps) => {
  const {
    items: reports,
    currentPage,
    totalPages,
  } = paginate(category.reports, page, REPORTS_PER_PAGE)

  return (
    <>
      <h2 className='border-b border-[#EEF1F5] pb-[1.5rem] text-[1.75rem] font-bold text-[#0F5A3C] xsm:pb-[1rem] xsm:text-[1.375rem]'>
        {heading}
        <span
          aria-hidden
          className='mt-[0.5rem] block h-[0.1875rem] w-[3.5rem] bg-[linear-gradient(90deg,#DFBA73,#B5935E)]'
        />
      </h2>

      {reports.length > 0 ? (
        <ul
          key={`${category.id}-${currentPage}`}
          className='mt-[1.75rem] flex flex-col gap-[1.5rem] xsm:mt-[1.25rem] xsm:gap-[1rem]'
        >
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              category={category}
            />
          ))}
        </ul>
      ) : (
        <p className='py-[3rem] text-center text-[0.9375rem] text-[#64748B]'>
          Chưa có báo cáo nào trong danh mục này.
        </p>
      )}

      <GovernancePagination
        categoryId={category.id}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  )
}

export default ReportList
