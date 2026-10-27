'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'

import { PRELOADER_BG as BG, PRELOADER_STORAGE_KEY as STORAGE_KEY } from './data'
import { PreloaderPanels } from './panels'
import { PreloaderWaveDecor } from './wave-decor'

gsap.registerPlugin(useGSAP)

type Props = {
  force?: boolean
  loop?: boolean
}

function readSeen(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

// Snapshot client-only; server luôn false. Không cần subscribe — finish() tự unmount.
const subscribeSeen = () => () => {}

export function Preloader({ force = false, loop = false }: Props) {
  const t = useTranslations('Preloader')
  const reduceMotion = useReducedMotion()
  const pathname = usePathname()
  const rootRef = useRef<HTMLDivElement>(null)
  const [finished, setFinished] = useState(false)
  const isPreviewRoute = pathname?.endsWith('/preloader') ?? false
  const seen = useSyncExternalStore(subscribeSeen, readSeen, () => false)
  // Layout nhường /preloader, hoặc đã xem trong session → không chạy lại
  const skip = (!force && isPreviewRoute) || (!force && !loop && seen)
  const gate = skip || finished ? 'done' : 'show'

  useLayoutEffect(() => {
    if (!skip) return
    document.documentElement.style.overflow = ''
    if (!force && !loop && !isPreviewRoute) {
      document.documentElement.dataset.batecoPreloader = 'seen'
    }
  }, [skip, force, loop, isPreviewRoute])

  useGSAP(
    () => {
      if (gate !== 'show' || !rootRef.current) return

      const root = rootRef.current
      const panels = gsap.utils.toArray<HTMLElement>('[data-preloader-panel]', root)
      const dividers = gsap.utils.toArray<HTMLElement>('[data-preloader-divider]', root)
      const contents = gsap.utils.toArray<HTMLElement>('[data-preloader-content]', root)
      const underlines = gsap.utils.toArray<HTMLElement>('[data-preloader-line]', root)
      const wave = root.querySelector<HTMLElement>('[data-preloader-wave]')

      if (!panels.length) return

      const finish = () => {
        if (!loop) {
          try {
            sessionStorage.setItem(STORAGE_KEY, '1')
          } catch {
            /* ignore */
          }
          document.documentElement.dataset.batecoPreloader = 'seen'
          document.documentElement.style.overflow = ''
          setFinished(true)
        }
      }

      const parkOffscreen = () => {
        // clearProps trước: tránh cộng dồn translate3d CSS + xPercent GSAP
        gsap.set([panels, dividers, contents, underlines, wave].filter(Boolean), {
          clearProps: 'transform,translate,opacity,visibility',
        })
        gsap.set(root, { pointerEvents: 'auto', backgroundColor: BG, autoAlpha: 1 })
        gsap.set(panels, { xPercent: -110, x: 0, y: 0, force3D: true })
        gsap.set(dividers, { xPercent: -110, x: 0, y: 0, force3D: true })
        gsap.set(contents, { autoAlpha: 0, x: -28, y: 0 })
        gsap.set(underlines, { scaleX: 0, autoAlpha: 1, transformOrigin: '50% 50%' })
        // Wave trượt từ dưới lên (yPercent), không trượt ngang
        if (wave) gsap.set(wave, { x: 0, xPercent: 0, yPercent: 110, y: 0, autoAlpha: 1 })
      }

      if (reduceMotion === true) {
        gsap.set([panels, dividers], { xPercent: 0, x: 0, clearProps: 'transform' })
        gsap.set(contents, { autoAlpha: 1, x: 0 })
        gsap.set(underlines, { scaleX: 1 })
        if (wave) gsap.set(wave, { yPercent: 0, autoAlpha: 1 })
        gsap.set(root, { autoAlpha: 1 })
        if (!loop) finish()
        return
      }

      document.documentElement.style.overflow = 'hidden'
      parkOffscreen()

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', overwrite: 'auto' },
        onComplete: () => {
          if (loop) {
            // delay nhỏ rồi play lại từ đầu — tránh restart trong onComplete
            gsap.delayedCall(0.35, () => {
              parkOffscreen()
              tl.restart()
            })
            return
          }
          finish()
        },
      })

      // Vào L→R — divider cùng nhịp panel để seam không tách mép
      tl.to(panels, { xPercent: 0, duration: 0.95, stagger: 0.09 }, 0)
        .to(dividers, { xPercent: 0, duration: 0.95, stagger: 0.09 }, 0)
        .to(contents, { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.09 }, 0.35)
        .to(underlines, { scaleX: 1, duration: 0.4, stagger: 0.09, ease: 'power2.out' }, 0.55)

      if (wave) {
        tl.to(wave, { yPercent: 0, duration: 0.75, ease: 'power3.out' }, 0.3)
      }

      // Hold → đẩy ra phải
      tl.to({}, { duration: 1.2 })
        .addLabel('out')
        .set(root, {
          pointerEvents: 'none',
          backgroundColor: loop ? BG : 'transparent',
        })
        .to(
          contents,
          { autoAlpha: 0, x: 24, duration: 0.25, stagger: 0.04, ease: 'power2.in' },
          'out',
        )
        .to(underlines, { autoAlpha: 0, duration: 0.2, stagger: 0.04, ease: 'power2.in' }, 'out')

      if (wave) {
        tl.to(wave, { yPercent: 110, duration: 0.55, ease: 'power3.in' }, 'out')
      }

      tl.to(
        panels,
        { xPercent: 110, duration: 0.9, stagger: 0.07, ease: 'power3.inOut' },
        'out',
      ).to(dividers, { xPercent: 110, duration: 0.9, stagger: 0.07, ease: 'power3.inOut' }, 'out')

      return () => {
        tl.kill()
        gsap.killTweensOf([panels, dividers, contents, underlines, wave, root])
        document.documentElement.style.overflow = ''
      }
    },
    { dependencies: [gate, reduceMotion, loop], scope: rootRef },
  )

  if (gate === 'done') return null

  return (
    <div
      id='bateco-preloader'
      ref={rootRef}
      className='fixed inset-0 z-[9999] overflow-hidden'
      // Visible ngay từ HTML paint — đừng chờ GSAP (tránh lộ web phía sau)
      style={{ backgroundColor: BG }}
      aria-busy
      aria-live='polite'
      role='status'
    >
      <span className='sr-only'>{t('loading')}</span>

      <PreloaderPanels withContent />

      <div
        data-preloader-wave
        aria-hidden
        // 140/1280 Figma — dùng vw để giữ đúng tỉ lệ cong, không nén path
        className='pointer-events-none absolute inset-x-0 bottom-0 h-[10.9375vw] will-change-transform xsm:h-[22vw]'
        style={{ transform: 'translate3d(0,110%,0)' }}
      >
        <PreloaderWaveDecor />
      </div>
    </div>
  )
}
