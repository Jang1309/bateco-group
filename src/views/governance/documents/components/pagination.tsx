import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import type { GovernanceBasePath } from '@/views/governance/base-path'

type PaginationProps = {
  categoryId: string
  currentPage: number
  totalPages: number
  basePath?: GovernanceBasePath
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage))
  const currentPage = Math.min(Math.max(1, page), totalPages)

  return {
    items: items.slice((currentPage - 1) * perPage, currentPage * perPage),
    currentPage,
    totalPages,
  }
}

const baseItem =
  'inline-flex h-[2rem] min-w-[2rem] items-center justify-center gap-[0.25rem] rounded-[0.375rem] border px-[0.625rem] text-[0.8125rem] font-semibold transition-colors duration-300 xsm:h-[2.5rem] xsm:min-w-[2.5rem] xsm:px-[0.875rem] xsm:text-[0.875rem]'

const GovernancePagination = ({
  categoryId,
  currentPage,
  totalPages,
  basePath = '/quan-he-nha-dau-tu',
}: PaginationProps) => {
  const t = useTranslations('Common.pagination')

  if (totalPages <= 1) return null

  const hrefFor = (page: number) => ({
    pathname: basePath,
    query: page === 1 ? { 'danh-muc': categoryId } : { 'danh-muc': categoryId, trang: page },
  })

  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <nav
      aria-label={t('label')}
      className='mt-[2rem] flex items-center justify-end gap-[0.5rem] xsm:justify-center'
    >
      {hasPrev ? (
        <Link
          href={hrefFor(currentPage - 1)}
          scroll={false}
          className={cn(
            baseItem,
            'border-[#E2E8F0] text-[#1A2B48] hover:border-[#0F5A3C] hover:text-[#0F5A3C]',
          )}
        >
          <ChevronLeft className='size-[0.875rem]' />
          {t('prev')}
        </Link>
      ) : (
        <span className={cn(baseItem, 'cursor-not-allowed border-[#EEF1F5] text-[#B8C0CC]')}>
          <ChevronLeft className='size-[0.875rem]' />
          {t('prev')}
        </span>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={hrefFor(page)}
          scroll={false}
          aria-current={page === currentPage ? 'page' : undefined}
          className={cn(
            baseItem,
            page === currentPage
              ? 'border-[#0F5A3C] bg-[#0F5A3C] text-white'
              : 'border-[#E2E8F0] text-[#1A2B48] hover:border-[#0F5A3C] hover:text-[#0F5A3C]',
          )}
        >
          {page}
        </Link>
      ))}

      {hasNext ? (
        <Link
          href={hrefFor(currentPage + 1)}
          scroll={false}
          className={cn(
            baseItem,
            'border-[#E2E8F0] text-[#1A2B48] hover:border-[#0F5A3C] hover:text-[#0F5A3C]',
          )}
        >
          {t('nextAlt')}
          <ChevronRight className='size-[0.875rem]' />
        </Link>
      ) : (
        <span className={cn(baseItem, 'cursor-not-allowed border-[#EEF1F5] text-[#B8C0CC]')}>
          {t('nextAlt')}
          <ChevronRight className='size-[0.875rem]' />
        </span>
      )}
    </nav>
  )
}

export default GovernancePagination
