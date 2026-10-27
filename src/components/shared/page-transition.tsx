'use client'

import gsap from 'gsap'
import { useReducedMotion } from 'motion/react'
import { usePathname, useRouter } from 'next/navigation'
import { type CSSProperties, useEffect, useRef } from 'react'

import { PRELOADER_BG as BG, PRELOADER_PANELS } from './preloader/data'
import { PreloaderPanels } from './preloader/panels'

// Logo căn vào panel giữa (đã cắt chéo nên tâm lệch khỏi 50%), mobile vào dải giữa
const CENTER_PANEL = PRELOADER_PANELS[2]

// Trang mới chậm quá thì vẫn mở màn che, tránh kẹt
const REVEAL_FALLBACK_S = 8

/** href nội bộ cần chạy màn che: click trái thường, cùng origin, khác pathname, không mở tab mới / tải file */
function getTransitionHref(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0) return null
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null
  const anchor = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
  if (!anchor || (anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download'))
    return null
  const url = new URL(anchor.href, window.location.href)
  if (url.origin !== window.location.origin || url.pathname === window.location.pathname)
    return null
  return url.pathname + url.search + url.hash
}

/**
 * Màn che giữa các trang — cùng panel chéo với preloader.
 * Chặn click link ở capture phase (next/link bỏ qua khi defaultPrevented), che xong mới router.push,
 * pathname đổi thì mở ra. Back/forward của trình duyệt không chạy màn che.
 */
export function PageTransition() {
  const router = useRouter()
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<() => void>(() => {})

  useEffect(() => {
    const root = rootRef.current
    if (!root || reduceMotion) return

    const q = gsap.utils.selector(root)
    const slides = () => q('[data-preloader-panel]')
    let state: 'idle' | 'covering' | 'covered' | 'revealing' = 'idle'
    let fallback: gsap.core.Tween | null = null
    let tl: gsap.core.Timeline | null = null

    const reveal = () => {
      if (state !== 'covered') return
      state = 'revealing'
      fallback?.kill()
      tl = gsap
        .timeline({
          defaults: { ease: 'power3.inOut' },
          onComplete: () => {
            gsap.set(root, { autoAlpha: 0, pointerEvents: 'none' })
            state = 'idle'
          },
        })
        .set(root, { backgroundColor: 'transparent' })
        .to(
          q('[data-transition-logo]'),
          { autoAlpha: 0, y: -12, duration: 0.25, ease: 'power2.in' },
          0.1,
        )
        .to(slides(), { xPercent: 110, duration: 0.75, stagger: 0.06 }, 0.15)
    }

    const cover = (href: string) => {
      state = 'covering'
      tl = gsap
        .timeline({
          defaults: { ease: 'power3.inOut' },
          onComplete: () => {
            state = 'covered'
            router.push(href)
            fallback = gsap.delayedCall(REVEAL_FALLBACK_S, reveal)
          },
        })
        // clearProps trước: tránh cộng dồn translate3d inline + xPercent GSAP
        .set(slides(), { clearProps: 'transform' })
        .set(slides(), { xPercent: -110 })
        .set(q('[data-transition-logo]'), { autoAlpha: 0, y: 12 })
        .set(root, { autoAlpha: 1, pointerEvents: 'auto', backgroundColor: 'transparent' })
        .to(slides(), { xPercent: 0, duration: 0.7, stagger: 0.06 }, 0)
        .to(
          q('[data-transition-logo]'),
          { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          0.45,
        )
        // Nền đặc sau khi panel phủ kín — che khe anti-alias giữa các panel lúc đổi trang
        .set(root, { backgroundColor: BG })
    }

    const onClick = (event: MouseEvent) => {
      const href = getTransitionHref(event)
      if (!href) return
      event.preventDefault()
      if (state === 'idle') cover(href)
    }

    revealRef.current = reveal
    window.addEventListener('click', onClick, true)
    return () => {
      window.removeEventListener('click', onClick, true)
      revealRef.current = () => {}
      fallback?.kill()
      tl?.kill()
      gsap.set(root, { autoAlpha: 0, pointerEvents: 'none' })
    }
  }, [reduceMotion, router])

  useEffect(() => {
    // Đợi 1 frame cho trang mới paint rồi mới mở
    const id = requestAnimationFrame(() => revealRef.current())
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return (
    <div
      ref={rootRef}
      aria-hidden
      className='pointer-events-none invisible fixed inset-0 z-[9998] overflow-hidden opacity-0'
    >
      <PreloaderPanels />

      {/* Wrapper giữ translate căn giữa — GSAP animate y ở div trong sẽ ghi đè translate của chính element */}
      <div
        // +0.5rem: bù dấu ® bên phải để khối chữ + vạch nằm đúng tâm
        className='absolute top-1/2 left-(--lx) translate-x-[calc(-50%+0.5rem)] -translate-y-1/2 xsm:top-(--ly) xsm:left-1/2'
        style={
          { '--lx': CENTER_PANEL.contentX, '--ly': CENTER_PANEL.mobile.contentY } as CSSProperties
        }
      >
        <div
          data-transition-logo
          className='invisible opacity-0'
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- logo tĩnh, hiện lúc chuyển trang */}
          <img
            src='/header/d-logo.png'
            alt=''
            className='h-[4.5rem] w-auto drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)] xsm:h-[3.5rem]'
          />
        </div>
      </div>
    </div>
  )
}
