'use client'

import { Star } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import Image from 'next/image'
import { useId, useRef } from 'react'

import type { HomepageFootprint, HomepageMapPoint } from '@/interfaces/homepage.interface'
import { cn } from '@/lib/utils'
import {
  type LabelSide,
  type MapPoint,
  project,
  VIEWBOX,
} from '@/views/homepage/footprint/projection'

const toMapPoint = (point?: HomepageMapPoint): MapPoint | null => {
  const lat = Number(point?.lat)
  const lon = Number(point?.lon)
  if (!point?.name || Number.isNaN(lat) || Number.isNaN(lon)) return null

  return { name: point.name, lat, lon }
}

/** Origin đẩy nhãn sang trái; điểm đến đẩy nhãn ra phía xa origin → tránh chồng (vd Hà Nội ↔ Quảng Ninh) */
const resolveLabel = (origin: MapPoint, point: MapPoint, isOrigin?: boolean): LabelSide => {
  if (isOrigin) return 'left'
  const from = project(origin)
  const to = project(point)
  const dx = to.x - from.x
  const dy = to.y - from.y
  if (Math.abs(dx) >= Math.abs(dy)) return dx >= 0 ? 'right' : 'left'
  return dy >= 0 ? 'bottom' : 'top'
}

const LINE_DURATION = 1.4
const LINE_STAGGER = 0.3
const LINE_START = 0.5

const LABEL_CLASS: Record<LabelSide, string> = {
  top: 'bottom-full left-1/2 mb-[0.4rem] -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-[0.4rem] -translate-x-1/2',
  left: 'right-full top-1/2 mr-[0.5rem] -translate-y-1/2',
  right: 'left-full top-1/2 ml-[0.5rem] -translate-y-1/2',
}

const toPercent = ({ x, y }: { x: number; y: number }) => ({
  left: `${(((x - VIEWBOX.x) / VIEWBOX.width) * 100).toFixed(3)}%`,
  top: `${(((y - VIEWBOX.y) / VIEWBOX.height) * 100).toFixed(3)}%`,
})

function curvePath(originPoint: MapPoint, point: MapPoint) {
  const from = project(originPoint)
  const to = project(point)
  const dx = to.x - from.x
  const dy = to.y - from.y
  const length = Math.hypot(dx, dy)
  let nx = -dy / length
  let ny = dx / length
  const outward = Math.abs(dx) > Math.abs(dy) ? ny < 0 : nx > 0
  if (!outward) {
    nx = -nx
    ny = -ny
  }
  const bend = length * (point.curve ?? 0.22)
  const cx = (from.x + to.x) / 2 + nx * bend
  const cy = (from.y + to.y) / 2 + ny * bend

  return `M${from.x} ${from.y} Q${cx.toFixed(2)} ${cy.toFixed(2)} ${to.x} ${to.y}`
}

const FootprintMap = ({ map }: { map?: HomepageFootprint['map'] }) => {
  const originPoint = toMapPoint(map?.origin)
  const points =
    map?.points?.map(toMapPoint).filter((point): point is MapPoint => Boolean(point)) || []

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const uid = useId()

  if (!originPoint || !points.length) return null

  const originXY = project(originPoint)

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

      <svg
        viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.width} ${VIEWBOX.height}`}
        className='pointer-events-none absolute inset-0 size-full overflow-visible'
        aria-hidden
      >
        {points.map((point, index) => {
          const d = curvePath(originPoint, point)
          const maskId = `${uid}-line-${index}`
          const delay = LINE_START + index * LINE_STAGGER

          return (
            <g key={`${point.name}-${index}`}>
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

      <div
        className='absolute z-10 -translate-x-1/2 -translate-y-1/2'
        style={toPercent(originXY)}
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
          name={originPoint.name}
          side={resolveLabel(originPoint, originPoint, true)}
          show={inView}
          delay={0.2}
          strong
        />
      </div>

      {points.map((point, index) => {
        const delay = LINE_START + index * LINE_STAGGER + LINE_DURATION * 0.9

        return (
          <div
            key={`${point.name}-${index}`}
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
              side={resolveLabel(originPoint, point)}
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
