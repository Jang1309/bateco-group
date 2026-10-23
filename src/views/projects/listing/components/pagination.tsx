import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

import { buildProjectQuery, type ProjectQuery } from '../query'

type ProjectPaginationProps = {
  current: ProjectQuery
  currentPage: number
  totalPages: number
}

const PILL =
  'inline-flex h-[2.5rem] min-w-[2.5rem] items-center justify-center rounded-full border px-[1rem] text-[0.875rem] font-semibold transition-colors duration-300'

const ProjectPagination = ({ current, currentPage, totalPages }: ProjectPaginationProps) => {
  if (totalPages <= 1) return null

  const hrefFor = (page: number) => ({
    pathname: '/du-an' as const,
    query: buildProjectQuery({ ...current, page }),
  })

  const edge = (page: number, label: string, disabled: boolean) =>
    disabled ? (
      <span className={cn(PILL, 'cursor-not-allowed border-[#EEF1F5] text-[#CBD2DC]')}>
        {label}
      </span>
    ) : (
      <Link
        href={hrefFor(page)}
        scroll={false}
        className={cn(PILL, 'border-[#E2E8F0] text-[#1A2B48] hover:border-[#1A2B48]')}
      >
        {label}
      </Link>
    )

  return (
    <nav
      aria-label='Phân trang'
      className='mt-[3.5rem] flex items-center justify-center gap-[0.5rem] xsm:mt-[2.5rem]'
    >
      {edge(currentPage - 1, 'Trước', currentPage <= 1)}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={hrefFor(page)}
          scroll={false}
          aria-current={page === currentPage ? 'page' : undefined}
          className={cn(
            PILL,
            'px-0',
            page === currentPage
              ? 'border-[#1A2B48] bg-[#1A2B48] text-white'
              : 'border-[#E2E8F0] text-[#1A2B48] hover:border-[#1A2B48]',
          )}
        >
          {page}
        </Link>
      ))}
      {edge(currentPage + 1, 'Sau', currentPage >= totalPages)}
    </nav>
  )
}

export default ProjectPagination
