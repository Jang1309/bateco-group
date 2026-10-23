'use client'

import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  Wallet,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import DrawerProvider from '@/components/providers/drawer-provider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import {
  JOB_DEPARTMENTS,
  JOB_LOCATIONS,
  JOB_TYPES,
  JOBS,
  JOBS_PER_PAGE,
  type Job,
} from '@/views/careers/data'

const ALL = 'all'

const SELECT_TRIGGER =
  'cursor-pointer rounded-[0.5rem] border-[#E2E8F0] bg-white px-[1rem] text-[0.875rem] font-medium text-[#1A2B48] focus-visible:border-[#C6A15B] focus-visible:ring-[#C6A15B]/20 data-[size=default]:h-[2.875rem] data-[state=open]:border-[#C6A15B] [&_svg]:text-[#64748B]'

const SELECT_CONTENT =
  'min-w-[14rem] rounded-[0.5rem] border border-[#EEF1F5] p-[0.25rem] shadow-[0_0.75rem_2rem_rgba(15,28,51,0.12)] ring-0'

const SELECT_ITEM =
  'cursor-pointer rounded-[0.375rem] py-[0.625rem] pl-[0.75rem] text-[0.875rem] text-[#1A2B48] focus:bg-[#F7F9FB] focus:text-[#1A2B48] not-data-[variant=destructive]:focus:**:text-[#1A2B48] data-[state=checked]:bg-[#F7F9FB] data-[state=checked]:font-semibold'

type FilterKey = 'department' | 'location' | 'type'

type FilterConfig = {
  key: FilterKey
  label: string
  allLabel: string
  options: readonly string[]
  icon: typeof Building2
  width: string
}

const FILTERS: FilterConfig[] = [
  {
    key: 'department',
    label: 'Phòng ban',
    allLabel: 'Tất cả phòng ban',
    options: JOB_DEPARTMENTS,
    icon: Building2,
    width: 'w-[14rem]',
  },
  {
    key: 'location',
    label: 'Địa điểm',
    allLabel: 'Tất cả địa điểm',
    options: JOB_LOCATIONS,
    icon: MapPin,
    width: 'w-[13rem]',
  },
  {
    key: 'type',
    label: 'Loại vị trí',
    allLabel: 'Tất cả vị trí',
    options: JOB_TYPES,
    icon: Briefcase,
    width: 'w-[12rem]',
  },
]

const JobCard = ({ job, index }: { job: Job; index: number }) => {
  return (
    // AOS gắn wrapper ngoài để không đụng translate của hover
    <div
      data-aos='business-rise'
      data-aos-duration='800'
      data-aos-delay={index * 80}
    >
      <article className='group flex items-center justify-between gap-[2rem] rounded-[1.25rem] bg-white p-[1.75rem] shadow-[0_0.75rem_2rem_-1.5rem_rgba(26,43,72,0.1)] ring-1 ring-[#1A2B48]/[0.06] transition-[box-shadow,translate] duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[0.25rem] hover:shadow-[0_2rem_3.5rem_-1.75rem_rgba(26,43,72,0.22)] xsm:flex-col xsm:items-stretch xsm:gap-[1.25rem] xsm:rounded-[1rem] xsm:p-[1.25rem] xsm:transition-none xsm:hover:translate-y-0 xsm:hover:shadow-[0_0.75rem_2rem_-1.5rem_rgba(26,43,72,0.1)]'>
        <div className='min-w-0 flex-1'>
          <div className='flex flex-wrap items-center gap-[0.625rem]'>
            <span className='rounded-[0.25rem] bg-[#F1F4F8] px-[0.625rem] py-[0.25rem] text-[0.6875rem] font-bold tracking-[0.08em] text-[#1A2B48] uppercase'>
              {job.type}
            </span>
            <span className='text-[0.75rem] font-semibold text-[#94A3B8]'>Mã: {job.code}</span>
          </div>

          <h3 className='mt-[0.875rem] text-[1.1875rem] leading-[1.35] font-bold tracking-[-0.01em] text-pretty text-[#1A2B48] uppercase transition-all duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-[#0F1C33] xsm:text-[1.0625rem]'>
            {job.title}
          </h3>

          <ul className='mt-[1.125rem] flex flex-wrap gap-x-[1.25rem] gap-y-[0.5rem] text-[0.8125rem] text-[#64748B]'>
            <li className='inline-flex items-center gap-[0.375rem]'>
              <Building2
                className='size-[0.875rem] text-[#B5935E]'
                strokeWidth={1.5}
              />
              {job.department}
            </li>
            <li className='inline-flex items-center gap-[0.375rem]'>
              <MapPin
                className='size-[0.875rem] text-[#B5935E]'
                strokeWidth={1.5}
              />
              {job.location}
            </li>
            <li className='inline-flex items-center gap-[0.375rem]'>
              <Wallet
                className='size-[0.875rem] text-[#B5935E]'
                strokeWidth={1.5}
              />
              {job.salary}
            </li>
          </ul>
        </div>

        <Link
          href={{ pathname: '/co-hoi-nghe-nghiep/[slug]', params: { slug: job.id } }}
          className='inline-flex shrink-0 items-center gap-[0.75rem] rounded-full bg-[#1A2B48] py-[0.5rem] pr-[0.5rem] pl-[1.25rem] text-[0.8125rem] font-bold text-white transition-colors duration-300 hover:bg-[#243656] focus-visible:ring-2 focus-visible:ring-[#B5935E] focus-visible:ring-offset-2 focus-visible:outline-none xsm:w-full xsm:justify-between'
        >
          Xem chi tiết
          <span
            aria-hidden
            className='flex size-[2rem] items-center justify-center rounded-full bg-white/10 transition-[transform,background-color] duration-300 group-hover:translate-x-[0.125rem] group-hover:bg-[#B5935E] xsm:transition-none xsm:group-hover:translate-x-0'
          >
            <ArrowRight className='size-[0.875rem]' />
          </span>
        </Link>
      </article>
    </div>
  )
}

