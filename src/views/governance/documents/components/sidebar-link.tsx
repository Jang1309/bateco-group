import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import type { GovernanceBasePath } from '@/views/governance/base-path'
import type { GovernanceCategory } from '@/views/governance/data'

type SidebarLinkProps = {
  category: GovernanceCategory
  active: boolean
  nested?: boolean
  basePath?: GovernanceBasePath
}

const SidebarLink = ({
  category,
  active,
  nested = false,
  basePath = '/quan-he-nha-dau-tu',
}: SidebarLinkProps) => {
  return (
    <Link
      href={{
        pathname: basePath,
        query: { 'danh-muc': category.id },
      }}
      scroll={false}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group flex items-center gap-[0.75rem] rounded-[0.5rem] border-l-[0.1875rem] py-[0.75rem] pr-[0.875rem] text-[0.875rem] leading-[1.4] transition-colors duration-300',
        nested ? 'pl-[2rem]' : 'pl-[0.875rem]',
        active
          ? 'border-[#0F5A3C] bg-[#EEF8F2] font-bold text-[#0F5A3C]'
          : 'border-transparent font-medium text-[#1A2B48] hover:bg-[#F7F9FB] hover:text-[#0F5A3C]',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'size-[0.375rem] shrink-0 rounded-full transition-colors duration-300',
          active ? 'bg-[#B5935E]' : 'bg-[#CBD2DC] group-hover:bg-[#B5935E]',
        )}
      />
      {category.title}
    </Link>
  )
}

export default SidebarLink
