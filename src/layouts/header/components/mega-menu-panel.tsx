'use client'

import { ArrowRight, ChevronRight } from 'lucide-react'
import { motion, type Variants } from 'motion/react'
import { useTranslations } from 'next-intl'

import { Link, usePathname } from '@/i18n/navigation'
import type { HeaderMenuItem, HeaderNavGroup } from '@/interfaces/siteSetting.interface'
import { MEGA_ACCENTS, type MegaAccent } from '@/layouts/header/mega-menu-data'
import { cn } from '@/lib/utils'

type MegaMenuPanelProps = {
  item: HeaderMenuItem
  columns: HeaderNavGroup[]
  onNavigate?: () => void
}

const EASE = [0.22, 1, 0.36, 1] as const

// Variants do MegaLayer điều khiển qua initial/animate
const gridVariants: Variants = {
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
}

const columnVariants: Variants = {
  open: { transition: { staggerChildren: 0.035, delayChildren: 0.06 } },
  closed: {},
}

const titleVariants: Variants = {
  open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  closed: { opacity: 0, y: 8, transition: { duration: 0.15 } },
}

const lineVariants: Variants = {
  open: { scaleX: 1, transition: { duration: 0.6, ease: EASE } },
  closed: { scaleX: 0, transition: { duration: 0.15 } },
}

const itemVariants: Variants = {
  open: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
  closed: { opacity: 0, x: -10, transition: { duration: 0.12 } },
}

type ColumnProps = {
  column: HeaderNavGroup
  accent: MegaAccent
  onNavigate?: () => void
  split?: boolean
}

const Column = ({ column, accent, onNavigate, split }: ColumnProps) => {
  const pathname = usePathname()

  return (
    <motion.div
      variants={columnVariants}
      className='min-w-0'
    >
      {column.title ? (
        <motion.p
          variants={titleVariants}
          className='flex items-center gap-[0.625rem] pb-[0.875rem]'
        >
          <span
            aria-hidden
            className={cn('h-[1rem] w-[0.25rem] rounded-full', accent.bar)}
          />
          <span className='text-[0.875rem] font-bold tracking-[0.04em] text-[#1A2B48] uppercase'>
            {column.title}
          </span>
        </motion.p>
      ) : null}
      <motion.span
        aria-hidden
        variants={lineVariants}
        className='block h-px origin-left bg-[#EEF1F5]'
      />

      <ul className={cn('mt-[1rem] grid gap-[0.25rem]', split && 'grid-cols-2 gap-x-[1.5rem]')}>
        {column.menu?.map((entry, index) => {
          const href = entry.link?.url || '/'
          const label = entry.link?.title
          if (!label) return null

          const active = pathname === href

          return (
            <motion.li
              key={`${href}-${index}`}
              variants={itemVariants}
            >
              <Link
                href={href}
                target={entry.link?.target}
                onClick={onNavigate}
                className={cn(
                  'group flex items-center gap-[0.75rem] rounded-[0.5rem] px-[0.75rem] py-[0.625rem] text-[0.9375rem] transition-colors duration-200',
                  active
                    ? cn(accent.soft, accent.text, 'font-semibold')
                    : 'font-medium text-[#475569] hover:bg-[#F7F9FB] hover:text-[#1A2B48]',
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'size-[0.3125rem] shrink-0 rounded-full transition-[background-color,transform] duration-200',
                    active
                      ? accent.bullet
                      : 'bg-[#CBD2DC] group-hover:scale-125 group-hover:bg-[#94A3B8]',
                  )}
                />
                <span className='min-w-0 flex-1 transition-transform duration-200 group-hover:translate-x-[0.125rem]'>
                  {label}
                </span>
                <ChevronRight
                  aria-hidden
                  className={cn(
                    'size-[0.875rem] shrink-0 transition-[opacity,transform] duration-200',
                    active
                      ? cn('opacity-100', accent.text)
                      : '-translate-x-[0.25rem] opacity-0 group-hover:translate-x-0 group-hover:opacity-60',
                  )}
                />
              </Link>
            </motion.li>
          )
        })}
      </ul>
    </motion.div>
  )
}

const asideVariants: Variants = {
  open: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
  closed: { opacity: 0, x: -16, transition: { duration: 0.15 } },
}

const MegaMenuPanel = ({ item, columns, onNavigate }: MegaMenuPanelProps) => {
  const t = useTranslations('Header')
  const href = item.link?.url || '/'

  return (
    <motion.div
      variants={gridVariants}
      className='grid grid-cols-[18rem_1fr]'
    >
      <motion.div
        variants={asideVariants}
        className='relative m-[0.75rem] flex flex-col overflow-hidden rounded-[0.75rem] bg-[linear-gradient(150deg,#1A2B48_0%,#0B1530_100%)] p-[1.75rem] text-white'
      >
        {/* Vòng sáng trang trí */}
        <span
          aria-hidden
          className='absolute -top-[5rem] -right-[5rem] size-[12rem] rounded-full bg-[#0B7A4B]/40 blur-[3rem]'
        />
        <span
          aria-hidden
          className='h-[0.1875rem] w-[2.5rem] rounded-full bg-[#D4A017]'
        />
        {item.link?.title ? (
          <p className='mt-[1.25rem] text-[1.5rem] leading-[1.2] font-bold'>{item.link.title}</p>
        ) : null}
        {item.submenu?.description ? (
          <p className='mt-[0.75rem] text-[0.875rem] leading-[1.6] text-white/70'>
            {item.submenu.description}
          </p>
        ) : null}
        <Link
          href={href}
          target={item.link?.target}
          onClick={onNavigate}
          className='group mt-auto inline-flex items-center gap-[0.5rem] self-start pt-[2rem] text-[0.875rem] font-semibold text-white'
        >
          {t('megaViewAll')}
          <span className='flex size-[1.75rem] items-center justify-center rounded-full bg-white/10 transition-[background-color,transform] duration-300 group-hover:translate-x-[0.25rem] group-hover:bg-[#0B7A4B]'>
            <ArrowRight className='size-[0.875rem]' />
          </span>
        </Link>
      </motion.div>

      <div
        className='grid gap-[2rem] px-[1.75rem] py-[2rem]'
        style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
      >
        {columns.map((column, index) => (
          <Column
            key={column.title || String(index)}
            column={column}
            accent={MEGA_ACCENTS[index % MEGA_ACCENTS.length]}
            onNavigate={onNavigate}
            // Menu chỉ có 1 cột thì dàn link thành 2 cột cho đỡ trống
            split={columns.length === 1}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default MegaMenuPanel
