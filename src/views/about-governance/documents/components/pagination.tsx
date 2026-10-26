'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import ReactPaginate from 'react-paginate'

import { cn } from '@/lib/utils'

type DocumentsPaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

const item =
  'inline-flex h-[2rem] min-w-[2rem] items-center justify-center gap-[0.25rem] rounded-[0.375rem] border px-[0.625rem] text-[0.8125rem] font-semibold transition-colors duration-300 xsm:h-[2.5rem] xsm:min-w-[2.5rem] xsm:px-[0.875rem] xsm:text-[0.875rem]'

const DocumentsPagination = ({ page, totalPages, onPageChange }: DocumentsPaginationProps) => {
  const t = useTranslations('Common.pagination')

  if (totalPages <= 1) return null

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={Math.max(0, page - 1)}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      previousLabel={
        <>
          <ChevronLeft className='size-[0.875rem]' />
          {t('prev')}
        </>
      }
      nextLabel={
        <>
          {t('nextAlt')}
          <ChevronRight className='size-[0.875rem]' />
        </>
      }
      breakLabel='…'
      containerClassName='mt-[2rem] flex list-none items-center justify-end gap-[0.5rem] p-0 xsm:justify-center'
      pageClassName='list-none'
      pageLinkClassName={cn(
        item,
        'border-[#E2E8F0] text-[#1A2B48] hover:border-[#0F5A3C] hover:text-[#0F5A3C]',
      )}
      activeLinkClassName='!border-[#0F5A3C] !bg-[#0F5A3C] !text-white'
      previousClassName='list-none'
      nextClassName='list-none'
      previousLinkClassName={cn(
        item,
        'border-[#E2E8F0] text-[#1A2B48] hover:border-[#0F5A3C] hover:text-[#0F5A3C]',
      )}
      nextLinkClassName={cn(
        item,
        'border-[#E2E8F0] text-[#1A2B48] hover:border-[#0F5A3C] hover:text-[#0F5A3C]',
      )}
      disabledLinkClassName='!cursor-not-allowed !border-[#EEF1F5] !text-[#B8C0CC] hover:!border-[#EEF1F5] hover:!text-[#B8C0CC]'
      breakClassName='list-none'
      breakLinkClassName={cn(item, 'border-transparent text-[#64748B]')}
      ariaLabelBuilder={(n) => `Trang ${n}`}
    />
  )
}

export default DocumentsPagination
