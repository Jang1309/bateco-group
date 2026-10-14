'use client'

import { useLenis } from 'lenis/react'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useId, useState } from 'react'

import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'

import { ALL_NAV } from '../data'

import { Flag, LOCALE_META, useSwitchLocale } from './locale-switcher'

/**
 * Menu mobile: header giữ nguyên, menu xổ xuống phủ kín phần màn hình bên dưới header.
 */
export default function MobileMenu() {
  const t = useTranslations('Header')
  const pathname = usePathname()
  const lenis = useLenis()
  const { locale, switchLocale } = useSwitchLocale()
  const [open, setOpen] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname)
  const panelId = useId()

  // Đổi trang thì đóng menu
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setOpen(false)
  }

  // Khóa cuộn trang khi menu mở, Esc để đóng
  useEffect(() => {
    if (!open) return

    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = 'hidden'
    lenis?.stop()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      html.style.overflow = prevOverflow
      lenis?.start()
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, lenis])

  return (
    <>
      <button
        type='button'
        aria-label={open ? t('closeMenu') : t('openMenu')}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className='header-on-scroll relative -mr-[0.625rem] size-[2.75rem] text-[#1A2B48]'
      >
        <span
          className={cn(
            'absolute right-[0.625rem] h-[0.125rem] w-[1.375rem] bg-current transition-transform duration-300 ease-out',
            open ? 'top-[1.3125rem] rotate-45' : 'top-[1rem]',
          )}
        />
        <span
          className={cn(
            'absolute top-[1.3125rem] right-[0.625rem] h-[0.125rem] w-[1.375rem] bg-current transition-opacity duration-200',
            open && 'opacity-0',
          )}
        />
        <span
          className={cn(
            'absolute right-[0.625rem] h-[0.125rem] w-[1.375rem] bg-current transition-transform duration-300 ease-out',
            open ? 'top-[1.3125rem] -rotate-45' : 'top-[1.625rem]',
          )}
        />
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
          className='px-[1.25rem]'
        >
          <ul>
            {ALL_NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)

              return (
                <li
                  key={item.key}
                  className='border-b border-[#EEF1F5]'
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center justify-between py-[0.9375rem] text-[1rem] font-semibold',
                      active ? 'text-[#B5935E]' : 'text-[#1A2B48] active:text-[#B5935E]',
                    )}
                  >
                    {t(item.key)}
                    <ChevronRight
                      aria-hidden
                      className={cn('size-[1rem]', active ? 'text-[#B5935E]' : 'text-[#CBD2DC]')}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
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
