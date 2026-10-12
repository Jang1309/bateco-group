'use client'

import AOS from 'aos'
import 'aos/dist/aos.css'
import { usePathname } from 'next/navigation'
import { type ReactNode, useEffect } from 'react'

type Props = {
  children: ReactNode
}

export function AosProvider({ children }: Props) {
  const pathname = usePathname()

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      offset: 80,
      once: true,
      // Người dùng bật "giảm chuyển động" thì hiện nội dung luôn, không animate
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    })
  }, [])

  // Đổi trang: quét lại các phần tử data-aos mới
  useEffect(() => {
    AOS.refreshHard()
  }, [pathname])

  return children
}
