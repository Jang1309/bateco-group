'use client'

import {
  Building2,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
} from 'lucide-react'
import { useQueryStates } from 'nuqs'
import { useEffect, useState } from 'react'

import DrawerProvider from '@/components/providers/drawer-provider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCareers } from '@/hooks/use-careers'
import type { CareersTaxonomyItem } from '@/interfaces/careers.interface'
import { cn } from '@/lib/utils'
import { JOBS_PER_PAGE } from '@/views/careers/data'
import JobCard from '@/views/careers/job-card'
import { mapCareerListItem, type CareerCardModel } from '@/views/careers/map-career'
import { careersSearchParams } from '@/views/careers/search-params'

const ALL = 'all'

const SELECT_TRIGGER =
  'cursor-pointer rounded-[0.5rem] border-[#E2E8F0] bg-white px-[1rem] text-[0.875rem] font-medium text-[#1A2B48] focus-visible:border-[#C6A15B] focus-visible:ring-[#C6A15B]/20 data-[size=default]:h-[2.875rem] data-[state=open]:border-[#C6A15B] [&_svg]:text-[#64748B]'

const SELECT_CONTENT =
  'min-w-[14rem] rounded-[0.5rem] border border-[#EEF1F5] p-[0.25rem] shadow-[0_0.75rem_2rem_rgba(15,28,51,0.12)] ring-0'

const SELECT_ITEM =
  'cursor-pointer rounded-[0.375rem] py-[0.625rem] pl-[0.75rem] text-[0.875rem] text-[#1A2B48] focus:bg-[#F7F9FB] focus:text-[#1A2B48] not-data-[variant=destructive]:focus:**:text-[#1A2B48] data-[state=checked]:bg-[#F7F9FB] data-[state=checked]:font-semibold'

type FilterKey = 'department' | 'location'

type TaxOption = { slug: string; name: string }

type FilterConfig = {
  key: FilterKey
  queryKey: 'phong-ban' | 'dia-diem'
  label: string
  allLabel: string
  options: TaxOption[]
  icon: typeof Building2
  width: string
}

const flattenTaxonomies = (items: CareersTaxonomyItem[] = []): TaxOption[] => {
  const result: TaxOption[] = []

  const walk = (nodes: CareersTaxonomyItem[]) => {
    for (const node of nodes) {
      if (node.slug && node.name) result.push({ slug: node.slug, name: node.name })
      if (node.children?.length) walk(node.children)
    }
  }

  walk(items)
  return result
}

const JobCardSkeleton = () => (
  <div className='h-[8.5rem] animate-pulse rounded-[1.25rem] bg-white ring-1 ring-[#1A2B48]/[0.06] xsm:h-[12rem] xsm:rounded-[1rem]' />
)

type CareersJobsProps = {
  locale: string
  departments?: CareersTaxonomyItem[]
  locations?: CareersTaxonomyItem[]
}

