'use client'

import { animate } from 'motion/react'
import { useEffect, useRef } from 'react'

type CountUpProps = {
  value: string
  start: boolean
  delay: number
}

const CountUp = ({ value, start, delay }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const target = Number(value.replace(/\./g, ''))
  // Chỉ chèn dấu . khi CMS nhập sẵn (vd "1.000"); "2032" là năm → giữ nguyên
  const grouped = value.includes('.')
  const format = (n: number) => {
    const rounded = Math.round(n)
    return (grouped ? rounded.toLocaleString('de-DE') : String(rounded)).padStart(
      value.startsWith('0') ? value.length : 0,
      '0',
    )
  }

  useEffect(() => {
    if (!start || !ref.current) return
    const node = ref.current
    const controls = animate(0, target, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest)
      },
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start])

  return <span ref={ref}>{start ? format(0) : value}</span>
}

export default CountUp
