'use client'

import { Check, ChevronDown, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

import DrawerProvider from '@/components/providers/drawer-provider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { ProjectSort } from '@/views/projects/search-params'

type SearchSortProps = {
  search: string
  sort: ProjectSort
  onSearch: (value?: string) => void
  onSort: (value: ProjectSort) => void
}

const SORT_OPTIONS: { value: ProjectSort; label: string }[] = [
  { value: 'moi-nhat', label: 'Mới nhất' },
  { value: 'cu-nhat', label: 'Cũ nhất' },
]

const SearchSort = ({ search, sort, onSearch, onSort }: SearchSortProps) => {
  const [keyword, setKeyword] = useState(search)
  const [prevSearch, setPrevSearch] = useState(search)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const sortLabel = SORT_OPTIONS.find((option) => option.value === sort)?.label

  // Đồng bộ khi URL đổi (back/forward) — adjust state khi render, không dùng effect
  if (search !== prevSearch) {
    setPrevSearch(search)
    setKeyword(search)
  }

  useEffect(() => {
    if (keyword.trim() === search.trim()) return
    const timer = setTimeout(() => onSearch(keyword), 400)
    return () => clearTimeout(timer)
  }, [keyword, onSearch, search])

  return (
    <div className='flex items-center gap-[0.75rem] xsm:flex-col xsm:items-stretch'>
      <label className='relative flex-1'>
        <span className='sr-only'>Tìm kiếm dự án</span>
        <Search className='pointer-events-none absolute top-1/2 left-[1rem] size-[1rem] -translate-y-1/2 text-[#94A3B8]' />
        <input
          type='search'
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder='Tìm kiếm dự án...'
          className='h-[2.875rem] w-full rounded-[0.5rem] border border-transparent bg-[#F1F5F9] pr-[1rem] pl-[2.75rem] text-[0.875rem] text-[#1A2B48] transition-colors duration-300 outline-none placeholder:text-[#94A3B8] focus:border-[#C6A15B] focus:bg-white'
        />
      </label>

      <div className='xsm:hidden'>
        <Select
          value={sort}
          onValueChange={(value) => onSort(value as ProjectSort)}
        >
          <SelectTrigger
            aria-label='Sắp xếp'
            className='w-[12rem] cursor-pointer rounded-[0.5rem] border-[#E2E8F0] bg-white px-[1rem] text-[0.875rem] font-semibold text-[#1A2B48] focus-visible:border-[#C6A15B] focus-visible:ring-[#C6A15B]/20 data-[size=default]:h-[2.875rem] data-[state=open]:border-[#C6A15B] [&_svg]:text-[#64748B]'
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            position='popper'
            align='end'
            sideOffset={6}
            className='min-w-[12rem] rounded-[0.5rem] border border-[#EEF1F5] p-[0.25rem] shadow-[0_0.75rem_2rem_rgba(15,28,51,0.12)] ring-0'
          >
            {SORT_OPTIONS.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className='cursor-pointer rounded-[0.375rem] py-[0.625rem] pl-[0.75rem] text-[0.875rem] text-[#1A2B48] focus:bg-[#F7F9FB] focus:text-[#B5935E] not-data-[variant=destructive]:focus:**:text-[#B5935E] data-[state=checked]:font-semibold data-[state=checked]:text-[#B5935E]'
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <button
        type='button'
        aria-haspopup='dialog'
        onClick={() => setDrawerOpen(true)}
        className='hidden h-[2.875rem] items-center justify-between rounded-[0.5rem] border border-[#E2E8F0] bg-white px-[1rem] text-[0.875rem] font-semibold text-[#1A2B48] xsm:flex'
      >
        <span>
          <span className='font-normal text-[#94A3B8]'>Sắp xếp: </span>
          {sortLabel}
        </span>
        <ChevronDown className='size-[1rem] text-[#64748B]' />
      </button>

      <DrawerProvider
        open={drawerOpen}
        setOpen={setDrawerOpen}
        className='pb-[max(1.5rem,env(safe-area-inset-bottom))]'
      >
        <div className='px-[1.25rem] pt-[1rem]'>
          <p className='text-[1.125rem] font-bold text-[#1A2B48]'>Sắp xếp theo</p>
          <ul
            role='listbox'
            aria-label='Sắp xếp'
            className='mt-[0.75rem]'
          >
            {SORT_OPTIONS.map((option) => {
              const selected = option.value === sort

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
                      setDrawerOpen(false)
                      if (!selected) onSort(option.value)
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
      </DrawerProvider>
    </div>
  )
}

export default SearchSort
