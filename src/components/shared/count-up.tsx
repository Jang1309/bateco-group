'use client'

import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

type CountUpProps = {
  /** Chuỗi hiển thị cuối cùng, vd: '14+', '05', '400+' */
  value: string
  duration?: number
  delay?: number
  className?: string
}

const parseValue = (value: string) => {
  const match = value.match(/^(\D*)(\d+)(.*)$/)
  if (!match) return null
  const [, prefix, digits, suffix] = match
  return { prefix, suffix, target: Number(digits), pad: digits.startsWith('0') ? digits.length : 1 }
}

const formatValue = (value: string, n: number) => {
  const parsed = parseValue(value)
  if (!parsed) return value
  return `${parsed.prefix}${String(Math.round(n)).padStart(parsed.pad, '0')}${parsed.suffix}`
}

const CountUp = ({ value, duration = 1.6, delay = 0, className }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    const parsed = parseValue(value)
    if (!node || !parsed || !inView) return

    if (reducedMotion) {
      node.textContent = value
      return
    }

    const controls = animate(0, parsed.target, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = formatValue(value, latest)
      },
    })

    return () => controls.stop()
  }, [inView, reducedMotion, value, duration, delay])

  return (
    <span className={className}>
      <span className='sr-only'>{value}</span>
      <span
        ref={ref}
        aria-hidden
        className='tabular-nums'
      >
        {formatValue(value, 0)}
      </span>
    </span>
  )
}

export default CountUp
