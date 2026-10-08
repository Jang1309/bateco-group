'use client'

import { useTranslations } from 'next-intl'

import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

import type { NavItem } from '../data'

type NavLinkProps = {
  item: NavItem
  className?: string
  activeClassName?: string
  inactiveClassName?: string
  onClick?: () => void
}

export default function NavLink({
  item,
  className,
  activeClassName = 'text-[#3b6db5]',
  inactiveClassName = 'text-[#2a2a2a] hover:text-[#1e3a6e]',
  onClick,
}: NavLinkProps) {
  const t = useTranslations('Header')
  const pathname = usePathname()
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`)

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        'whitespace-nowrap text-[0.85rem] font-medium transition-colors duration-200',
        active ? activeClassName : inactiveClassName,
        className,
      )}
    >
      {t(item.key)}
    </Link>
  )
}
