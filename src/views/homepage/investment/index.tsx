'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'

import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'

import { INVESTMENTS } from './data'

// Độ lệch ngang (rem) theo khoảng cách tới item giữa → tạo hình vòng cung
const FAN_OFFSET = [0, 2.5, 4.25]

const IDLE_BG =
  'linear-gradient(180deg, rgba(47, 91, 160, 0.95) 0%, rgba(5, 11, 20, 0.95) 100%), linear-gradient(180deg, rgba(47, 91, 160, 0.95) 0%, rgba(126, 134, 145, 0.95) 100%), #15171A'

const ACTIVE_BG =
  'linear-gradient(180deg, #DFBA73 0%, #FCD99D 27.49%, #996E27 100%), linear-gradient(73deg, rgba(182, 141, 76, 0.40) 34.75%, rgba(193, 151, 82, 0.70) 47.32%, #CCA057 59.9%)'

const SHIMMER_BORDER = {
  padding: '0.125rem',
  background:
    'linear-gradient(100deg, #7A5518 0%, #996E27 15%, #FFF6DC 25%, #FFFFFF 27%, #FFF6DC 29%, #996E27 40%, #7A5518 50%, #996E27 65%, #FFF6DC 75%, #FFFFFF 77%, #FFF6DC 79%, #996E27 90%, #7A5518 100%) 0% 0% / 200% 100%',
  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
  mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
} as const

// Dùng chung cho nền vàng, ảnh và logo để các chuyển động chạy cùng nhịp
const SWEEP_TRANSITION = { duration: 0.5, ease: [0.22, 1, 0.36, 1] } as const

const IMAGE_TRANSITION = { duration: 0.8, ease: [0.65, 0, 0.35, 1] } as const

