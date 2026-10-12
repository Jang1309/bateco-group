'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

import { MILESTONES } from './data'

// Mỗi giai đoạn hiển thị 6s rồi tự chuyển (chỉ chạy khi section đang trong màn hình)
const AUTOPLAY_MS = 6000
const EASE = [0.22, 1, 0.36, 1] as const

// Khung vẽ đường cong "đi lên" tượng trưng cho tăng trưởng (toạ độ theo viewBox)
const VIEW = { width: 1400, height: 480 }
const NODES = [
  { x: 110, y: 410 },
  { x: 430, y: 355 },
  { x: 740, y: 295 },
  { x: 1010, y: 185 },
  { x: 1290, y: 90 },
]

// Đoạn cong mềm nối 2 điểm (tiếp tuyến nằm ngang ở 2 đầu)
const segment = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const dx = (b.x - a.x) / 2
  return `M${a.x} ${a.y} C${a.x + dx} ${a.y} ${b.x - dx} ${b.y} ${b.x} ${b.y}`
}
const LEAD_IN = segment({ x: -40, y: 455 }, NODES[0])
const LEAD_OUT = segment(NODES[NODES.length - 1], { x: VIEW.width + 40, y: 30 })
const SEGMENTS = NODES.slice(1).map((node, index) => segment(NODES[index], node))
const FULL_PATH = [LEAD_IN, ...SEGMENTS, LEAD_OUT].join(' ')

const toPercent = ({ x, y }: { x: number; y: number }) => ({
  left: `${(x / VIEW.width) * 100}%`,
  top: `${(y / VIEW.height) * 100}%`,
})

const pad = (value: number) => String(value).padStart(2, '0')

const goldText = {
  background: 'linear-gradient(180deg, #F6DFAA 0%, #DFBA73 45%, #B88E4F 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
} as const

const FADE_UP = {
  hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
  shown: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE } },
  leave: { opacity: 0, y: -8, filter: 'blur(4px)', transition: { duration: 0.25 } },
}

