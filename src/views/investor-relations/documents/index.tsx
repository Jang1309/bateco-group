'use client'

import { useLenis } from 'lenis/react'
import { useQueryStates } from 'nuqs'
import { useEffect } from 'react'

import { useInvestorDocuments } from '@/hooks/use-investor-documents'
import type { InvestorRelationsCategoryItem } from '@/interfaces/investorRelations.interface'
import { scrollToSection } from '@/utils/scrollToSection'
import { investorRelationsSearchParams } from '@/views/investor-relations/search-params'

import DocumentList from './components/document-list'
import DocumentsSidebar from './components/sidebar'

const LIMIT = 6

type Category = InvestorRelationsCategoryItem & { slug: string; name: string }

type InvestorRelationsDocumentsProps = {
  locale: string
  categories: InvestorRelationsCategoryItem[]
}

const normalizeCategories = (categories: InvestorRelationsCategoryItem[]): Category[] =>
  categories.filter((item): item is Category => Boolean(item.slug && item.name))

/** Danh mục chọn được: leaf (không có con) hoặc từng con trong group */
const getSelectableCategories = (categories: Category[]): Category[] => {
  const result: Category[] = []

  for (const item of categories) {
    const children = (item.children ?? []).filter((child): child is Category =>
      Boolean(child.slug && child.name),
    )
    if (children.length > 0) result.push(...children)
    else result.push(item)
  }

  return result
}

const findActiveCategory = (selectable: Category[], slug?: string | null) =>
  selectable.find((item) => item.slug === slug) ?? selectable[0]

const InvestorRelationsDocuments = ({ locale, categories }: InvestorRelationsDocumentsProps) => {
  const lenis = useLenis()
  const list = normalizeCategories(categories)
  const selectable = getSelectableCategories(list)
  const [{ 'danh-muc': categorySlug, trang: page }, setQuery] = useQueryStates(
    investorRelationsSearchParams,
    { history: 'push', shallow: true },
  )

  const active = findActiveCategory(selectable, categorySlug)
  const category = active?.slug

  // Lần đầu vào trang: ghi danh-muc mặc định lên URL
  useEffect(() => {
    if (active && !categorySlug) {
      void setQuery({ 'danh-muc': active.slug })
    }
  }, [active, categorySlug, setQuery])

  const { data, isLoading } = useInvestorDocuments({
    lang: locale,
    paged: page,
    limit: LIMIT,
    category,
  })

  const documents = data?.data ?? []
  const totalPages = Math.max(1, data?.totalPages ?? 1)

  const scrollToDocs = () => {
    const el = document.getElementById('van-ban')
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -96, duration: 0.8 })
    else scrollToSection('van-ban', 0.6, 6)
  }

  const selectCategory = (slug: string) => {
    void setQuery({ 'danh-muc': slug, trang: 1 })
    scrollToDocs()
  }

  const goToPage = (nextPage: number) => {
    void setQuery({ trang: nextPage <= 1 ? 1 : nextPage })
    scrollToDocs()
  }

  if (!active) {
    return (
      <section
        id='van-ban'
        className='bg-[#FAFBFC] pt-[1.5rem] pb-[6rem] xsm:pb-[3.5rem]'
      >
        <p className='mx-auto max-w-[95rem] px-[3.75rem] py-[3rem] text-center text-[0.9375rem] text-[#64748B] xsm:px-[1.25rem]'>
          Chưa có danh mục tài liệu.
        </p>
      </section>
    )
  }

  return (
    <section
      id='van-ban'
      className='bg-[#FAFBFC] pt-[1.5rem] pb-[6rem] xsm:pb-[3.5rem]'
    >
      <div className='mx-auto grid max-w-[95rem] grid-cols-[20rem_1fr] items-start gap-[2rem] px-[3.75rem] xsm:grid-cols-1 xsm:gap-[1rem] xsm:px-[1.25rem]'>
        <div
          data-aos='business-rise'
          data-aos-duration='800'
          className='self-stretch xsm:self-auto'
        >
          <DocumentsSidebar
            categories={list}
            activeSlug={active.slug}
            onSelect={selectCategory}
          />
        </div>

        <div
          data-aos='business-rise'
          data-aos-duration='800'
          data-aos-delay='100'
        >
          <DocumentList
            title={active.name}
            categorySlug={active.slug}
            page={page}
            documents={documents}
            totalPages={totalPages}
            isLoading={isLoading}
            onPageChange={goToPage}
          />
        </div>
      </div>
    </section>
  )
}

export default InvestorRelationsDocuments
