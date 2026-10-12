'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { animate, motion, useInView } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-fade'

const SLIDES = [
  {
    src: '/home/vision/d-img-1.jpg',
    alt: 'Lễ kỷ niệm 14 năm Bateco',
    caption: 'Lễ kỷ niệm 14 năm Bateco',
  },
  { src: '/home/vision/d-img-2.jpg', alt: 'Hoạt động Bateco', caption: 'Hoạt động Bateco' },
  { src: '/home/vision/d-img-3.jpg', alt: 'Đội ngũ Bateco', caption: 'Đội ngũ Bateco' },
] as const

const STATS = [
  { value: '14', lines: ['Năm', 'hình thành', 'và', 'phát triển'], top: [24.6, 18.5] },
  { value: '05', lines: ['Lĩnh vực', 'kinh doanh', 'mũi nhọn'], top: [11, 3.8] },
  { value: '1.000', lines: ['Tỷ đồng', 'vốn chủ', 'sở hữu'], top: [0, 0] },
  { value: '14', lines: ['Năm', 'kinh nghiệm', 'lãnh đạo'], top: [3.8, 11] },
  { value: '09', lines: ['Công ty', 'thành viên'], top: [18.5, 24.6] },
] as const

// Cột giữa luôn có viền dày như design, cũng là tâm cho nhịp cột mọc lên
const FEATURED_STAT = 2

const AUTOPLAY_DELAY = 5000

const SPRING = { type: 'spring', stiffness: 260, damping: 22 } as const