// Nội dung cũ mờ đi nhanh, nội dung mới hiện lần lượt từng dòng
const CONTENT_VARIANTS = {
  shown: {
    visibility: 'visible',
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
  hidden: {
    transitionEnd: { visibility: 'hidden' },
    transition: { duration: 0.25 },
  },
} as const

const ITEM_VARIANTS = {
  shown: { opacity: 1, y: 0, filter: 'blur(0px)', transition: SWEEP_TRANSITION },
  hidden: { opacity: 0, y: -8, filter: 'blur(4px)', transition: { duration: 0.2 } },
} as const

const LINE_VARIANTS = {
  shown: { scaleX: 1, transition: SWEEP_TRANSITION },
  hidden: { scaleX: 0, transition: { duration: 0.2 } },
} as const

const CENTER = Math.floor(INVESTMENTS.length / 2)

const Investment = () => {
  // active: item đang hiển thị ở card trái (giữ lại item hover cuối cùng)
  // hovered: item đang được hover bên phải, di chuột ra thì bỏ highlight
  // prev: item hiển thị trước đó, giữ nằm ngay dưới để ảnh mới quét đè lên
  const [{ active, prev }, setView] = useState({ active: CENTER, prev: CENTER })
  const [hovered, setHovered] = useState<number | null>(null)
  const select = (index: number) => {
    setView((view) => (view.active === index ? view : { active: index, prev: view.active }))
    setHovered(index)
  }

  return (
    <section className='bg-white px-[3.125rem] py-[4.5rem] xsm:px-[1.5rem] xsm:py-[2.5rem]'>
      <div className='mx-auto max-w-[95rem]'>
        <div
          data-aos='fade-up'
          className='flex items-start justify-between gap-[1rem]'
        >
          <div>
            <h2 className='text-[2.75rem] leading-[1.2] font-light tracking-[0.06em] text-[#333] uppercase xsm:text-[1.5rem]'>
              Hệ sinh thái đầu tư
            </h2>
            <span className='mt-[1.25rem] block h-[0.125rem] w-[4.25rem] bg-[#C6A15B] xsm:mt-[0.75rem]' />
          </div>
          <Link
            href={ROUTES.business}
            className='mt-[1rem] flex shrink-0 items-center gap-[0.5rem] text-[0.8125rem] font-semibold tracking-[0.04rem] text-[#b88e4f] uppercase transition-opacity hover:opacity-80 xsm:mt-[0.35rem] xsm:text-[0.7rem]'
          >
            Xem tất cả
            <Image
              src='/home/news/arrow.svg'
              alt='arrow'
              width={16}
              height={16}
              className='size-[1.25rem]'
            />
          </Link>
        </div>

        <div className='mt-[2.5rem] flex items-stretch gap-[3.75rem] xsm:mt-[1.75rem] xsm:flex-col-reverse xsm:items-stretch xsm:gap-[1.5rem]'>
          {/* Card nội dung */}
          <div
            data-aos='fade-right'
            data-aos-delay='100'
            className='flex w-[46%] shrink-0 overflow-hidden rounded-[0.75rem] bg-white shadow-[0_1.5rem_3.5rem_rgba(11,26,51,0.10)] ring-1 ring-black/[0.04] xsm:w-full xsm:flex-col'
          >
            {/* Ảnh mới quét từ trái sang đè lên ảnh cũ, cùng chiều với nền vàng của thanh bên phải */}
            <div className='relative w-[42%] shrink-0 overflow-hidden bg-[#0B1A33] xsm:h-[13rem] xsm:w-full'>
              {INVESTMENTS.map((item, index) => {
                const isShown = active === index

                return (
                  <motion.div
                    key={item.label}
                    className='absolute inset-0 overflow-hidden'
                    style={{ zIndex: isShown ? 2 : index === prev ? 1 : 0 }}
                    initial={false}
                    animate={{
                      clipPath: isShown
                        ? ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)']
                        : 'inset(0% 0% 0% 0%)',
                    }}
                    transition={IMAGE_TRANSITION}
                  >
                    <motion.div
                      className='absolute inset-0'
                      initial={false}
                      animate={{ scale: isShown ? [1.15, 1] : 1 }}
                      transition={{ ...IMAGE_TRANSITION, duration: 1.2 }}
                    >
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        sizes='100vw'
                        className='object-cover'
                      />
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>

            {/* Render nội dung của tất cả item chồng lên nhau trong cùng 1 ô grid → card luôn cao bằng item dài nhất, không bị nhảy khi đổi */}
            <div className='grid min-w-0 flex-1 px-[2.25rem] py-[2rem] xsm:px-[1.25rem] xsm:py-[1.5rem]'>
              {INVESTMENTS.map((item, index) => {
                const isShown = active === index

                return (
                  <motion.div
                    key={item.label}
                    aria-hidden={!isShown}
                    className='col-start-1 row-start-1 flex flex-col justify-center'
                    initial={false}
                    animate={isShown ? 'shown' : 'hidden'}
                    variants={CONTENT_VARIANTS}
                  >
                    <motion.p
                      variants={ITEM_VARIANTS}
                      className='text-[0.75rem] font-semibold tracking-[0.2em] text-[#B88E4F]'
                    >
                      {String(index + 1).padStart(2, '0')}
                      <span className='text-[#C6A15B]/50'>
                        {' '}
                        / {String(INVESTMENTS.length).padStart(2, '0')}
                      </span>
                    </motion.p>
                    <h3 className='mt-[0.75rem] text-[1.75rem] leading-[1.25] font-normal tracking-[0.04em] text-[#222] uppercase xsm:text-[1.35rem]'>
                      <motion.span
                        variants={ITEM_VARIANTS}
                        className='block'
                      >
                        {item.title[0]}
                      </motion.span>
                      <motion.span
                        variants={ITEM_VARIANTS}
                        className='block'
                      >
                        {item.title[1]}
                      </motion.span>
                    </h3>
                    <motion.span
                      variants={LINE_VARIANTS}
                      style={{ originX: 0 }}
                      className='mt-[1.25rem] h-[0.125rem] w-[2.5rem] bg-[#C6A15B]'
                    />
                    <motion.p
                      variants={ITEM_VARIANTS}
                      className='mt-[1.25rem] text-[0.875rem] leading-[1.7] text-[#737373]'
                    >
                      {item.description}
                    </motion.p>
                    <motion.div
                      variants={ITEM_VARIANTS}
                      className='mt-[1.75rem]'
                    >
                      <Link
                        href={item.href}
                        tabIndex={isShown ? undefined : -1}
                        className='group flex w-fit items-center gap-[0.5rem] text-[0.8125rem] font-semibold tracking-[0.04rem] text-[#b88e4f] uppercase'
                      >
                        Xem chi tiết
                        <Image
                          src='/home/news/arrow.svg'
                          alt=''
                          width={16}
                          height={16}
                          className='size-[1.25rem] transition-transform duration-300 group-hover:translate-x-[0.25rem]'
                        />
                      </Link>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Danh sách lĩnh vực */}
          <ul
            data-aos='fade-left'
            data-aos-delay='200'
            onMouseLeave={() => setHovered(null)}
            className='flex min-w-0 flex-1 flex-col items-center justify-center gap-[0.75rem] xsm:gap-[0.5rem]'
          >
            {INVESTMENTS.map((item, index) => {
              const isActive = hovered === index
              const distance = Math.abs(index - CENTER)
              const offset = FAN_OFFSET[Math.min(distance, FAN_OFFSET.length - 1)]

              return (
                <li
                  key={item.label}
                  className='w-full max-w-[34rem] transition-transform duration-500 ease-out translate-x-(--fan-offset) xsm:max-w-none xsm:translate-x-0'
                  style={{ '--fan-offset': `${offset}rem` } as React.CSSProperties}
                >
                  <button
                    type='button'
                    aria-pressed={isActive}
                    onMouseEnter={() => select(index)}
                    onFocus={() => select(index)}
                    onBlur={() => setHovered(null)}
                    onClick={() => select(index)}
                    className={`relative flex h-[4rem] w-full -skew-x-[16deg] items-center overflow-hidden rounded-[0.3125rem] border text-left transition-all duration-500 ease-out ${isActive ? 'border-[#E5BE7D] shadow-[0_0_0_1px_rgba(197,154,82,0.40),0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)]' : 'border-[rgba(39,43,48,0.50)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)] hover:brightness-110'}`}
                  >
                    <span
                      aria-hidden
                      className='absolute inset-0'
                      style={{ background: IDLE_BG }}
                    />
                    <motion.span
                      aria-hidden
                      className='absolute inset-0'
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={SWEEP_TRANSITION}
                      style={{ background: ACTIVE_BG, originX: isActive ? 0 : 1 }}
                    />

                    {/* Khung thumbnail bị xiên theo thanh, nội dung bên trong skew ngược lại và nới rộng để phủ kín góc xiên */}
                    <span className='relative h-full w-[7rem] shrink-0 overflow-hidden border-r border-[#8a6a2f]/30 xsm:w-[4.5rem]'>
                      {/* Ảnh bị "quét" mất từ trái sang cùng nhịp với nền vàng, rời hover thì hiện lại từ trái sang */}
                      <motion.span
                        className='absolute inset-0'
                        initial={false}
                        animate={{
                          clipPath: isActive
                            ? 'inset(0% 0% 0% 100%)'
                            : ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'],
                        }}
                        transition={SWEEP_TRANSITION}
                      >
                        <span className='absolute inset-y-0 -inset-x-[0.6rem] skew-x-[16deg]'>
                          <Image
                            src={item.image}
                            alt=''
                            fill
                            sizes='10vw'
                            className='object-cover'
                          />
                        </span>
                      </motion.span>

                      <span className='absolute inset-y-0 -inset-x-[0.6rem] flex skew-x-[16deg] items-center justify-center'>
                        <motion.span
                          className='flex'
                          initial={false}
                          animate={
                            isActive
                              ? { opacity: 1, x: 0, filter: 'blur(0px)' }
                              : { opacity: 0, x: -12, filter: 'blur(4px)' }
                          }
                          transition={{ ...SWEEP_TRANSITION, delay: isActive ? 0.2 : 0 }}
                        >
                          <Image
                            src='/home/investment/logo.svg'
                            alt='Bateco Group'
                            width={62}
                            height={15}
                            className='h-[0.9375rem] w-auto object-contain'
                          />
                        </motion.span>
                      </span>
                    </span>

                    <span
                      className={`relative skew-x-[16deg] truncate px-[1.25rem] text-[0.875rem] font-semibold transition-colors duration-500 ${isActive ? 'text-[#1f1a10]' : 'text-white'}`}
                    >
                      {item.label}
                    </span>

                    {/* Viền vàng shimmer: gradient chạy liên tục, mask chỉ chừa lại phần viền */}
                    <motion.span
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                      style={SHIMMER_BORDER}
                      animate={isActive ? { backgroundPosition: ['200% 0%', '0% 0%'] } : undefined}
                      transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Investment
