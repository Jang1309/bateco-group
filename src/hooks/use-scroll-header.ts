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

    const updateBackground = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const isScrolled = scrollY > 80

        el.classList.toggle('header-scrolled', isScrolled)
        el.style.backgroundColor = isScrolled
          ? 'rgba(31, 56, 100, 0.9)'
          : solid
            ? '#fff'
            : 'transparent'
        el.style.backdropFilter = isScrolled ? 'blur(1.25rem)' : 'none'
        el.style.boxShadow = solid && !isScrolled ? '0 1px 0 #e8edf5' : 'none'

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

    return () => window.removeEventListener('scroll', updateBackground)
  }, [headerRef, isClient, solid])

  return headerRef
}
