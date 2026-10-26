'use client'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

import 'swiper/css'

const PREVIEW_COUNT = 5

const NAV_BTN =
  'absolute top-1/2 z-20 flex size-[2.75rem] -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-[0.35rem] transition-colors duration-300 hover:border-[#DFBA73] hover:bg-[#B5935E] xsm:size-[2.375rem]'

type ProjectGalleryProps = {
  title: string
  images: string[]
}

const ProjectGallery = ({ title, images }: ProjectGalleryProps) => {
  const [active, setActive] = useState<number | null>(null)
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [index, setIndex] = useState(0)

  const preview = images.slice(0, PREVIEW_COUNT)
  const extra = Math.max(0, images.length - PREVIEW_COUNT)
  const open = active !== null

  if (images.length === 0) return null

  return (
    <>
      <ul className='mt-[2.5rem] grid auto-rows-[15rem] grid-cols-4 gap-[1rem] xsm:mt-[1.5rem] xsm:auto-rows-[9rem] xsm:grid-cols-2 xsm:gap-[0.625rem]'>
        {preview.map((src, i) => {
          const isLastPreview = i === preview.length - 1 && extra > 0
          const openIndex = isLastPreview ? PREVIEW_COUNT : i

          return (
            <li
              key={`${src}-${i}`}
              data-aos='business-rise'
              data-aos-duration='800'
              data-aos-delay={i * 80}
              className={cn(
                'group relative overflow-hidden rounded-[0.75rem] bg-[#0F1C33]',
                i === 0 && 'col-span-2 row-span-2',
              )}
            >
              <button
                type='button'
                onClick={() => {
                  setIndex(openIndex)
                  setActive(openIndex)
                }}
                className='absolute inset-0 cursor-zoom-in'
                aria-label={
                  isLastPreview ? `Xem thêm ${extra} ảnh` : `Xem ảnh ${i + 1} của ${title}`
                }
              >
                <Image
                  src={src}
                  alt={`${title} - ảnh ${i + 1}`}
                  fill
                  unoptimized
                  sizes={
                    i === 0 ? '(max-width: 639px) 92vw, 46vw' : '(max-width: 639px) 46vw, 23vw'
                  }
                  className='object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] xsm:transition-none xsm:group-hover:scale-100'
                />
                {isLastPreview ? (
                  <span className='absolute inset-0 flex items-center justify-center bg-[#0F1C33]/62 text-[1.5rem] font-bold tracking-[0.04em] text-white xsm:text-[1.25rem]'>
                    +{extra}
                  </span>
                ) : null}
              </button>
            </li>
          )
        })}
      </ul>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (!next) setActive(null)
        }}
      >
        <DialogContent
          showCloseButton={false}
          overlayClassName='bg-[#0B1528]/65 supports-backdrop-filter:backdrop-blur-[0.35rem]'
          className='flex max-h-[90dvh] w-[min(58rem,calc(100%-2rem))] max-w-[min(58rem,calc(100%-2rem))] flex-col gap-0 overflow-hidden rounded-[1.125rem] border-0 bg-[#0F1C33] p-0 text-white shadow-[0_2rem_4rem_rgba(11,21,40,0.45)] ring-1 ring-white/10 sm:max-w-[min(58rem,calc(100%-2rem))]'
        >
          <DialogTitle className='sr-only'>
            {title} — ảnh {index + 1}/{images.length}
          </DialogTitle>

          {/* Chiều cao cố định — tránh Swiper/Dialog collapse về 0 */}
          <div className='relative h-[min(62vh,34rem)] w-full shrink-0 xsm:h-[min(48vh,22rem)]'>
            <div className='absolute inset-x-0 top-0 z-20 flex items-center justify-between px-[1rem] py-[1rem]'>
              <p className='rounded-full bg-black/50 px-[0.75rem] py-[0.3125rem] text-[0.75rem] font-semibold tracking-[0.04em] text-white backdrop-blur-sm'>
                {index + 1} / {images.length}
              </p>
              <DialogClose className='flex size-[2.375rem] items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition-colors hover:border-[#DFBA73] hover:bg-[#B5935E]'>
                <X className='size-[1.0625rem]' />
                <span className='sr-only'>Đóng</span>
              </DialogClose>
            </div>

            {images.length > 1 ? (
              <>
                <button
                  type='button'
                  onClick={() => swiper?.slidePrev()}
                  className={cn(NAV_BTN, 'left-[0.875rem]')}
                  aria-label='Ảnh trước'
                >
                  <ChevronLeft className='size-[1.25rem]' />
                </button>
                <button
                  type='button'
                  onClick={() => swiper?.slideNext()}
                  className={cn(NAV_BTN, 'right-[0.875rem]')}
                  aria-label='Ảnh sau'
                >
                  <ChevronRight className='size-[1.25rem]' />
                </button>
              </>
            ) : null}

            {open && active !== null ? (
              <Swiper
                key={`gallery-${active}`}
                modules={[Keyboard]}
                initialSlide={active}
                slidesPerView={1}
                speed={480}
                loop={images.length > 2}
                keyboard={{ enabled: true }}
                observer
                observeParents
                onSwiper={setSwiper}
                onSlideChange={(instance) => setIndex(instance.realIndex)}
                className='!absolute inset-0 h-full w-full'
              >
                {images.map((src, i) => (
                  <SwiperSlide
                    key={`${src}-${i}`}
                    className='!h-full'
                  >
                    <div className='relative h-full w-full'>
                      <Image
                        src={src}
                        alt={`${title} - ảnh ${i + 1}`}
                        fill
                        unoptimized
                        sizes='(max-width: 639px) 94vw, 58rem'
                        className='object-cover'
                        priority={i === active}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : null}
          </div>

          {images.length > 1 ? (
            <div className='flex shrink-0 gap-[0.625rem] overflow-x-auto border-t border-white/10 bg-[#0B1528] px-[1rem] py-[1rem]'>
              {images.map((src, i) => (
                <button
                  key={`thumb-${src}-${i}`}
                  type='button'
                  onClick={() => {
                    if (images.length > 2) swiper?.slideToLoop(i)
                    else swiper?.slideTo(i)
                  }}
                  className={cn(
                    'relative size-[4.5rem] shrink-0 cursor-pointer overflow-hidden rounded-[0.5rem] ring-2 transition-[ring-color,opacity] duration-300 xsm:size-[3.5rem]',
                    i === index
                      ? 'opacity-100 ring-[#DFBA73]'
                      : 'opacity-70 ring-transparent hover:opacity-100',
                  )}
                  aria-label={`Chuyển tới ảnh ${i + 1}`}
                  aria-current={i === index}
                >
                  <Image
                    src={src}
                    alt=''
                    fill
                    unoptimized
                    sizes='(max-width: 639px) 56px, 72px'
                    quality={90}
                    className='object-cover'
                  />
                </button>
              ))}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProjectGallery
