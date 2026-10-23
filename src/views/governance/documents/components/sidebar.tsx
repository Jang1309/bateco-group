import type { GovernanceBasePath } from '@/views/governance/base-path'
import {
  GOVERNANCE_MENU,
  type GovernanceCategory,
  type GovernanceMenuItem,
} from '@/views/governance/data'

import SidebarGroup from './sidebar-group'
import SidebarLink from './sidebar-link'
import SidebarShell from './sidebar-shell'

type SidebarProps = {
  active: GovernanceCategory
  menu?: GovernanceMenuItem[]
  basePath?: GovernanceBasePath
  title?: string
}

const GovernanceSidebar = ({
  active,
  menu = GOVERNANCE_MENU,
  basePath = '/quan-he-nha-dau-tu',
  title = 'Văn bản quản trị',
}: SidebarProps) => {
  return (
    <aside className='sticky top-[7.5rem] rounded-[0.75rem] border border-[#EEF1F5] bg-white p-[1.5rem] shadow-[0_0.5rem_1.5rem_rgba(15,28,51,0.05)] xsm:static xsm:p-[1rem]'>
      <SidebarShell
        key={active.id}
        title={title}
        activeTitle={active.title}
      >
        <nav aria-label={title}>
          <ul className='flex flex-col gap-[0.25rem]'>
            {menu.map((item) => (
              <li key={item.id}>
                {item.type === 'group' ? (
                  <SidebarGroup
                    group={item}
                    activeId={active.id}
                    basePath={basePath}
                  />
                ) : (
                  <SidebarLink
                    category={item}
                    active={item.id === active.id}
                    basePath={basePath}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>
      </SidebarShell>
    </aside>
  )
}

export default GovernanceSidebar
