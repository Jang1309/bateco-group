'use client'

import { Link, toAppHref, usePathname } from '@/i18n/navigation'
import type { ILink } from '@/interfaces/link.interface'
import { cn } from '@/lib/utils'

type NavLinkProps = {
  link?: ILink
  className?: string
  activeClassName?: string
  inactiveClassName?: string
  onClick?: () => void
}

export default function NavLink({
  link,
  className,
  activeClassName = 'text-[#3b6db5]',
  inactiveClassName = 'text-[#2a2a2a] hover:text-[#1e3a6e]',
  onClick,
}: NavLinkProps) {
  const pathname = usePathname()
  const href = toAppHref(link?.url || '/')
  const active = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      target={link?.target}
      onClick={onClick}
      className={cn(
        'header-on-scroll whitespace-nowrap text-[0.85rem] font-semibold uppercase transition-colors duration-200',
        active ? activeClassName : inactiveClassName,
        className,
      )}
    >
      {link?.title}
    </Link>
  )
}
