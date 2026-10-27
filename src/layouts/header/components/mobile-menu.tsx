'use client'

import { useLenis } from 'lenis/react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useEffect, useId, useState } from 'react'

import { useIsMobile } from '@/hooks/use-mobile'
import { Link, toAppHref, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import type { Header, HeaderMenuItem, HeaderNavGroup } from '@/interfaces/siteSetting.interface'
import { MEGA_ACCENTS } from '@/layouts/header/mega-menu-data'
import { cn } from '@/lib/utils'
import { decodeHtmlEntities } from '@/utils/decodeHtmlEntities'

import { Flag, LOCALE_META, useSwitchLocale } from './locale-switcher'

const EASE = [0.22, 1, 0.36, 1] as const

const itemKey = (item: HeaderMenuItem, index: number) => item.link?.url || String(index)

const hasMega = (item: HeaderMenuItem) =>
  Boolean(
    item.has_submenu && Array.isArray(item.submenu?.navigation) && item.submenu.navigation.length,
  )

/** Danh sách con gọn cho mobile: nhóm theo cột, link có chấm màu accent */
type MobileMegaListProps = { columns: HeaderNavGroup[]; onNavigate: () => void }

const MobileMegaList = ({ columns, onNavigate }: MobileMegaListProps) => {
  const pathname = usePathname()

  return (
    <div className='mb-[1rem] flex flex-col gap-[1rem] rounded-[0.75rem] bg-[#F7F9FB] px-[1rem] py-[1rem]'>
      {columns.map((column, columnIndex) => {
        const accent = MEGA_ACCENTS[columnIndex % MEGA_ACCENTS.length]

        return (
          <div key={column.title || String(columnIndex)}>
            {column.title ? (
              <p className='mb-[0.25rem] flex items-center gap-[0.5rem] text-[0.6875rem] font-bold tracking-[0.06em] text-[#1A2B48] uppercase'>
                <span
                  aria-hidden
                  className={cn('h-[0.75rem] w-[0.1875rem] rounded-full', accent.bar)}
                />
                {decodeHtmlEntities(column.title)}
              </p>
            ) : null}
            <ul>
              {column.menu?.map((entry, index) => {
                const href = toAppHref(entry.link?.url || '/')
                const label = decodeHtmlEntities(entry.link?.title)
                if (!label) return null

                const active = pathname === href

                return (
                  <li key={`${href}-${index}`}>
                    <Link
                      href={href}
                      target={entry.link?.target}
                      onClick={onNavigate}
                      className={cn(
                        'flex items-center gap-[0.625rem] py-[0.4375rem] pl-[0.6875rem] text-[0.875rem] leading-[1.4] transition-colors duration-200',
                        active
                          ? cn('font-semibold', accent.text)
                          : 'font-medium text-[#475569] active:text-[#1A2B48]',
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'size-[0.3125rem] shrink-0 rounded-full',
                          active ? accent.bullet : 'bg-[#CBD2DC]',
                        )}
                      />
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

/**
 * Menu mobile: header giữ nguyên, menu xổ xuống phủ kín phần màn hình bên dưới header.
 */
export default function MobileMenu({ header }: { header?: Header }) {
  const t = useTranslations('Header')
  const pathname = usePathname()
  const lenis = useLenis()
  const isMobile = useIsMobile()
  const { locale, switchLocale } = useSwitchLocale()
  const [open, setOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState<string | null>(null)
  const [prevPathname, setPrevPathname] = useState(pathname)
  const panelId = useId()
  const items = [
    ...(header?.menu_left?.main_navigation ?? []),
    ...(header?.menu_right?.main_navigation ?? []),
  ]

  // Đổi trang thì đóng menu
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setOpen(false)
    setMegaOpen(null)
  }

  // Khóa cuộn trang khi menu mở, Esc để đóng
  useEffect(() => {
    if (!open) return

    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = 'hidden'
    // Chỉ stop Lenis trên desktop — stop() + touch làm mất scroll cảm ứng trên mobile
    if (!isMobile) lenis?.stop()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      html.style.overflow = prevOverflow
      if (!isMobile) lenis?.start()
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, lenis, isMobile])

  return (
    <>
      <button
        type='button'
        aria-label={open ? t('closeMenu') : t('openMenu')}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className='header-on-scroll relative -mr-[0.625rem] flex size-[2.75rem] items-center justify-center text-[#1A2B48]'
      >
        {/* px thay vì rem: rem theo vw ra pixel lẻ, các vạch bị làm tròn thành dày mỏng khác nhau */}
        <span className='relative h-[14px] w-[22px]'>
          <span
            className={cn(
              'absolute left-0 h-[2px] w-full bg-current transition-transform duration-300 ease-out',
              open ? 'top-[6px] rotate-45' : 'top-0',
            )}
          />
          <span
            className={cn(
              'absolute top-[6px] left-0 h-[2px] w-full bg-current transition-opacity duration-200',
              open && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'absolute left-0 h-[2px] w-full bg-current transition-transform duration-300 ease-out',
              open ? 'top-[6px] -rotate-45' : 'top-[12px]',
            )}
          />
        </span>
      </button>

      <div
        id={panelId}
        inert={!open}
        className={cn(
          'absolute inset-x-0 top-full flex h-[calc(100dvh-4.5rem)] flex-col overflow-y-auto overscroll-contain border-t border-[#EEF1F5] bg-white transition-[clip-path,visibility] duration-300 ease-out',
          open ? 'visible [clip-path:inset(0_0_0_0)]' : 'invisible [clip-path:inset(0_0_100%_0)]',
        )}
      >
        <nav
          aria-label='Mobile'
          className='px-[1.25rem] pt-[0.5rem]'
        >
          <motion.ul
            initial={false}
            animate={open ? 'open' : 'closed'}
            variants={{
              open: { transition: { staggerChildren: 0.045, delayChildren: 0.12 } },
              closed: {},
            }}
          >
            {items.map((item, index) => {
              const key = itemKey(item, index)
              const href = toAppHref(item.link?.url || '/')
              const active = pathname === href || pathname.startsWith(`${href}/`)
              const columns = hasMega(item) ? item.submenu?.navigation : undefined
              const megaColumns = Array.isArray(columns) ? columns : undefined
              const itemOpen = megaOpen === key
              const highlighted = active || itemOpen

              const label = (
                <span className='flex items-baseline gap-[0.75rem]'>
                  <span
                    className={cn(
                      'w-[1.25rem] text-[0.6875rem] font-semibold tabular-nums transition-colors duration-300',
                      highlighted ? 'text-[#0B7A4B]' : 'text-[#CBD2DC]',
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {decodeHtmlEntities(item.link?.title)}
                </span>
              )

              return (
                <motion.li
                  key={key}
                  variants={{
                    open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
                    closed: { opacity: 0, y: 12, transition: { duration: 0.15 } },
                  }}
                  className='border-b border-[#EEF1F5]'
                >
                  {megaColumns ? (
                    <>
                      <button
                        type='button'
                        aria-expanded={itemOpen}
                        onClick={() => setMegaOpen(itemOpen ? null : key)}
                        className={cn(
                          'flex w-full items-center justify-between py-[1rem] text-left text-[1.0625rem] font-semibold transition-colors duration-300',
                          highlighted ? 'text-[#0B7A4B]' : 'text-[#1A2B48]',
                        )}
                      >
                        {label}
                        <span
                          aria-hidden
                          className={cn(
                            'flex size-[1.75rem] items-center justify-center rounded-full transition-colors duration-300',
                            itemOpen ? 'bg-[#0B7A4B] text-white' : 'bg-[#F3F5F8] text-[#94A3B8]',
                          )}
                        >
                          <ChevronDown
                            className={cn(
                              'size-[0.875rem] transition-transform duration-300',
                              itemOpen && 'rotate-180',
                            )}
                          />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {itemOpen ? (
                          <motion.div
                            key='sub'
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className='overflow-hidden'
                          >
                            <MobileMegaList
                              columns={megaColumns}
                              onNavigate={() => setOpen(false)}
                            />
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={href}
                      target={item.link?.target}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between py-[1rem] text-[1.0625rem] font-semibold',
                        active ? 'text-[#0B7A4B]' : 'text-[#1A2B48] active:text-[#0B7A4B]',
                      )}
                    >
                      {label}
                      <ChevronRight
                        aria-hidden
                        className={cn(
                          'mr-[0.4375rem] size-[1rem]',
                          active ? 'text-[#0B7A4B]' : 'text-[#CBD2DC]',
                        )}
                      />
                    </Link>
                  )}
                </motion.li>
              )
            })}
          </motion.ul>
        </nav>

        <div
          role='group'
          aria-label={t('localeLabel')}
          className='mt-auto flex items-center gap-[0.5rem] px-[1.25rem] pt-[1.5rem] pb-[max(1.5rem,env(safe-area-inset-bottom))]'
        >
          {routing.locales.map((code) => {
            const meta = LOCALE_META[code]
            const active = code === locale

            return (
              <button
                key={code}
                type='button'
                aria-pressed={active}
                onClick={() => switchLocale(code)}
                className={cn(
                  'flex items-center gap-[0.5rem] rounded-[0.375rem] border px-[0.875rem] py-[0.5rem] text-[0.875rem] font-semibold transition-colors duration-200',
                  active ? 'border-[#1A2B48] text-[#1A2B48]' : 'border-transparent text-[#94A3B8]',
                )}
              >
                <Flag src={meta.flag} />
                {t(meta.labelKey)}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
