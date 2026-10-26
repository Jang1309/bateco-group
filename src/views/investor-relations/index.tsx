import { Suspense } from 'react'

import type {
  InvestorRelationsCategoryItem,
  InvestorRelationsResponse,
} from '@/interfaces/investorRelations.interface'
import InvestorRelationsDocuments from '@/views/investor-relations/documents'
import InvestorHero from '@/views/investor-relations/hero'

type InvestorRelationsViewProps = {
  locale: string
  content?: InvestorRelationsResponse
  categories: InvestorRelationsCategoryItem[]
}

const DocumentsFallback = () => (
  <section
    id='van-ban'
    className='bg-[#FAFBFC] pt-[1.5rem] pb-[6rem] xsm:pb-[3.5rem]'
  >
    <p className='mx-auto max-w-[95rem] px-[3.75rem] py-[3rem] text-center text-[0.9375rem] text-[#64748B] xsm:px-[1.25rem]'>
      Đang tải…
    </p>
  </section>
)

const InvestorRelationsView = ({ locale, content, categories }: InvestorRelationsViewProps) => {
  return (
    <main>
      <InvestorHero data={content?.banner} />
      <Suspense fallback={<DocumentsFallback />}>
        <InvestorRelationsDocuments
          locale={locale}
          categories={categories}
        />
      </Suspense>
    </main>
  )
}

export default InvestorRelationsView
