'use client'

import { useLenis } from 'lenis/react'
import { useTranslations } from 'next-intl'
import { useQueryStates } from 'nuqs'

import SectionHeading from '@/components/shared/section-heading'
import { sectionId } from '@/configs/section-ids'
import { useProjects } from '@/hooks/use-projects'
import type { SectorItem } from '@/interfaces/projects.interface'
import { scrollToSection } from '@/utils/scrollToSection'
import { mapProjectListItem } from '@/views/projects/map-project'
import { projectsSearchParams } from '@/views/projects/search-params'

import FilterTabs from './components/filter-tabs'
import ProjectPagination from './components/pagination'
import ProjectCard from './components/project-card'
import { ProjectListSkeleton } from './components/project-card-skeleton'
import SearchSort from './components/search-sort'

const LIMIT = 6

type Sector = SectorItem & { slug: string; name: string }

type ProjectListingProps = {
  locale: string
  sectors: SectorItem[]
}

const normalizeSectors = (sectors: SectorItem[]): Sector[] =>
  sectors.filter((item): item is Sector => Boolean(item.slug && item.name))

const ProjectListing = ({ locale, sectors }: ProjectListingProps) => {
  const t = useTranslations('Projects')
  const lenis = useLenis()
  const list = normalizeSectors(sectors)
  const [{ 'linh-vuc': sector, q, 'sap-xep': sort, trang: page }, setQuery] = useQueryStates(
    projectsSearchParams,
    { history: 'push', shallow: true },
  )

  const category = list.some((item) => item.slug === sector) ? (sector ?? undefined) : undefined
  const order = sort === 'cu-nhat' ? 'ASC' : 'DESC'

  const { data, isLoading, isValidating } = useProjects({
    lang: locale,
    paged: page,
    limit: LIMIT,
    category,
    order,
    search: q ?? undefined,
  })

  const projects = (data?.data ?? []).map(mapProjectListItem).filter(Boolean) as NonNullable<
    ReturnType<typeof mapProjectListItem>
  >[]
  const showSkeleton = isLoading || (isValidating && projects.length === 0)
  const totalPages = Math.max(1, data?.totalPages ?? 1)
  const offset = (Math.max(1, page) - 1) * LIMIT
  const listingSectionId = sectionId('projectsListing', locale)

  const scrollToListing = () => {
    const el = document.getElementById(listingSectionId)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -96, duration: 0.8 })
    else scrollToSection(listingSectionId, 0.6, 6)
  }

  const selectSector = (next?: string) => {
    void setQuery({ 'linh-vuc': next ?? null, trang: 1 })
    scrollToListing()
  }

  const setSearch = (next?: string) => {
    void setQuery({ q: next?.trim() ? next.trim() : null, trang: 1 })
  }

  const setSort = (next: 'moi-nhat' | 'cu-nhat') => {
    void setQuery({ 'sap-xep': next, trang: 1 })
    scrollToListing()
  }

  const goToPage = (nextPage: number) => {
    void setQuery({ trang: nextPage <= 1 ? 1 : nextPage })
    scrollToListing()
  }

  return (
    <section
      id={listingSectionId}
      className='scroll-mt-[6rem] border-t border-[#EEF1F5] bg-[#FAFBFC] pt-[5rem] pb-[6rem] xsm:pt-[3rem] xsm:pb-[3.5rem]'
    >
      <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
        <SectionHeading title={t('other')} />

        <div
          data-aos='business-rise'
          data-aos-duration='800'
          className='mt-[2.5rem] flex flex-col gap-[1.25rem] xsm:mt-[1.5rem] xsm:gap-[1rem]'
        >
          <FilterTabs
            sectors={list}
            current={category}
            onSelect={selectSector}
          />
          <SearchSort
            search={q ?? ''}
            sort={sort}
            onSearch={setSearch}
            onSort={setSort}
          />
        </div>

        {showSkeleton ? (
          <ProjectListSkeleton count={LIMIT} />
        ) : projects.length > 0 ? (
          <ul className='mt-[2.5rem] grid grid-cols-3 gap-[1.75rem] xsm:mt-[1.5rem] xsm:grid-cols-1 xsm:gap-[1rem]'>
            {projects.map((project, index) => (
              <li
                key={project.id}
                className='business-hero-rise'
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <ProjectCard
                  project={project}
                  number={offset + index + 1}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className='mt-[2.5rem] rounded-[0.75rem] border border-dashed border-[#E2E8F0] bg-white py-[4rem] text-center text-[0.9375rem] text-[#64748B]'>
            {t('empty')}
          </p>
        )}

        {!showSkeleton ? (
          <ProjectPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        ) : null}
      </div>
    </section>
  )
}

export default ProjectListing
