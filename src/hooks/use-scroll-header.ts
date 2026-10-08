'use client'

import { useEffect, useRef } from 'react'

import { useIsClient } from '@/hooks/use-is-client'

export function useScrollHeader(headerRef: React.RefObject<HTMLElement>) {
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const isClient = useIsClient()

  useEffect(() => {
    if (!isClient) return

    const el = headerRef.current
    if (!el) return

    lastScrollY.current = window.scrollY

    const updateBackground = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const isScrolled = scrollY > 80
        el.classList.toggle('header-scrolled', isScrolled)
        el.style.backgroundColor = isScrolled ? 'rgb(253 253 254 / 0.52)' : 'transparent'
        el.style.backdropFilter = isScrolled ? 'blur(1.25rem)' : 'none'

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
  }, [headerRef, isClient])

  return headerRef
}
