'use client'

import { useLenis } from 'lenis/react'
import { useTranslations } from 'next-intl'
import { useQueryStates } from 'nuqs'
import { useEffect } from 'react'

import { sectionId } from '@/configs/section-ids'
import { useDocuments } from '@/hooks/use-documents'
import type { AdministrativeDocumentCategoryItem } from '@/interfaces/administrativeDocument.interface'
import { scrollToSection } from '@/utils/scrollToSection'
import { aboutGovernanceSearchParams } from '@/views/about-governance/search-params'

import DocumentList from './components/document-list'
import DocumentsSidebar from './components/sidebar'

const LIMIT = 6

type Category = AdministrativeDocumentCategoryItem & { slug: string; name: string }

type AboutGovernanceDocumentsProps = {
  locale: string
  categories: AdministrativeDocumentCategoryItem[]
}

const normalizeCategories = (categories: AdministrativeDocumentCategoryItem[]): Category[] =>
  categories.filter((item): item is Category => Boolean(item.slug && item.name))

const AboutGovernanceDocuments = ({ locale, categories }: AboutGovernanceDocumentsProps) => {
  const t = useTranslations('AboutGovernance')
  const lenis = useLenis()
  const list = normalizeCategories(categories)
  const [{ 'danh-muc': categorySlug, trang: page }, setQuery] = useQueryStates(
    aboutGovernanceSearchParams,
    { history: 'push', shallow: true },
  )

  const active = list.find((item) => item.slug === categorySlug) ?? list[0]
  const category = active?.slug

  // Lần đầu vào trang: ghi danh-muc mặc định lên URL
  useEffect(() => {
    if (active && !categorySlug) {
      void setQuery({ 'danh-muc': active.slug })
    }
  }, [active, categorySlug, setQuery])

  const { data, isLoading } = useDocuments({
    lang: locale,
    paged: page,
    limit: LIMIT,
    category,
  })

  const documents = data?.data ?? []
  const totalPages = Math.max(1, data?.totalPages ?? 1)
  const docsSectionId = sectionId('documents', locale)

  const scrollToDocs = () => {
    const el = document.getElementById(docsSectionId)
    if (!el) return
    // desktop có Lenis; mobile dùng gsap scrollToSection
    if (lenis) lenis.scrollTo(el, { offset: -96, duration: 0.8 })
    else scrollToSection(docsSectionId, 0.6, 6)
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
        id={docsSectionId}
        className='bg-[#FAFBFC] pt-[1.5rem] pb-[6rem] xsm:pb-[3.5rem]'
      >
        <p className='mx-auto max-w-[95rem] px-[3.75rem] py-[3rem] text-center text-[0.9375rem] text-[#64748B] xsm:px-[1.25rem]'>
          {t('empty')}
        </p>
      </section>
    )
  }

  return (
    <section
      id={docsSectionId}
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

export default AboutGovernanceDocuments