const CareersJobs = ({ locale, departments = [], locations = [] }: CareersJobsProps) => {
  const [{ 'phong-ban': deptSlug, 'dia-diem': locSlug, q, trang: page }, setQuery] = useQueryStates(
    careersSearchParams,
    { history: 'push', shallow: true },
  )

  const departmentOptions = flattenTaxonomies(departments)
  const locationOptions = flattenTaxonomies(locations)

  const department = departmentOptions.some((item) => item.slug === deptSlug)
    ? (deptSlug ?? undefined)
    : undefined
  const location = locationOptions.some((item) => item.slug === locSlug)
    ? (locSlug ?? undefined)
    : undefined

  const searchFromUrl = q ?? ''
  const [keyword, setKeyword] = useState(searchFromUrl)
  const [prevSearch, setPrevSearch] = useState(searchFromUrl)
  const [drawer, setDrawer] = useState<FilterKey | null>(null)

  // Đồng bộ khi URL đổi (back/forward) — adjust state khi render, không dùng effect
  if (searchFromUrl !== prevSearch) {
    setPrevSearch(searchFromUrl)
    setKeyword(searchFromUrl)
  }

  useEffect(() => {
    const next = keyword.trim()
    const current = searchFromUrl.trim()
    if (next === current) return
    const timer = setTimeout(() => {
      void setQuery({ q: next || null, trang: 1 })
    }, 400)
    return () => clearTimeout(timer)
  }, [keyword, searchFromUrl, setQuery])

  const { data, isLoading, isValidating } = useCareers({
    lang: locale,
    paged: page,
    limit: JOBS_PER_PAGE,
    location,
    department,
    search: q ?? undefined,
  })

  const jobs = (data?.data ?? [])
    .map(mapCareerListItem)
    .filter((item): item is CareerCardModel => item !== null)

  const showSkeleton = isLoading || (isValidating && jobs.length === 0)
  const total = data?.total ?? jobs.length
  const totalPages = Math.max(1, data?.totalPages ?? 1)
  const currentPage = Math.min(Math.max(1, page), totalPages)

  const filters: FilterConfig[] = [
    {
      key: 'department',
      queryKey: 'phong-ban',
      label: 'Phòng ban',
      allLabel: 'Tất cả phòng ban',
      options: departmentOptions,
      icon: Building2,
      width: 'w-[14rem]',
    },
    {
      key: 'location',
      queryKey: 'dia-diem',
      label: 'Địa điểm',
      allLabel: 'Tất cả địa điểm',
      options: locationOptions,
      icon: MapPin,
      width: 'w-[13rem]',
    },
  ]

  const filterValue = (key: FilterKey) => {
    if (key === 'department') return department ?? ALL
    return location ?? ALL
  }

  const setFilter = (key: FilterKey, value: string) => {
    const next = value === ALL ? null : value
    if (key === 'department') void setQuery({ 'phong-ban': next, trang: 1 })
    else void setQuery({ 'dia-diem': next, trang: 1 })
  }

  const goToPage = (nextPage: number) => {
    void setQuery({ trang: nextPage <= 1 ? 1 : nextPage })
  }

  const activeFilter = drawer ? filters.find((item) => item.key === drawer) : null
  const activeValue = drawer ? filterValue(drawer) : ALL

  return (
    <section
      id='vi-tri-tuyen-dung'
      className='scroll-mt-[6rem] bg-[#FAFBFC] py-[5rem] xsm:py-[3rem]'
    >
      <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
        <div className='max-w-[40rem]'>
          <h2 className='text-[2rem] leading-[1.3] font-bold tracking-[-0.015em] text-[#1A2B48] xsm:text-[1.5rem]'>
            Vị trí đang tuyển dụng
          </h2>
          <p className='mt-[0.625rem] text-[0.9375rem] leading-[1.65] text-[#64748B] xsm:text-[0.875rem]'>
            Khám phá cơ hội phát triển cùng chúng tôi trong các dự án sắp tới.
          </p>
        </div>

        <div className='mt-[2rem] flex flex-wrap items-center gap-[0.75rem] rounded-[0.875rem] border border-[#EEF1F5] bg-white p-[0.75rem] shadow-[0_0.75rem_2rem_-1.25rem_rgba(26,43,72,0.18)] xsm:mt-[1.5rem] xsm:flex-col xsm:items-stretch'>
          <label className='relative min-w-[16rem] flex-1'>
            <span className='sr-only'>Tìm vị trí tuyển dụng</span>
            <Search className='pointer-events-none absolute top-1/2 left-[1rem] size-[1rem] -translate-y-1/2 text-[#94A3B8]' />
            <input
              type='search'
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder='Tìm vị trí tuyển dụng...'
              className='h-[2.875rem] w-full rounded-[0.5rem] border border-transparent bg-[#F8FAFC] pr-[1rem] pl-[2.75rem] text-[0.875rem] text-[#1A2B48] outline-none transition-colors duration-300 placeholder:text-[#94A3B8] focus:border-[#C6A15B] focus:bg-white'
            />
          </label>

          <div className='flex flex-wrap items-center gap-[0.75rem] xsm:hidden'>
            {filters.map((filter) => {
              const Icon = filter.icon
              return (
                <Select
                  key={filter.key}
                  value={filterValue(filter.key)}
                  onValueChange={(value) => setFilter(filter.key, value)}
                >
                  <SelectTrigger
                    aria-label={filter.label}
                    className={cn(SELECT_TRIGGER, filter.width)}
                  >
                    <span className='flex min-w-0 items-center gap-[0.5rem]'>
                      <Icon className='size-[0.9375rem] shrink-0 text-[#B5935E]' />
                      <SelectValue placeholder={filter.allLabel} />
                    </span>
                  </SelectTrigger>
                  <SelectContent
                    position='popper'
                    align='start'
                    sideOffset={6}
                    className={SELECT_CONTENT}
                  >
                    <SelectItem
                      value={ALL}
                      className={SELECT_ITEM}
                    >
                      {filter.allLabel}
                    </SelectItem>
                    {filter.options.map((item) => (
                      <SelectItem
                        key={item.slug}
                        value={item.slug}
                        className={SELECT_ITEM}
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )
            })}
          </div>

          <div className='hidden gap-[0.625rem] xsm:flex xsm:flex-col'>
            {filters.map((filter) => {
              const Icon = filter.icon
              const value = filterValue(filter.key)
              const display =
                value === ALL
                  ? filter.allLabel
                  : (filter.options.find((item) => item.slug === value)?.name ?? filter.allLabel)

              return (
                <button
                  key={filter.key}
                  type='button'
                  aria-haspopup='dialog'
                  onClick={() => setDrawer(filter.key)}
                  className='flex h-[2.875rem] w-full items-center justify-between rounded-[0.5rem] border border-[#E2E8F0] bg-white px-[1rem] text-[0.875rem] font-medium text-[#1A2B48]'
                >
                  <span className='flex min-w-0 items-center gap-[0.5rem]'>
                    <Icon className='size-[0.9375rem] shrink-0 text-[#B5935E]' />
                    <span className='truncate'>{display}</span>
                  </span>
                  <ChevronDown className='size-[1rem] shrink-0 text-[#64748B]' />
                </button>
              )
            })}
          </div>
        </div>

        <DrawerProvider
          open={drawer !== null}
          setOpen={(next) => {
            const open = typeof next === 'function' ? next(drawer !== null) : next
            if (!open) setDrawer(null)
          }}
          className='pb-[max(1.5rem,env(safe-area-inset-bottom))]'
        >
          {activeFilter ? (
            <div className='px-[1.25rem] pt-[1rem]'>
              <p className='text-[1.125rem] font-bold text-[#1A2B48]'>{activeFilter.label}</p>
              <ul
                role='listbox'
                aria-label={activeFilter.label}
                className='mt-[0.75rem] max-h-[60vh] overflow-y-auto'
              >
                {[
                  { value: ALL, label: activeFilter.allLabel },
                  ...activeFilter.options.map((item) => ({
                    value: item.slug,
                    label: item.name,
                  })),
                ].map((option) => {
                  const selected = option.value === activeValue

                  return (
                    <li
                      key={option.value}
                      role='option'
                      aria-selected={selected}
                      className='border-b border-[#EEF1F5] last:border-b-0'
                    >
                      <button
                        type='button'
                        onClick={() => {
                          setFilter(activeFilter.key, option.value)
                          setDrawer(null)
                        }}
                        className={cn(
                          'flex w-full items-center justify-between py-[1rem] text-left text-[1rem]',
                          selected ? 'font-semibold text-[#B5935E]' : 'text-[#1A2B48]',
                        )}
                      >
                        {option.label}
                        {selected ? <Check className='size-[1.125rem]' /> : null}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : null}
        </DrawerProvider>

        <p className='mt-[1.5rem] text-[0.8125rem] font-medium text-[#94A3B8]'>
          {showSkeleton ? 'Đang tải…' : `${total} vị trí phù hợp`}
        </p>

        <div className='mt-[1rem] flex flex-col gap-[1rem]'>
          {showSkeleton ? (
            Array.from({ length: JOBS_PER_PAGE }, (_, index) => <JobCardSkeleton key={index} />)
          ) : jobs.length > 0 ? (
            jobs.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                index={index}
              />
            ))
          ) : (
            <p className='rounded-[1rem] border border-dashed border-[#E2E8F0] bg-white px-[1.5rem] py-[3rem] text-center text-[0.9375rem] text-[#64748B]'>
              Không tìm thấy vị trí phù hợp.
            </p>
          )}
        </div>

        {totalPages > 1 && !showSkeleton ? (
          <nav
            aria-label='Phân trang tuyển dụng'
            className='mt-[2.5rem] flex items-center justify-center gap-[0.5rem]'
          >
            <button
              type='button'
              disabled={currentPage <= 1}
              onClick={() => goToPage(currentPage - 1)}
              className='inline-flex h-[2.5rem] items-center gap-[0.25rem] rounded-full px-[0.875rem] text-[0.8125rem] font-semibold text-[#1A2B48] transition-colors duration-300 hover:text-[#B5935E] disabled:pointer-events-none disabled:opacity-35'
            >
              <ChevronLeft className='size-[0.875rem]' />
              Trước
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type='button'
                aria-current={pageNumber === currentPage ? 'page' : undefined}
                onClick={() => goToPage(pageNumber)}
                className={cn(
                  'inline-flex size-[2.5rem] items-center justify-center rounded-full text-[0.875rem] font-bold transition-colors duration-300',
                  pageNumber === currentPage
                    ? 'bg-[#1A2B48] text-white shadow-[0_0.5rem_1rem_-0.25rem_rgba(26,43,72,0.45)]'
                    : 'text-[#1A2B48] hover:bg-[#F1F5F9]',
                )}
              >
                {pageNumber}
              </button>
            ))}

            <button
              type='button'
              disabled={currentPage >= totalPages}
              onClick={() => goToPage(currentPage + 1)}
              className='inline-flex h-[2.5rem] items-center gap-[0.25rem] rounded-full px-[0.875rem] text-[0.8125rem] font-semibold text-[#1A2B48] transition-colors duration-300 hover:text-[#B5935E] disabled:pointer-events-none disabled:opacity-35'
            >
              Sau
              <ChevronRight className='size-[0.875rem]' />
            </button>
          </nav>
        ) : null}
      </div>
    </section>
  )
}

export default CareersJobs
