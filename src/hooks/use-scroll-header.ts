'use client'

import { useEffect, useRef } from 'react'

import { useIsClient } from '@/hooks/use-is-client'

type ScrollHeaderOptions = {
  solid?: boolean
}

export function useScrollHeader(
  headerRef: React.RefObject<HTMLElement | null>,
  { solid = false }: ScrollHeaderOptions = {},
) {
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const isClient = useIsClient()

  useEffect(() => {
    if (!isClient) return

    const el = headerRef.current
    if (!el) return

    lastScrollY.current = window.scrollY
    el.style.transform = 'translateY(0)'

    // Mobile: header trong suốt dễ chìm vào ảnh banner, nên dùng nền trắng mờ khi ở đầu trang
    const mobileQuery = window.matchMedia('(max-width: 639px)')

    const updateBackground = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const isScrolled = scrollY > 80

        const isMobile = mobileQuery.matches
        const frostedTop = isMobile && !solid

        el.classList.toggle('header-scrolled', isScrolled)
        el.style.backgroundColor = isScrolled
          ? 'rgba(31, 56, 100, 0.9)'
          : solid
            ? '#fff'
            : frostedTop
              ? 'rgba(255, 255, 255, 0.82)'
              : 'transparent'
        el.style.backdropFilter = isScrolled
          ? 'blur(1.25rem)'
          : frostedTop
            ? 'blur(0.75rem)'
            : 'none'
        el.style.boxShadow =
          (solid || frostedTop) && !isScrolled ? '0 1px 0 rgba(26, 43, 72, 0.08)' : 'none'

        if (scrollY <= 0) {
          el.style.transform = 'translateY(0)'
        } else if (Math.abs(scrollY - lastScrollY.current) > 15) {
          el.style.transform = scrollY > lastScrollY.current ? 'translateY(-150%)' : 'translateY(0)'
          lastScrollY.current = scrollY
        }

        ticking.current = false
      })
    }

    updateBackground()
    window.addEventListener('scroll', updateBackground, { passive: true })
    mobileQuery.addEventListener('change', updateBackground)

    return () => {
      window.removeEventListener('scroll', updateBackground)
      mobileQuery.removeEventListener('change', updateBackground)
    }
  }, [headerRef, isClient, solid])

  return headerRef
}
