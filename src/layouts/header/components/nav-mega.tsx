'use client'

import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { Link, usePathname } from '@/i18n/navigation'
import type { HeaderMenuItem } from '@/interfaces/siteSetting.interface'
import MegaMenuPanel from '@/layouts/header/components/mega-menu-panel'
import { cn } from '@/lib/utils'

const CLOSE_DELAY_MS = 160
const EASE = [0.22, 1, 0.36, 1] as const

const itemKey = (item: HeaderMenuItem, index: number) => item.link?.url || String(index)

/** State dùng chung cho mọi mega menu desktop: chỉ một panel mở tại một thời điểm */
export const useMegaMenu = () => {
  const pathname = usePathname()
  const [openKey, setOpenKey] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const show = (key: string) => {
    clearClose()
    setOpenKey(key)
  }

  const hideSoon = () => {
    clearClose()
    closeTimer.current = setTimeout(() => setOpenKey(null), CLOSE_DELAY_MS)
  }

  const close = () => {
    clearClose()
    setOpenKey(null)
  }

  useEffect(() => clearClose, [])

  // Đổi trang thì đóng
  const [prevPathname, setPrevPathname] = useState(pathname)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setOpenKey(null)
  }

  useEffect(() => {
    if (!openKey) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenKey(null)
    }
    // wheel/touch = ý định scroll; không dùng `scroll` vì Lenis còn emit khi đang lerp
    const onIntentScroll = () => setOpenKey(null)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('wheel', onIntentScroll, { passive: true })
    window.addEventListener('touchmove', onIntentScroll, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('wheel', onIntentScroll)
      window.removeEventListener('touchmove', onIntentScroll)
    }
  }, [openKey])

  return { openKey, show, keep: clearClose, hideSoon, close }
}

type MegaTriggerProps = {
  item: HeaderMenuItem
  open: boolean
  panelId: string
  onShow: () => void
  onHide: () => void
}

export const MegaTrigger = ({ item, open, panelId, onShow, onHide }: MegaTriggerProps) => {
  const pathname = usePathname()
  const href = item.link?.url || '/'
  const active = pathname === href || pathname.startsWith(`${href}/`)

  return (
    // after: cầu nối vô hình để rê chuột từ menu xuống panel không bị đóng
    <div
      className="relative after:absolute after:inset-x-[-1rem] after:top-full after:h-[2.5rem] after:content-['']"
      onMouseEnter={onShow}
      onMouseLeave={onHide}
      onFocusCapture={onShow}
    >
      <Link
        href={href}
        target={item.link?.target}
        aria-expanded={open}
        aria-haspopup='true'
        aria-controls={panelId}
        className={cn(
          'header-on-scroll relative flex items-center gap-[0.25rem] py-[0.5rem] whitespace-nowrap text-[0.85rem] font-semibold uppercase transition-colors duration-200',
          active
            ? 'text-[#3b6db5]'
            : open
              ? 'text-[#1e3a6e]'
              : 'text-[#2a2a2a] hover:text-[#1e3a6e]',
        )}
      >
        {item.link?.title}
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className='flex'
        >
          <ChevronDown className='size-[0.875rem]' />
        </motion.span>
        <motion.span
          aria-hidden
          initial={false}
          animate={{ scaleX: open || active ? 1 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className='absolute inset-x-0 -bottom-[0.125rem] h-[0.125rem] origin-left rounded-full bg-[#3b6db5]'
        />
      </Link>
    </div>
  )
}

type MegaLayerProps = {
  items: HeaderMenuItem[]
  openKey: string | null
  panelId: string
  onKeep: () => void
  onHide: () => void
  onClose: () => void
}

/** Backdrop + panel dùng chung; đổi menu thì chỉ crossfade nội dung */
export const MegaLayer = ({ items, openKey, panelId, onKeep, onHide, onClose }: MegaLayerProps) => {
  const item = items.find((nav, index) => itemKey(nav, index) === openKey)
  const columns = Array.isArray(item?.submenu?.navigation) ? item.submenu.navigation : undefined

  return (
    <AnimatePresence>
      {openKey && columns && item ? (
        <>
          {/* Header có transform nên fixed bám theo header, không dùng inset-0 được */}
          <motion.div
            key='backdrop'
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.05 } }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onMouseEnter={onHide}
            onClick={onClose}
            className='fixed inset-x-0 top-[5.5rem] -z-10 h-[100dvh] bg-[#0B1530]/80 backdrop-blur-[2px]'
          />

          <motion.div
            key='panel'
            id={panelId}
            role='region'
            aria-label={item.link?.title}
            onMouseEnter={onKeep}
            onMouseLeave={onHide}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onHide()
            }}
            initial={{
              opacity: 0,
              y: -12,
              scale: 0.98,
              clipPath: 'inset(0% 0% 100% 0% round 1rem)',
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              clipPath: 'inset(0% 0% 0% 0% round 1rem)',
              transition: { duration: 0.5, ease: EASE },
            }}
            exit={{
              opacity: 0,
              y: -12,
              scale: 0.98,
              clipPath: 'inset(0% 0% 100% 0% round 1rem)',
              transition: { duration: 0.28, ease: EASE },
            }}
            className='fixed inset-x-0 top-[5.5rem] z-50 mx-auto w-full max-w-[95rem] origin-top px-[2rem] pt-[1.5rem]'
          >
            <div className='overflow-hidden rounded-[1rem] border border-[#EEF1F5] bg-white shadow-[0_1.5rem_3.5rem_-1rem_rgba(15,28,51,0.35)]'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={openKey}
                  initial='closed'
                  animate='open'
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                >
                  <MegaMenuPanel
                    item={item}
                    columns={columns}
                    onNavigate={onClose}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}
