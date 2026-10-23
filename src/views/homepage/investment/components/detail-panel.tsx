'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

import { Link } from '@/i18n/navigation'
import {
  CONTENT_VARIANTS,
  IMAGE_TRANSITION,
  ITEM_VARIANTS,
  LINE_VARIANTS,
} from '@/views/homepage/investment/constants'
import type { InvestmentItem } from '@/views/homepage/investment/data'

type DetailPanelProps = {
  items: InvestmentItem[]
  active: number
  prev: number
}

const DetailPanel = ({ items, active, prev }: DetailPanelProps) => (
  <div
    data-aos='fade-right'
    data-aos-delay='100'
    className='flex w-[46%] shrink-0 overflow-hidden rounded-[0.75rem] bg-white shadow-[0_1.5rem_3.5rem_rgba(11,26,51,0.10)] ring-1 ring-black/[0.04] xsm:w-full xsm:flex-col'
  >
    <div className='relative w-[42%] shrink-0 overflow-hidden bg-[#0B1A33] xsm:h-[13rem] xsm:w-full'>
      {items.map((item, index) => {
        const isShown = active === index

        return (
          <motion.div
            key={index}
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
                unoptimized
                sizes='100vw'
                className='object-cover'
              />
            </motion.div>
          </motion.div>
        )
      })}
    </div>

    <div className='grid min-w-0 flex-1 px-[2.25rem] py-[2rem] xsm:px-[1.25rem] xsm:py-[1.5rem]'>
      {items.map((item, index) => {
        const isShown = active === index

        return (
          <motion.div
            key={index}
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
              <span className='text-[#C6A15B]/50'> / {String(items.length).padStart(2, '0')}</span>
            </motion.p>
            <h3 className='mt-[0.75rem] text-[1.75rem] leading-[1.25] font-normal tracking-[0.04em] text-[#222] uppercase xsm:text-[1.35rem]'>
              {item.title[0] ? (
                <motion.span
                  variants={ITEM_VARIANTS}
                  className='block'
                >
                  {item.title[0]}
                </motion.span>
              ) : null}
              {item.title[1] ? (
                <motion.span
                  variants={ITEM_VARIANTS}
                  className='block'
                >
                  {item.title[1]}
                </motion.span>
              ) : null}
            </h3>
            <motion.span
              variants={LINE_VARIANTS}
              style={{ originX: 0 }}
              className='mt-[1.25rem] h-[0.125rem] w-[2.5rem] bg-[#C6A15B]'
            />
            {item.description ? (
              <motion.p
                variants={ITEM_VARIANTS}
                className='mt-[1.25rem] text-[0.875rem] leading-[1.7] text-[#737373]'
              >
                {item.description}
              </motion.p>
            ) : null}
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
)

export default DetailPanel
