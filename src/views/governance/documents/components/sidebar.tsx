import { GOVERNANCE_MENU, type GovernanceCategory } from '@/views/governance/data'

import SidebarGroup from './sidebar-group'
import SidebarLink from './sidebar-link'
import SidebarShell from './sidebar-shell'

type SidebarProps = {
  active: GovernanceCategory
}

const GovernanceSidebar = ({ active }: SidebarProps) => {
  return (
    <aside className='sticky top-[7.5rem] rounded-[0.75rem] border border-[#EEF1F5] bg-white p-[1.5rem] shadow-[0_0.5rem_1.5rem_rgba(15,28,51,0.05)] xsm:static xsm:p-[1rem]'>
      {/* key: đổi danh mục thì reset trạng thái (đóng menu trên mobile) */}
      <SidebarShell
        key={active.id}
        title='Văn bản quản trị'
        activeTitle={active.title}
      >
        <nav aria-label='Danh mục văn bản quản trị'>
          <ul className='flex flex-col gap-[0.25rem]'>
            {GOVERNANCE_MENU.map((item) => (
              <li key={item.id}>
                {item.type === 'group' ? (
                  <SidebarGroup
                    group={item}
                    activeId={active.id}
                  />
                ) : (
                  <SidebarLink
                    category={item}
                    active={item.id === active.id}
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
