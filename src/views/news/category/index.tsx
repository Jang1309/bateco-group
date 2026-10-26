'use client'

import { useLenis } from 'lenis/react'
import { useQueryStates } from 'nuqs'
import { Suspense } from 'react'

import { useNewsPosts } from '@/hooks/use-news-posts'
import type { NewsPageBanner } from '@/interfaces/postList.interface'
import { scrollToSection } from '@/utils/scrollToSection'
import ArticleCard from '@/views/news/components/article-card'
import type { NewsCategory } from '@/views/news/data'
import NewsHero from '@/views/news/hero'
import { mapPostListItems } from '@/views/news/map-post'
import { newsSearchParams } from '@/views/news/search-params'
import ProjectPagination from '@/views/projects/listing/components/pagination'

import { ArticleListSkeleton } from './components/article-card-skeleton'
import EmptyState from './components/empty-state'
import FilterTabs from './components/filter-tabs'

const LIMIT = 9
const LISTING_ID = 'tin-tuc-danh-sach'

type NewsCategoryViewProps = {
  locale: string
  categories: NewsCategory[]
  banner?: NewsPageBanner
}

const NewsCategoryListing = ({ locale, categories, banner }: NewsCategoryViewProps) => {
  const lenis = useLenis()
  const [{ 'danh-muc': categorySlug, trang: page }, setQuery] = useQueryStates(newsSearchParams, {
    history: 'push',
    shallow: true,
  })

  const activeCategory = categories.find((item) => item.id === categorySlug)
  const category = activeCategory?.id

  const { data, isLoading, isValidating } = useNewsPosts({
    lang: locale,
    paged: page,
    limit: LIMIT,
    category,
  })

  const articles = mapPostListItems(data?.data)
  const showSkeleton = isLoading || (isValidating && articles.length === 0)
  const totalPages = Math.max(1, data?.totalPages ?? 1)

  const scrollToListing = () => {
    const el = document.getElementById(LISTING_ID)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -96, duration: 0.8 })
    else scrollToSection(LISTING_ID, 0.6, 6)
  }

  const selectCategory = (next?: string) => {
    void setQuery({ 'danh-muc': next ?? null, trang: 1 })
    scrollToListing()
  }

  const goToPage = (nextPage: number) => {
    void setQuery({ trang: nextPage <= 1 ? 1 : nextPage })
    scrollToListing()
  }

  return (
    <>
      <NewsHero data={banner} />

      <section
        id={LISTING_ID}
        className='scroll-mt-[6rem] border-t border-[#EEF1F5] bg-[#FAFBFC] pt-[3.5rem] pb-[6rem] xsm:pt-[2rem] xsm:pb-[3.5rem]'
      >
        <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
          <FilterTabs
            categories={categories}
            current={category}
            onSelect={selectCategory}
          />

          {showSkeleton ? (
            <ArticleListSkeleton count={LIMIT} />
          ) : articles.length > 0 ? (
            <>
              <ul className='mt-[2.5rem] grid grid-cols-3 gap-[2rem] xsm:mt-[1.5rem] xsm:grid-cols-1 xsm:gap-[1.25rem]'>
                {articles.map((article, index) => (
                  <li
                    key={article.id}
                    data-aos='business-rise'
                    data-aos-duration='800'
                    data-aos-delay={(index % 3) * 100}
                    className='flex'
                  >
                    <ArticleCard article={article} />
                  </li>
                ))}
              </ul>

              <ProjectPagination
                currentPage={Math.min(page, totalPages)}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            </>
          ) : (
            <EmptyState
              categoryTitle={activeCategory?.title}
              onBrowseAll={category ? () => selectCategory(undefined) : undefined}
            />
          )}
        </div>
      </section>
    </>
  )
}

const ListingFallback = ({ banner }: { banner?: NewsPageBanner }) => (
  <>
    <NewsHero data={banner} />
    <section className='border-t border-[#EEF1F5] bg-[#FAFBFC] pt-[3.5rem] pb-[6rem] xsm:pt-[2rem] xsm:pb-[3.5rem]'>
      <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
        <ArticleListSkeleton count={LIMIT} />
      </div>
    </section>
  </>
)

const NewsCategoryView = (props: NewsCategoryViewProps) => {
  return (
    <main>
      <Suspense fallback={<ListingFallback banner={props.banner} />}>
        <NewsCategoryListing {...props} />
      </Suspense>
    </main>
  )
}

export default NewsCategoryView
