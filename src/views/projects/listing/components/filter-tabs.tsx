import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { PROJECT_SECTORS } from '@/views/projects/data'

import { buildProjectQuery, type ProjectQuery } from '../query'

type FilterTabsProps = {
  current: ProjectQuery
}

const TABS = [{ id: undefined, label: 'Tất cả dự án' }, ...PROJECT_SECTORS]

const FilterTabs = ({ current }: FilterTabsProps) => {
  return (
    <nav
      aria-label='Lọc theo lĩnh vực'
      className='-mx-[1.25rem] overflow-x-auto px-[1.25rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
    >
      <ul className='flex gap-[0.625rem] xsm:w-max'>
        {TABS.map((tab) => {
          const active = tab.id === current.sector

          return (
            <li key={tab.label}>
              <Link
                href={{
                  pathname: '/du-an',
                  query: buildProjectQuery({ ...current, sector: tab.id, page: 1 }),
                }}
                scroll={false}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'inline-flex items-center rounded-[0.375rem] border px-[1.125rem] py-[0.625rem] text-[0.8125rem] font-semibold whitespace-nowrap transition-colors duration-300',
                  active
                    ? 'border-[#B5935E] bg-[#B5935E] text-white shadow-[0_0.375rem_1rem_rgba(181,147,94,0.3)]'
                    : 'border-[#E2E8F0] bg-white text-[#475569] hover:border-[#B5935E] hover:text-[#B5935E]',
                )}
              >
                {tab.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default FilterTabs
