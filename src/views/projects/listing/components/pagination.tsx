import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type ProjectPaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const PILL =
  'inline-flex h-[2.5rem] min-w-[2.5rem] items-center justify-center rounded-full border px-[1rem] text-[0.875rem] font-semibold transition-colors duration-300 xsm:h-[2.75rem] xsm:min-w-[2.75rem]'

/** Desktop: hiện đủ số trang. Mobile: chỉ Trước / trang hiện tại / Sau để tránh tràn. */
const ProjectPagination = ({ currentPage, totalPages, onPageChange }: ProjectPaginationProps) => {
  const t = useTranslations('Common.pagination')

  if (totalPages <= 1) return null

  const edge = (page: number, label: ReactNode, disabled: boolean, ariaLabel: string) =>
    disabled ? (
      <span
        aria-disabled
        className={cn(PILL, 'cursor-not-allowed border-[#EEF1F5] text-[#CBD2DC]')}
      >
        {label}
      </span>
    ) : (
      <button
        type='button'
        aria-label={ariaLabel}
        onClick={() => onPageChange(page)}
        className={cn(
          PILL,
          'cursor-pointer border-[#E2E8F0] text-[#1A2B48] hover:border-[#1A2B48]',
        )}
      >
        {label}
      </button>
    )

  return (
    <nav
      aria-label={t('label')}
      className='mt-[3.5rem] flex items-center justify-center gap-[0.5rem] xsm:mt-[2rem] xsm:justify-between'
    >
      {edge(
        currentPage - 1,
        <>
          <ChevronLeft
            aria-hidden
            className='hidden size-[1rem] xsm:block'
          />
          <span className='xsm:hidden'>{t('prev')}</span>
        </>,
        currentPage <= 1,
        t('prevPage'),
      )}

      {/* Desktop page numbers */}
      <div className='flex items-center gap-[0.5rem] xsm:hidden'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            type='button'
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={cn(
              PILL,
              'cursor-pointer px-0',
              page === currentPage
                ? 'border-[#1A2B48] bg-[#1A2B48] text-white'
                : 'border-[#E2E8F0] text-[#1A2B48] hover:border-[#1A2B48]',
            )}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Mobile current page */}
      <p className='hidden text-[0.875rem] font-semibold tabular-nums text-[#1A2B48] xsm:block'>
        <span className='text-[#B5935E]'>{currentPage}</span>
        <span className='mx-[0.35rem] text-[#94A3B8]'>/</span>
        {totalPages}
      </p>

      {edge(
        currentPage + 1,
        <>
          <span className='xsm:hidden'>{t('next')}</span>
          <ChevronRight
            aria-hidden
            className='hidden size-[1rem] xsm:block'
          />
        </>,
        currentPage >= totalPages,
        t('nextPage'),
      )}
    </nav>
  )
}

export default ProjectPagination