// Đếm số từ 0 lên giá trị thật, giữ nguyên định dạng gốc (số 0 đứng đầu, dấu chấm hàng nghìn)
const CountUp = ({ value, start, delay }: { value: string; start: boolean; delay: number }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const target = Number(value.replace(/\./g, ''))
  const format = (n: number) =>
    Math.round(n)
      .toLocaleString('de-DE')
      .padStart(value.startsWith('0') ? value.length : 0, '0')

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

const Vision = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [active, setActive] = useState(0)
  // Cột đang hover: nổi lên + sáng hơn, rời chuột thì trở lại bình thường
  const [focused, setFocused] = useState<number | null>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const inView = useInView(statsRef, { once: true, amount: 0.4 })

  return (
    <section className='px-[3.125rem] py-[4.5rem] xsm:px-[1.5rem] xsm:py-[2.5rem]'>
      <div className='mx-auto flex max-w-[95rem] items-center gap-[3.75rem] xsm:flex-col xsm:items-stretch xsm:gap-[2rem]'>
        <div
          data-aos='fade-right'
          className='w-[46%] shrink-0 xsm:w-full'
        >
          <div className='relative pr-[1.25rem] pb-[1.25rem] xsm:pr-[0.75rem] xsm:pb-[0.75rem]'>
            <span
              aria-hidden
              className='absolute top-[1.25rem] right-0 bottom-0 left-[1.25rem] rounded-[1.25rem] border border-[#C6A15B]/70 xsm:top-[0.75rem] xsm:left-[0.75rem]'
            />
            <span
              aria-hidden
              className='absolute -top-[0.6rem] -left-[0.6rem] size-[4.5rem] rounded-tl-[1.5rem] border-t-2 border-l-2 border-[#C6A15B] xsm:size-[2.5rem]'
            />

            <div className='group relative overflow-hidden rounded-[1.25rem] bg-[#0B1A33] shadow-[0_1.5rem_3.5rem_rgba(16,40,72,0.28)]'>
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect='fade'
                fadeEffect={{ crossFade: true }}
                speed={900}
                loop
                autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
                onSwiper={setSwiper}
                onSlideChange={(instance) => setActive(instance.realIndex)}
              >
                {SLIDES.map((slide, index) => (
                  <SwiperSlide key={slide.src}>
                    <div className='relative aspect-[4/3] overflow-hidden'>
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        priority={index === 0}
                        sizes='(max-width: 639px) 92vw, 42vw'
                        className={`object-cover transition-transform duration-[6000ms] ease-out ${active === index ? 'scale-[1.08]' : 'scale-100'}`}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className='pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[45%] bg-[linear-gradient(180deg,transparent_0%,rgba(5,10,20,0.55)_55%,rgba(5,10,20,0.85)_100%)]' />

              <div className='absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-[1rem] px-[1.5rem] pb-[1.25rem] xsm:px-[1rem] xsm:pb-[0.9rem]'>
                <div className='min-w-0'>
                  <p className='flex items-baseline gap-[0.35rem] font-bold text-[#E4C36A]'>
                    <span className='text-[1.75rem] leading-none xsm:text-[1.25rem]'>
                      {String(active + 1).padStart(2, '0')}
                    </span>
                    <span className='text-[0.85rem] text-white/60'>
                      / {String(SLIDES.length).padStart(2, '0')}
                    </span>
                  </p>
                  <p
                    key={active}
                    className='mt-[0.4rem] animate-in truncate text-[1rem] font-semibold tracking-[0.03em] text-white uppercase duration-700 fade-in slide-in-from-bottom-2 xsm:text-[0.8rem]'
                  >
                    {SLIDES[active].caption}
                  </p>
                  <div className='mt-[0.75rem] flex gap-[0.4rem]'>
                    {SLIDES.map((slide, index) => (
                      <button
                        key={slide.src}
                        type='button'
                        aria-label={`Ảnh ${index + 1}`}
                        onClick={() => swiper?.slideToLoop(index)}
                        className={`relative h-[0.2rem] overflow-hidden rounded-full transition-all duration-500 ${active === index ? 'w-[2.75rem] bg-[#C6A15B]/45' : 'w-[1rem] bg-white/35 hover:bg-white/70'}`}
                      >
                        {active === index && (
                          <span
                            key={active}
                            className='absolute inset-y-0 left-0 rounded-full bg-[#F2C96B]'
                            style={{
                              animation: `vision-progress ${AUTOPLAY_DELAY}ms linear forwards`,
                            }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className='flex shrink-0 gap-[0.5rem]'>
                  <button
                    type='button'
                    aria-label='Ảnh trước'
                    onClick={() => swiper?.slidePrev()}
                    className='flex size-[2.6rem] items-center justify-center rounded-full border border-[#C6A15B]/80 bg-[#0B1A33]/40 text-[#E4C36A] backdrop-blur-sm transition-colors hover:bg-[#C6A15B] hover:text-[#0B1A33] xsm:size-[2.1rem]'
                  >
                    <ChevronLeft className='size-[1.1rem]' />
                  </button>
                  <button
                    type='button'
                    aria-label='Ảnh tiếp theo'
                    onClick={() => swiper?.slideNext()}
                    className='flex size-[2.6rem] items-center justify-center rounded-full border border-[#C6A15B]/80 bg-[#0B1A33]/40 text-[#E4C36A] backdrop-blur-sm transition-colors hover:bg-[#C6A15B] hover:text-[#0B1A33] xsm:size-[2.1rem]'
                  >
                    <ChevronRight className='size-[1.1rem]' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='min-w-0 flex-1'>
          <h2
            data-aos='fade-up'
            data-aos-delay='150'
            className='text-center text-[2.15rem] leading-[1.25] font-bold tracking-[0.04em] uppercase xsm:text-[1.55rem]'
            style={{
              background: 'linear-gradient(93deg, #DFBA73 0%, #BA8A38 55%, #996E27 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Từ tầm nhìn đến
            <br />
            năng lực thực thi
          </h2>

          <div
            ref={statsRef}
            className='mt-[2rem] flex h-[24rem] items-stretch gap-[0.9rem] xsm:h-[18rem] xsm:gap-[0.35rem]'
          >
            {STATS.map((stat, index) => {
              const [topLeft, topRight] = stat.top
              const offset = Math.min(topLeft, topRight)
              const gradientId = `vision-col-${index}`
              const isOn = focused === index
              const shape = `polygon(0 ${topLeft}%, 100% ${topRight}%, 100% 100%, 0 100%)`

              return (
                // Lớp ngoài: cột mọc từ dưới lên khi cuộn tới (lệch nhịp từ giữa ra 2 bên)
                <motion.div
                  key={index}
                  className='relative min-w-0 flex-1'
                  initial={{ opacity: 0, y: 60 }}
                  animate={inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ ...SPRING, delay: Math.abs(index - FEATURED_STAT) * 0.12 }}
                >
                  {/* Lớp trong: nổi lên khi được nhấn mạnh, cột khác hơi tối đi để làm nổi cột đang hover */}
                  <motion.div
                    onHoverStart={() => setFocused(index)}
                    onHoverEnd={() => setFocused(null)}
                    className='absolute inset-0 cursor-default'
                    animate={{
                      y: isOn ? -12 : 0,
                      filter: focused !== null && !isOn ? 'brightness(0.8)' : 'brightness(1)',
                    }}
                    transition={SPRING}
                  >
                    <svg
                      viewBox='0 0 100 100'
                      preserveAspectRatio='none'
                      aria-hidden
                      className='absolute inset-0 size-full overflow-visible'
                    >
                      <defs>
                        <linearGradient
                          id={gradientId}
                          x1='0'
                          y1='0'
                          x2='0'
                          y2='1'
                        >
                          <stop
                            offset='0%'
                            stopColor='#24509C'
                          />
                          <stop
                            offset='55%'
                            stopColor='#15306A'
                          />
                          <stop
                            offset='100%'
                            stopColor='#050A14'
                          />
                        </linearGradient>
                        <linearGradient
                          id={`${gradientId}-on`}
                          x1='0'
                          y1='0'
                          x2='0'
                          y2='1'
                        >
                          <stop
                            offset='0%'
                            stopColor='#3466C2'
                          />
                          <stop
                            offset='55%'
                            stopColor='#1C3C84'
                          />
                          <stop
                            offset='100%'
                            stopColor='#0A1430'
                          />
                        </linearGradient>
                      </defs>
                      <path
                        d={`M0,${topLeft} L100,${topRight} L100,100 L0,100 Z`}
                        fill={`url(#${gradientId})`}
                      />
                      <motion.path
                        d={`M0,${topLeft} L100,${topRight} L100,100 L0,100 Z`}
                        fill={`url(#${gradientId}-on)`}
                        initial={false}
                        animate={{ opacity: isOn ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                      />
                      {/* Viền vàng hiện dần khi cột mọc lên, dày + sáng hơn khi hover */}
                      <motion.path
                        d={`M0,100 L0,${topLeft} L100,${topRight} L100,100`}
                        fill='none'
                        vectorEffect='non-scaling-stroke'
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: inView ? 1 : 0,
                          stroke: isOn ? '#F2C96B' : '#C6A15B',
                          strokeWidth: isOn || index === FEATURED_STAT ? 3 : 1.5,
                        }}
                        transition={{
                          opacity: { duration: 0.6, delay: 0.3 + index * 0.1 },
                          default: { duration: 0.4 },
                        }}
                      />
                    </svg>

                    {/* Vệt sáng quét chéo qua cột mỗi khi cột được nhấn mạnh */}
                    <div
                      aria-hidden
                      className='pointer-events-none absolute inset-0 overflow-hidden'
                      style={{ clipPath: shape }}
                    >
                      <motion.span
                        className='absolute inset-y-0 w-[60%] -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,236,190,0.28),transparent)]'
                        initial={{ left: '-100%' }}
                        animate={isOn ? { left: ['-100%', '130%'] } : { left: '-100%' }}
                        transition={isOn ? { duration: 0.9, ease: 'easeInOut' } : { duration: 0 }}
                      />
                    </div>

                    <div
                      className='absolute inset-x-0 bottom-0 flex flex-col items-center text-center'
                      style={{ top: `${offset + 9}%` }}
                    >
                      <motion.span
                        className='w-px flex-1 origin-top'
                        initial={{ scaleY: 0 }}
                        animate={{
                          scaleY: inView ? 1 : 0,
                          backgroundColor: isOn ? 'rgba(228,195,106,0.8)' : 'rgba(198,161,91,0.35)',
                        }}
                        transition={{
                          scaleY: { duration: 0.8, delay: 0.6 + index * 0.1 },
                          default: { duration: 0.4 },
                        }}
                      />
                      <motion.p
                        className='py-[0.6rem] text-[2.5rem] leading-none font-extrabold xsm:text-[1.1rem]'
                        style={{
                          background: 'linear-gradient(178deg, #FFF 40.58%, #F6A600 78.32%)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                        animate={{ scale: isOn ? 1.14 : 1 }}
                        transition={SPRING}
                      >
                        <CountUp
                          value={stat.value}
                          start={inView}
                          delay={0.4 + index * 0.1}
                        />
                      </motion.p>
                      <p className='mt-[0.4rem] h-[4.4rem] px-[0.25rem] text-[0.8rem] leading-[1.35] font-semibold tracking-[0.02em] text-white uppercase xsm:h-[2.5rem] xsm:text-[0.45rem]'>
                        {stat.lines.map((line) => (
                          <span
                            key={line}
                            className='block'
                          >
                            {line}
                          </span>
                        ))}
                      </p>
                      <motion.span
                        className='mt-[0.9rem] h-[0.12rem] w-[70%] shrink-0 xsm:mt-[0.5rem]'
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: inView ? (isOn ? 1 : 0.64) : 0,
                          backgroundColor: isOn ? '#F2C96B' : '#C6A15B',
                        }}
                        transition={SPRING}
                      />
                      <motion.span
                        className='h-[2.75rem] w-px shrink-0 xsm:h-[1.25rem]'
                        animate={{
                          backgroundColor: isOn ? 'rgba(228,195,106,0.8)' : 'rgba(198,161,91,0.35)',
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Vision
