'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'

import { PRELOADER_BG as BG, PRELOADER_STORAGE_KEY as STORAGE_KEY } from './data'
import { LOGO_GOLD, LOGO_NAVY, PreloaderLogo } from './logo'
import { PreloaderPanels } from './panels'
import { PreloaderWaveDecor } from './wave-decor'

gsap.registerPlugin(useGSAP, DrawSVGPlugin)

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

  // Mobile: 5 dải cùng bề rộng = khối rộng nhất → icon thẳng cột mà cả khối vẫn căn giữa
  useLayoutEffect(() => {
    const root = rootRef.current
    if (gate !== 'show' || !root) return
    const boxes = Array.from(root.querySelectorAll<HTMLElement>('[data-preloader-content-box]'))
    const sync = () => {
      root.style.removeProperty('--pl-content-w')
      const width = Math.max(...boxes.map((box) => box.offsetWidth))
      root.style.setProperty('--pl-content-w', `${width}px`)
    }
    sync()
    // Font web load xong thì chữ đổi bề rộng → đo lại
    void document.fonts?.ready.then(sync)
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [gate])

  useGSAP(
    () => {
      if (gate !== 'show' || !rootRef.current) return

      const root = rootRef.current
      const panels = gsap.utils.toArray<HTMLElement>('[data-preloader-panel]', root)
      const dividers = gsap.utils.toArray<HTMLElement>('[data-preloader-divider]', root)
      const contents = gsap.utils.toArray<HTMLElement>('[data-preloader-content]', root)
      const underlines = gsap.utils.toArray<HTMLElement>('[data-preloader-line]', root)
      const wave = root.querySelector<HTMLElement>('[data-preloader-wave]')
      const logo = root.querySelector<HTMLElement>('[data-preloader-logo]')
      const logoLetters = gsap.utils.toArray<SVGPathElement>('[data-preloader-logo-letter]', root)
      const logoReg = gsap.utils.toArray<SVGElement>('[data-preloader-logo-reg]', root)
      // Nét vẽ theo thứ tự B→O rồi ®; chỉ path mới đổ màu (vòng ® là stroke)
      const logoStrokes = [...logoLetters, ...logoReg]
      const logoFills = logoStrokes.filter((el) => el.tagName === 'path')
      const logoBars = gsap.utils.toArray<HTMLElement>('[data-preloader-logo-bar]', root)

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
        gsap.set([panels, dividers, contents, underlines, wave, logo, logoBars].filter(Boolean), {
          clearProps: 'transform,translate,opacity,visibility',
        })
        gsap.set(root, { pointerEvents: 'auto', backgroundColor: BG, autoAlpha: 1 })
        gsap.set(panels, { xPercent: -110, x: 0, y: 0, force3D: true })
        gsap.set(dividers, { xPercent: -110, x: 0, y: 0, force3D: true })
        gsap.set(contents, { autoAlpha: 0, x: -28, y: 0 })
        if (logo) gsap.set(logo, { autoAlpha: 1 })
        gsap.set(logoStrokes, { drawSVG: '0%', stroke: LOGO_GOLD })
        gsap.set(logoFills, { fillOpacity: 0, strokeWidth: 2.4 })
        // Nằm dưới mép clip (y 138) → đẩy lên mới lộ ra
        gsap.set(logoBars, { y: 24 })
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

      // Mở đầu: vẽ nét từng chữ → đổ màu, nét thu về 0.8 → vạch xanh lần lượt, vạch vàng sau cùng
      // → panel trượt vào che logo (divider cùng nhịp panel để seam không tách mép)
      const intro = logo ? 2.15 : 0
      if (logoStrokes.length) {
        tl.to(
          logoStrokes,
          { drawSVG: '100%', duration: 0.8, stagger: 0.08, ease: 'power2.inOut' },
          0.1,
        )
          // Nét vàng giữ một nhịp rồi mới đổ màu xanh, viền chuyển dần sang xanh
          .to(
            logoFills,
            { fillOpacity: 1, strokeWidth: 0.8, duration: 0.55, stagger: 0.08, ease: 'power1.out' },
            0.85,
          )
          .to(
            logoStrokes,
            { stroke: LOGO_NAVY, duration: 0.55, stagger: 0.08, ease: 'power1.out' },
            0.85,
          )
      }
      if (logoBars.length) {
        const gold = logoBars[2]
        tl.to(
          logoBars.filter((bar) => bar !== gold),
          { y: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.6)' },
          1.2,
        ).to(gold, { y: 0, duration: 0.6, ease: 'back.out(2.2)' }, 1.55)
      }

      tl.to(panels, { xPercent: 0, duration: 0.95, stagger: 0.09 }, intro)
        .to(dividers, { xPercent: 0, duration: 0.95, stagger: 0.09 }, intro)
        .to(contents, { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.09 }, intro + 0.35)
        .to(
          underlines,
          { scaleX: 1, duration: 0.4, stagger: 0.09, ease: 'power2.out' },
          intro + 0.55,
        )

      if (wave) {
        tl.to(wave, { yPercent: 0, duration: 0.75, ease: 'power3.out' }, intro + 0.3)
      }
      // Panel đã che kín → ẩn hẳn logo, tránh lộ lại khi panel rút ra
      if (logo) tl.set(logo, { autoAlpha: 0 }, intro + 1.4)

      // Hold → đẩy ra phải
      tl.to({}, { duration: 1 })
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
        gsap.killTweensOf([
          panels,
          dividers,
          contents,
          underlines,
          wave,
          logo,
          logoStrokes,
          logoBars,
          root,
        ])
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

      {/* Logo mở đầu — nằm dưới panel trong DOM để panel trượt vào che lên */}
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
        <div
          data-preloader-logo
          style={{ opacity: 0 }}
        >
          <PreloaderLogo className='h-[6rem] w-auto xsm:h-[4rem]' />
        </div>
      </div>

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
