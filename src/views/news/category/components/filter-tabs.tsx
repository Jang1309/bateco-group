import { cn } from '@/lib/utils'
import type { NewsCategory } from '@/views/news/data'

type FilterTabsProps = {
  categories: NewsCategory[]
  current?: string
  onSelect: (slug?: string) => void
}

const FilterTabs = ({ categories, current, onSelect }: FilterTabsProps) => {
  const tabs = [{ id: undefined as string | undefined, title: 'Tất cả' }, ...categories]

  return (
    <nav
      aria-label='Lọc theo chuyên mục'
      className='-mx-[1.25rem] overflow-x-auto overscroll-x-contain px-[1.25rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0'
    >
      <ul className='flex w-max gap-[0.625rem] pr-[1.25rem]'>
        {tabs.map((tab) => {
          const active = tab.id === current

          return (
            <li key={tab.id ?? 'all'}>
              <button
                type='button'
                onClick={() => onSelect(tab.id)}
                aria-pressed={active}
                className={cn(
                  'inline-flex cursor-pointer items-center rounded-full border px-[1.125rem] py-[0.625rem] text-[0.8125rem] font-semibold whitespace-nowrap transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#B5935E] focus-visible:ring-offset-2',
                  active
                    ? 'border-[#1A2B48] bg-[#1A2B48] text-white shadow-[0_0.75rem_1.5rem_-0.75rem_rgba(26,43,72,0.6)]'
                    : 'border-[#E2E8F0] bg-white text-[#1A2B48] hover:border-[#B5935E] hover:text-[#B5935E]',
                )}
              >
                {tab.title}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default FilterTabs
