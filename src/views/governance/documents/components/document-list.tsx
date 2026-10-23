import type { GovernanceBasePath } from '@/views/governance/base-path'
import { DOCUMENTS_PER_PAGE, type DocumentsCategory } from '@/views/governance/data'

import DocumentItem from './document-item'
import GovernancePagination, { paginate } from './pagination'

type DocumentListProps = {
  category: DocumentsCategory
  page: number
  basePath?: GovernanceBasePath
}

const DocumentList = ({ category, page, basePath }: DocumentListProps) => {
  const {
    items: documents,
    currentPage,
    totalPages,
  } = paginate(category.documents, page, DOCUMENTS_PER_PAGE)

  return (
    <>
      <h2 className='border-b border-[#EEF1F5] pb-[1.5rem] text-[1.5rem] font-bold text-[#1A2B48] xsm:pb-[1rem] xsm:text-[1.25rem]'>
        {category.title}
      </h2>

      {documents.length > 0 ? (
        <ul key={`${category.id}-${currentPage}`}>
          {documents.map((document) => (
            <DocumentItem
              key={document.id}
              document={document}
            />
          ))}
        </ul>
      ) : (
        <p className='py-[3rem] text-center text-[0.9375rem] text-[#64748B]'>
          Chưa có văn bản nào trong danh mục này.
        </p>
      )}

      <GovernancePagination
        categoryId={category.id}
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={basePath}
      />
    </>
  )
}

export default DocumentList
