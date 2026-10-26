import type { SectorItem } from '@/interfaces/projects.interface'
import { cn } from '@/lib/utils'

type FilterTabsProps = {
  sectors: Array<SectorItem & { slug: string; name: string }>
  current?: string
  onSelect: (slug?: string) => void
}

const FilterTabs = ({ sectors, current, onSelect }: FilterTabsProps) => {
  const tabs = [{ slug: undefined as string | undefined, name: 'Tất cả dự án' }, ...sectors]

  return (
    <nav
      aria-label='Lọc theo lĩnh vực'
      className='-mx-[1.25rem] overflow-x-auto overscroll-x-contain px-[1.25rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
    >
      <ul className='flex w-max gap-[0.5rem] pr-[1.25rem] xsm:gap-[0.375rem]'>
        {tabs.map((tab) => {
          const active = tab.slug === current

          return (
            <li key={tab.slug ?? 'all'}>
              <button
                type='button'
                onClick={() => onSelect(tab.slug)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'inline-flex cursor-pointer items-center rounded-[0.375rem] border px-[1.125rem] py-[0.625rem] text-[0.8125rem] font-semibold whitespace-nowrap transition-colors duration-300 xsm:px-[0.875rem] xsm:py-[0.5rem] xsm:text-[0.75rem]',
                  active
                    ? 'border-[#B5935E] bg-[#B5935E] text-white shadow-[0_0.375rem_1rem_rgba(181,147,94,0.3)]'
                    : 'border-[#E2E8F0] bg-white text-[#475569] hover:border-[#B5935E] hover:text-[#B5935E]',
                )}
              >
                {tab.name}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default FilterTabs
