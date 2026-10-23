'use client'

import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

/**
 * Luôn bọc ReactLenis từ frame đầu — không mount có điều kiện sau useEffect.
 * Trước đây: SSR/lần đầu render `children` trần → sau mount bọc Lenis → remount cả app
 * (trông như reload trang chủ ~1s, AOS chạy lại).
 *
 * `syncTouch: false`: mobile giữ scroll native; không gọi `stop()` (stop preventDefault làm mất touch scroll).
 */
export function LenisProvider({ children }: Props) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
