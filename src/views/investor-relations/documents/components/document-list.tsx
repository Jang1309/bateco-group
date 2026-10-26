'use client'

import { useTranslations } from 'next-intl'

import type { InvestorRelationsListItem } from '@/interfaces/investorRelations.interface'
import DocumentsPagination from '@/views/about-governance/documents/components/pagination'

import DocumentItem from './document-item'

type DocumentListProps = {
  title: string
  categorySlug: string
  page: number
  documents: InvestorRelationsListItem[]
  totalPages: number
  isLoading: boolean
  onPageChange: (page: number) => void
}

const DocumentList = ({
  title,
  categorySlug,
  page,
  documents,
  totalPages,
  isLoading,
  onPageChange,
}: DocumentListProps) => {
  const t = useTranslations('Investor')

  return (
    <div className='rounded-[0.75rem] border border-[#EEF1F5] bg-white px-[2rem] py-[2.25rem] shadow-[0_0.5rem_1.5rem_rgba(15,28,51,0.05)] xsm:px-[1rem] xsm:py-[1.5rem]'>
      <h2 className='border-b border-[#EEF1F5] pb-[1.5rem] text-[1.5rem] font-bold text-[#1A2B48] xsm:pb-[1rem] xsm:text-[1.25rem]'>
        {title}
      </h2>

      {isLoading && documents.length === 0 ? (
        <p className='py-[3rem] text-center text-[0.9375rem] text-[#64748B]'>{t('loading')}</p>
      ) : documents.length > 0 ? (
        <ul key={`${categorySlug}-${page}`}>
          {documents.map((document) => (
            <DocumentItem
              key={document.id}
              document={document}
            />
          ))}
        </ul>
      ) : (
        <p className='py-[3rem] text-center text-[0.9375rem] text-[#64748B]'>{t('empty')}</p>
      )}

      <DocumentsPagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default DocumentList
