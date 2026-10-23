'use client'

import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { useEffect, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

/** Lenis `stop()` chặn touch (preventDefault) → mobile không scroll được. Chỉ bật trên desktop sau mount. */
export function LenisProvider({ children }: Props) {
  const [smooth, setSmooth] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const sync = () => setSmooth(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  if (!smooth) return children

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