const CareersJobs = () => {
  const [keyword, setKeyword] = useState('')
  const [filters, setFilters] = useState<Record<FilterKey, string>>({
    department: ALL,
    location: ALL,
    type: ALL,
  })
  const [page, setPage] = useState(1)
  const [drawer, setDrawer] = useState<FilterKey | null>(null)

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase()

    return JOBS.filter((job) => {
      if (filters.department !== ALL && job.department !== filters.department) return false
      if (filters.location !== ALL && job.location !== filters.location) return false
      if (filters.type !== ALL && job.type !== filters.type) return false
      if (!q) return true
      return (
        job.title.toLowerCase().includes(q) ||
        job.code.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q)
      )
    })
  }, [keyword, filters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / JOBS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE)

  const setFilter = (key: FilterKey, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPage(1)
  }

  const activeFilter = drawer ? FILTERS.find((item) => item.key === drawer) : null
  const activeValue = drawer ? filters[drawer] : ALL

  return (
    <section className='bg-[#FAFBFC] py-[5rem] xsm:py-[3rem]'>
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
              onChange={(event) => {
                setKeyword(event.target.value)
                setPage(1)
              }}
              placeholder='Tìm vị trí tuyển dụng...'
              className='h-[2.875rem] w-full rounded-[0.5rem] border border-transparent bg-[#F8FAFC] pr-[1rem] pl-[2.75rem] text-[0.875rem] text-[#1A2B48] outline-none transition-colors duration-300 placeholder:text-[#94A3B8] focus:border-[#C6A15B] focus:bg-white'
            />
          </label>

          {/* Desktop: shadcn Select */}
          <div className='flex flex-wrap items-center gap-[0.75rem] xsm:hidden'>
            {FILTERS.map((filter) => {
              const Icon = filter.icon
              return (
                <Select
                  key={filter.key}
                  value={filters[filter.key]}
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
                        key={item}
                        value={item}
                        className={SELECT_ITEM}
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )
            })}
          </div>

          {/* Mobile: mở drawer */}
          <div className='hidden gap-[0.625rem] xsm:flex xsm:flex-col'>
            {FILTERS.map((filter) => {
              const Icon = filter.icon
              const value = filters[filter.key]
              const display = value === ALL ? filter.allLabel : value

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
                  ...activeFilter.options.map((item) => ({ value: item, label: item })),
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
          {filtered.length} vị trí phù hợp
        </p>

        <div className='mt-[1rem] flex flex-col gap-[1rem]'>
          {pageItems.length > 0 ? (
            pageItems.map((job, index) => (
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

        {totalPages > 1 ? (
          <nav
            aria-label='Phân trang tuyển dụng'
            className='mt-[2.5rem] flex items-center justify-center gap-[0.5rem]'
          >
            <button
              type='button'
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
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
                onClick={() => setPage(pageNumber)}
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
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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
