'use client'

import { Star } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import Image from 'next/image'
import { useId, useRef } from 'react'

import { cn } from '@/lib/utils'

import { type LabelSide, type MapPoint, ORIGIN, POINTS, project, VIEWBOX } from './data'

const LINE_DURATION = 1.4
const LINE_STAGGER = 0.3
const LINE_START = 0.5

const LABEL_CLASS: Record<LabelSide, string> = {
  top: 'bottom-full left-1/2 mb-[0.4rem] -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-[0.4rem] -translate-x-1/2',
  left: 'right-full top-1/2 mr-[0.5rem] -translate-y-1/2',
  right: 'left-full top-1/2 ml-[0.5rem] -translate-y-1/2',
}

const origin = project(ORIGIN)

// Toạ độ trong viewBox → % để đặt marker HTML khớp với bản đồ
const toPercent = ({ x, y }: { x: number; y: number }) => ({
  left: `${(((x - VIEWBOX.x) / VIEWBOX.width) * 100).toFixed(3)}%`,
  top: `${(((y - VIEWBOX.y) / VIEWBOX.height) * 100).toFixed(3)}%`,
})

// Đường cong bậc 2 từ Hà Nội tới điểm: điểm điều khiển lệch vuông góc với đoạn thẳng.
// Đoạn nằm ngang thì cong lên trên, đoạn dọc thì cong ra phía biển (bên phải).
function curvePath(point: MapPoint) {
  const to = project(point)
  const dx = to.x - origin.x
  const dy = to.y - origin.y
  const length = Math.hypot(dx, dy)
  let nx = -dy / length
  let ny = dx / length
  const outward = Math.abs(dx) > Math.abs(dy) ? ny < 0 : nx > 0
  if (!outward) {
    nx = -nx
    ny = -ny
  }
  const bend = length * (point.curve ?? 0.22)
  const cx = (origin.x + to.x) / 2 + nx * bend
  const cy = (origin.y + to.y) / 2 + ny * bend

  return `M${origin.x} ${origin.y} Q${cx.toFixed(2)} ${cy.toFixed(2)} ${to.x} ${to.y}`
}

const FootprintMap = () => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const uid = useId()

  return (
    <div
      ref={ref}
      className='relative w-full'
      style={{ aspectRatio: `${VIEWBOX.width} / ${VIEWBOX.height}` }}
    >
      <Image
        src='/vn.svg'
        alt='Bản đồ Việt Nam'
        fill
        unoptimized
        className='object-contain drop-shadow-[0_1.5rem_2rem_rgba(153,110,39,0.18)]'
      />

      {/* Đường nối: nét đứt được "vẽ" dần nhờ mask là một đường liền chạy pathLength 0 → 1 */}
      <svg
        viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.width} ${VIEWBOX.height}`}
        className='pointer-events-none absolute inset-0 size-full overflow-visible'
        aria-hidden
      >
        {POINTS.map((point, index) => {
          const d = curvePath(point)
          const maskId = `${uid}-line-${index}`
          const delay = LINE_START + index * LINE_STAGGER

          return (
            <g key={point.name}>
              <mask
                id={maskId}
                maskUnits='userSpaceOnUse'
              >
                <motion.path
                  d={d}
                  fill='none'
                  stroke='#fff'
                  strokeWidth={8}
                  strokeLinecap='round'
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: inView ? 1 : 0 }}
                  transition={{ duration: LINE_DURATION, delay, ease: [0.65, 0, 0.35, 1] }}
                />
              </mask>
              <motion.path
                d={d}
                fill='none'
                stroke='#E2B23C'
                strokeWidth={2.4}
                strokeLinecap='round'
                strokeDasharray='6 7'
                mask={`url(#${maskId})`}
                animate={{ strokeDashoffset: [0, -26] }}
                transition={{ duration: 1.2, ease: 'linear', repeat: Infinity }}
              />
            </g>
          )
        })}
      </svg>

      {/* Điểm gốc Hà Nội */}
      <div
        className='absolute z-10 -translate-x-1/2 -translate-y-1/2'
        style={toPercent(origin)}
      >
        <motion.span
          className='relative flex size-[1.6rem] items-center justify-center rounded-full border-2 border-white bg-[linear-gradient(180deg,#F2C14E_0%,#D99A1E_100%)] shadow-[0_0.3rem_0.8rem_rgba(217,154,30,0.45)] xsm:size-[1.25rem]'
          initial={{ scale: 0 }}
          animate={{ scale: inView ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        >
          <span className='absolute inset-0 animate-ping rounded-full bg-[#F2C14E]/50' />
          <Star className='relative size-[0.8rem] fill-white text-white xsm:size-[0.6rem]' />
        </motion.span>
        <Label
          name={ORIGIN.name}
          side={ORIGIN.label ?? 'right'}
          show={inView}
          delay={0.2}
          strong
        />
      </div>

      {/* Các điểm đến: hiện ra khi đường nối vẽ tới nơi */}
      {POINTS.map((point, index) => {
        const delay = LINE_START + index * LINE_STAGGER + LINE_DURATION * 0.9

        return (
          <div
            key={point.name}
            className='absolute z-10 -translate-x-1/2 -translate-y-1/2'
            style={toPercent(project(point))}
          >
            <motion.span
              className='relative block size-[0.85rem] rounded-full border-2 border-white bg-[#E9B640] shadow-[0_0.2rem_0.5rem_rgba(217,154,30,0.45)] xsm:size-[0.65rem]'
              initial={{ scale: 0 }}
              animate={{ scale: inView ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 14, delay }}
            >
              <span className='absolute -inset-[0.2rem] animate-ping rounded-full bg-[#F2C14E]/40 [animation-duration:2s]' />
            </motion.span>
            <Label
              name={point.name}
              side={point.label ?? 'bottom'}
              show={inView}
              delay={delay + 0.1}
            />
          </div>
        )
      })}
    </div>
  )
}

type LabelProps = { name: string; side: LabelSide; show: boolean; delay: number; strong?: boolean }

const Label = ({ name, side, show, delay, strong }: LabelProps) => (
  <motion.span
    className={cn(
      'absolute whitespace-nowrap text-[0.75rem] font-semibold text-[#1F2A44] xsm:text-[0.6rem]',
      strong && 'text-[0.9rem] font-bold xsm:text-[0.7rem]',
      LABEL_CLASS[side],
    )}
    initial={{ opacity: 0 }}
    animate={{ opacity: show ? 1 : 0 }}
    transition={{ duration: 0.4, delay }}
  >
    {name}
  </motion.span>
)

export default FootprintMap
