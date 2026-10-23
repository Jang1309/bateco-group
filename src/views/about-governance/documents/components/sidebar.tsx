'use client'

import type { AdministrativeDocumentCategoryItem } from '@/interfaces/administrativeDocument.interface'
import SidebarShell from '@/views/governance/documents/components/sidebar-shell'

import SidebarLink from './sidebar-link'

type Category = AdministrativeDocumentCategoryItem & { slug: string; name: string }

type DocumentsSidebarProps = {
  categories: Category[]
  activeSlug: string
  onSelect: (slug: string) => void
}

const DocumentsSidebar = ({ categories, activeSlug, onSelect }: DocumentsSidebarProps) => {
  const activeTitle = categories.find((item) => item.slug === activeSlug)?.name ?? ''

  return (
    <aside className='sticky top-[7.5rem] rounded-[0.75rem] border border-[#EEF1F5] bg-white p-[1.5rem] shadow-[0_0.5rem_1.5rem_rgba(15,28,51,0.05)] xsm:static xsm:p-[1rem]'>
      <SidebarShell
        key={activeSlug}
        title='Văn bản quản trị'
        activeTitle={activeTitle}
      >
        <nav aria-label='Văn bản quản trị'>
          <ul className='flex flex-col gap-[0.25rem]'>
            {categories.map((item) => (
              <li key={item.slug}>
                <SidebarLink
                  id={item.slug}
                  title={item.name}
                  active={item.slug === activeSlug}
                  onSelect={onSelect}
                />
              </li>
            ))}
          </ul>
        </nav>
      </SidebarShell>
    </aside>
  )
}

export default DocumentsSidebar