const JourneyTimeline = () => {
  const [active, setActive] = useState(0)

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const revealed = useInView(ref, { amount: 0.3, once: true })
  const reduceMotion = useReducedMotion()
  const playing = inView && !reduceMotion

  const total = MILESTONES.length
  const item = MILESTONES[active]
  const goTo = (index: number) => setActive((index + total) % total)

  useEffect(() => {
    if (!playing) return
    const timer = setTimeout(() => setActive((current) => (current + 1) % total), AUTOPLAY_MS)
    return () => clearTimeout(timer)
  }, [playing, active, total])

  return (
    <div
      ref={ref}
      className='mx-auto mt-[3.5rem] max-w-[95rem] px-[3.75rem] xsm:mt-[2rem] xsm:px-[1.5rem]'
    >
      {/* ================= Desktop: đường cong tăng trưởng ================= */}
      <div
        className='relative w-full xsm:hidden'
        style={{ aspectRatio: `${VIEW.width} / ${VIEW.height}` }}
      >
        {/* Số năm cực lớn mờ làm nền phía phải */}
        <AnimatePresence initial={false}>
          <motion.span
            key={`ghost-${active}`}
            aria-hidden
            className='pointer-events-none absolute right-[2%] bottom-[-6%] text-[13rem] leading-none font-black text-transparent select-none'
            style={{ WebkitTextStroke: '1px rgba(223,186,115,0.12)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {item.from}
          </motion.span>
        </AnimatePresence>

        <svg
          viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
          className='absolute inset-0 size-full overflow-visible'
          aria-hidden
        >
          <defs>
            <linearGradient
              id='journey-gold'
              x1='0'
              y1='0'
              x2='1'
              y2='0'
            >
              <stop
                offset='0%'
                stopColor='#B88E4F'
              />
              <stop
                offset='100%'
                stopColor='#F6DFAA'
              />
            </linearGradient>
            <filter
              id='journey-glow'
              x='-20%'
              y='-50%'
              width='140%'
              height='200%'
            >
              <feGaussianBlur stdDeviation='4' />
            </filter>
          </defs>

          {/* Đường nền nét đứt, tự vẽ ra khi cuộn tới */}
          <motion.path
            d={FULL_PATH}
            fill='none'
            stroke='rgba(223,186,115,0.28)'
            strokeWidth={1.5}
            strokeDasharray='2 8'
            strokeLinecap='round'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: revealed ? 1 : 0 }}
            transition={{ duration: 1.8, ease: EASE }}
          />

          {/* Đoạn vàng sáng chạy tới giai đoạn đang chọn (thêm 1 lớp mờ phía sau làm quầng sáng) */}
          {SEGMENTS.map((d, index) => {
            const on = revealed && index < active
            const transition = {
              duration: 0.7,
              ease: EASE,
              delay: on ? Math.max(0, index - (active - 1)) * 0.15 : 0,
            }
            return (
              <g key={index}>
                <motion.path
                  d={d}
                  fill='none'
                  stroke='url(#journey-gold)'
                  strokeWidth={6}
                  strokeLinecap='round'
                  filter='url(#journey-glow)'
                  opacity={0.6}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: on ? 1 : 0 }}
                  transition={transition}
                />
                <motion.path
                  d={d}
                  fill='none'
                  stroke='url(#journey-gold)'
                  strokeWidth={2.5}
                  strokeLinecap='round'
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: on ? 1 : 0 }}
                  transition={transition}
                />
              </g>
            )
          })}
        </svg>

        {/* Thẻ kính hiển thị chi tiết, nằm ở khoảng trống góc trên trái của đường cong */}
        <div className='absolute top-0 left-0 w-[38%] rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.02)_100%)] px-[2rem] py-[1.75rem] shadow-[0_1.5rem_3rem_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md'>
          <div className='flex items-center justify-between'>
            <p className='text-[0.75rem] font-semibold tracking-[0.22em] text-[#DFBA73] uppercase'>
              Giai đoạn {pad(active + 1)}
              <span className='text-white/35'> / {pad(total)}</span>
            </p>
            <div className='flex gap-[0.5rem]'>
              <NavButton
                label='Giai đoạn trước'
                onClick={() => goTo(active - 1)}
              >
                <ChevronLeft className='size-[1rem]' />
              </NavButton>
              <NavButton
                label='Giai đoạn tiếp theo'
                onClick={() => goTo(active + 1)}
              >
                <ChevronRight className='size-[1rem]' />
              </NavButton>
            </div>
          </div>

          <div className='relative mt-[1rem] min-h-[10rem]'>
            <AnimatePresence
              mode='wait'
              initial={false}
            >
              <motion.div
                key={active}
                initial='hidden'
                animate='shown'
                exit='leave'
                variants={{ shown: { transition: { staggerChildren: 0.07 } } }}
              >
                <motion.p
                  className='text-[3rem] leading-none font-extrabold tracking-[-0.01em]'
                  style={goldText}
                  variants={FADE_UP}
                >
                  {item.from}
                  <span className='mx-[0.6rem] text-[2rem] align-middle'>—</span>
                  {item.to}
                </motion.p>
                <motion.h3
                  className='mt-[0.85rem] text-[1.375rem] leading-[1.3] font-bold tracking-[0.02em] text-white uppercase'
                  variants={FADE_UP}
                >
                  {item.title}
                </motion.h3>
                {item.description && (
                  <motion.p
                    className='mt-[0.6rem] text-[0.875rem] leading-[1.65] text-white/70'
                    variants={FADE_UP}
                  >
                    {item.description}
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Các mốc trên đường cong */}
        {MILESTONES.map((milestone, index) => {
          const isActive = index === active
          const isReached = index <= active

          return (
            <motion.button
              key={milestone.from}
              type='button'
              onClick={() => goTo(index)}
              aria-current={isActive ? 'step' : undefined}
              aria-label={`${milestone.from} – ${milestone.to}: ${milestone.title}`}
              className='group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center'
              style={toPercent(NODES[index])}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={revealed ? { opacity: 1, scale: 1 } : undefined}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 18,
                delay: 0.4 + index * 0.18,
              }}
            >
              <span className='relative flex size-[2.75rem] items-center justify-center'>
                {/* Vòng sáng lan toả + vòng đếm thời gian tự chuyển */}
                {isActive && (
                  <>
                    <span className='absolute inset-0 animate-ping rounded-full bg-[#DFBA73]/25 [animation-duration:2.4s]' />
                    <svg
                      viewBox='0 0 44 44'
                      className='absolute inset-0 -rotate-90'
                      aria-hidden
                    >
                      <circle
                        cx='22'
                        cy='22'
                        r='20'
                        fill='rgba(11,26,51,0.9)'
                        stroke='rgba(223,186,115,0.25)'
                        strokeWidth='1.5'
                      />
                      <motion.circle
                        key={`${active}-${playing}`}
                        cx='22'
                        cy='22'
                        r='20'
                        fill='none'
                        stroke='#DFBA73'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: playing ? 1 : 0 }}
                        transition={{
                          duration: playing ? AUTOPLAY_MS / 1000 : 0.3,
                          ease: 'linear',
                        }}
                      />
                    </svg>
                  </>
                )}
                <motion.span
                  className={cn(
                    'relative block rounded-full border-2',
                    isReached
                      ? 'border-[#FFF3D6] bg-[radial-gradient(circle_at_35%_30%,#FFF1CC,#DFBA73_55%,#A67A32)] shadow-[0_0_1.25rem_rgba(223,186,115,0.85)]'
                      : 'border-[#DFBA73]/50 bg-[#0B1A33] group-hover:border-[#DFBA73]',
                  )}
                  initial={false}
                  animate={{ width: isActive ? 18 : 12, height: isActive ? 18 : 12 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                />
              </span>

              {/* Nhãn dưới mốc */}
              <span className='pointer-events-none absolute top-full mt-[0.25rem] flex w-[12rem] flex-col items-center text-center'>
                <span
                  className={cn(
                    'text-[1.375rem] leading-none font-bold transition-colors duration-300',
                    isActive ? '' : 'text-white/45 group-hover:text-white/80',
                  )}
                  style={isActive ? goldText : undefined}
                >
                  {milestone.from}
                </span>
                <span
                  className={cn(
                    'mt-[0.4rem] text-[0.8125rem] leading-[1.4] transition-colors duration-300',
                    isActive
                      ? 'font-semibold text-white'
                      : 'text-white/45 group-hover:text-white/70',
                  )}
                >
                  {milestone.title}
                </span>
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* ================= Mobile: trục dọc ================= */}
      <ol className='relative hidden pl-[1.75rem] xsm:block'>
        <span className='absolute top-[0.5rem] bottom-[0.5rem] left-[0.4rem] w-px bg-[linear-gradient(180deg,#DFBA73,rgba(223,186,115,0.15))]' />
        {MILESTONES.map((milestone, index) => (
          <li
            key={milestone.from}
            data-aos='fade-up'
            data-aos-delay={index * 80}
            className='relative pb-[1.75rem] last:pb-0'
          >
            <span className='absolute top-[0.35rem] -left-[1.75rem] size-[0.85rem] rounded-full border-2 border-[#FFF3D6] bg-[radial-gradient(circle_at_35%_30%,#FFF1CC,#DFBA73_55%,#A67A32)] shadow-[0_0_0.75rem_rgba(223,186,115,0.8)]' />
            <p
              className='text-[1.375rem] leading-none font-extrabold'
              style={goldText}
            >
              {milestone.from} — {milestone.to}
            </p>
            <h3 className='mt-[0.5rem] text-[1rem] leading-[1.4] font-bold text-white uppercase'>
              {milestone.title}
            </h3>
            {milestone.description && (
              <p className='mt-[0.4rem] text-[0.875rem] leading-[1.65] text-white/70'>
                {milestone.description}
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

type NavButtonProps = { label: string; onClick: () => void; children: React.ReactNode }

const NavButton = ({ label, onClick, children }: NavButtonProps) => (
  <button
    type='button'
    aria-label={label}
    onClick={onClick}
    className='flex size-[2.25rem] items-center justify-center rounded-full border border-[#DFBA73]/50 text-[#DFBA73] transition-colors duration-300 hover:bg-[#DFBA73] hover:text-[#0B1A33]'
  >
    {children}
  </button>
)

export default JourneyTimeline
