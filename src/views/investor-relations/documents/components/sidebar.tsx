'use client'

import { useTranslations } from 'next-intl'

import type { InvestorRelationsCategoryItem } from '@/interfaces/investorRelations.interface'
import SidebarShell from '@/views/governance/documents/components/sidebar-shell'

import SidebarGroup from './sidebar-group'
import SidebarLink from './sidebar-link'

type Category = InvestorRelationsCategoryItem & { slug: string; name: string }

type DocumentsSidebarProps = {
  categories: Category[]
  activeSlug: string
  onSelect: (slug: string) => void
}

const normalizeChildren = (item: Category): Category[] =>
  (item.children ?? []).filter((child): child is Category => Boolean(child.slug && child.name))

const findActiveTitle = (categories: Category[], activeSlug: string): string => {
  for (const item of categories) {
    if (item.slug === activeSlug) return item.name
    const child = normalizeChildren(item).find((c) => c.slug === activeSlug)
    if (child) return child.name
  }
  return ''
}

const DocumentsSidebar = ({ categories, activeSlug, onSelect }: DocumentsSidebarProps) => {
  const t = useTranslations('Investor')
  const activeTitle = findActiveTitle(categories, activeSlug)

  return (
    <aside className='sticky top-[7.5rem] rounded-[0.75rem] border border-[#EEF1F5] bg-white p-[1.5rem] shadow-[0_0.5rem_1.5rem_rgba(15,28,51,0.05)] xsm:static xsm:p-[1rem]'>
      <SidebarShell
        key={activeSlug}
        title={t('docsTitle')}
        activeTitle={activeTitle}
      >
        <nav aria-label={t('docsTitle')}>
          <ul className='flex flex-col gap-[0.25rem]'>
            {categories.map((item) => {
              const children = normalizeChildren(item)

              return (
                <li key={item.slug}>
                  {children.length > 0 ? (
                    <SidebarGroup
                      group={item}
                      items={children}
                      activeSlug={activeSlug}
                      onSelect={onSelect}
                    />
                  ) : (
                    <SidebarLink
                      id={item.slug}
                      title={item.name}
                      active={item.slug === activeSlug}
                      onSelect={onSelect}
                    />
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </SidebarShell>
    </aside>
  )
}

export default DocumentsSidebar
