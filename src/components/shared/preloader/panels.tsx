'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { CSSProperties } from 'react'

import { PRELOADER_DIVIDERS, PRELOADER_PANELS } from './data'

export const OFF_X = 'translate3d(-110%,0,0)'

/**
 * 5 panel chéo — dùng chung cho preloader và page transition.
 * withContent: thêm tiêu đề + seam vàng (chỉ preloader; page transition để panel trơn).
 * Animate qua [data-preloader-panel] / [data-preloader-divider] / [data-preloader-content].
 */
export function PreloaderPanels({ withContent = false }: { withContent?: boolean }) {
  const t = useTranslations('Preloader')

  return (
    <>
      {PRELOADER_PANELS.map((panel) => (
        <div
          key={panel.id}
          data-preloader-panel
          className='absolute inset-0 [clip-path:var(--clip)] will-change-transform xsm:[clip-path:var(--clip-m)]'
          style={
            {
              '--clip': panel.clipPath,
              '--clip-m': panel.mobile.clipPath,
              transform: OFF_X,
            } as CSSProperties
          }
        >
          {/* Ảnh chỉ phủ bbox của panel — full màn hình thì panel giữa chỉ lộ vùng trắng giữa ảnh */}
          <div
            className='absolute inset-y-0 left-(--bx) w-(--bw) overflow-hidden xsm:inset-x-0 xsm:top-(--by) xsm:bottom-auto xsm:h-(--bh) xsm:w-full'
            style={
              {
                '--bx': panel.box.left,
                '--bw': panel.box.width,
                '--by': panel.mobile.box.top,
                '--bh': panel.mobile.box.height,
              } as CSSProperties
            }
          >
            <Image
              src={panel.image}
              alt=''
              fill
              {...(withContent ? { priority: true } : { loading: 'eager' as const })}
              // object-cover theo chiều cao: ảnh render rộng ~178vh (1670/942) trên màn hẹp hơn 16:9
              sizes='(max-width: 639px) 100vw, (max-aspect-ratio: 16/9) 178vh, 100vw'
              // Mobile: dải ngang full width — chủ thể ở 2 mép, chữ nằm vùng trắng giữa
              className='object-cover object-(--focus) xsm:object-[50%_60%]'
              style={{ '--focus': panel.focus } as CSSProperties}
            />
            <div
              aria-hidden
              className='absolute inset-0'
              style={{
                backgroundImage:
                  'linear-gradient(180deg, rgba(234,244,251,0.55) 0%, rgba(234,244,251,0.35) 45%, rgba(8,27,51,0) 65%, rgba(8,27,51,0.45) 100%)',
              }}
            />
          </div>

          {withContent && (
            <div
              className='absolute top-1/2 left-(--cx) w-[min(18.75rem,22vw)] -translate-x-1/2 -translate-y-1/2 tablet:w-[25vw] xsm:top-(--cy) xsm:left-1/2 xsm:w-max'
              style={{ '--cx': panel.contentX, '--cy': panel.mobile.contentY } as CSSProperties}
            >
              <div
                data-preloader-content
                className='flex w-full flex-col items-center xsm:flex-row xsm:gap-3'
                style={{ opacity: 0 }}
              >
                <div className='relative mb-3 size-20 shrink-0 tablet:size-24 xsm:mb-0 xsm:size-11'>
                  {/* eslint-disable-next-line @next/next/no-img-element -- local SVG icon */}
                  <img
                    src={panel.icon}
                    alt=''
                    width={80}
                    height={80}
                    className='size-full object-contain'
                  />
                </div>
                <div className='flex flex-col items-center xsm:items-start'>
                  <h2 className='text-center text-[1.625rem] leading-[1.2] font-black tracking-[0.02em] text-[#0c2b54] uppercase drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)] tablet:text-[1.875rem] xsm:text-left xsm:text-base xsm:leading-5'>
                    {(t.raw(`titles.${panel.id}`) as string[]).map((line) => (
                      <span
                        key={line}
                        className='block'
                      >
                        {line}
                      </span>
                    ))}
                  </h2>
                  <span
                    data-preloader-line
                    aria-hidden
                    className='mt-3 h-[0.1875rem] w-12 origin-center rounded-full bg-[#d4af37] xsm:mt-1.5 xsm:w-8 xsm:origin-left'
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {withContent &&
        PRELOADER_DIVIDERS.map((divider) => (
          <div
            key={divider.id}
            data-preloader-divider
            aria-hidden
            className='pointer-events-none absolute inset-0 will-change-transform'
            style={{ transform: OFF_X }}
          >
            {/* SVG line anti-alias sạch hơn clip-path polygon mỏng */}
            <svg
              className='absolute inset-0 size-full overflow-visible'
              preserveAspectRatio='none'
            >
              <defs>
                <linearGradient
                  id={`${divider.id}-stroke`}
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='1'
                >
                  <stop
                    offset='0%'
                    stopColor='#fff'
                    stopOpacity='0'
                  />
                  <stop
                    offset='22%'
                    stopColor='#fff8d6'
                  />
                  <stop
                    offset='50%'
                    stopColor='#ffe27a'
                  />
                  <stop
                    offset='78%'
                    stopColor='#d4af37'
                  />
                  <stop
                    offset='100%'
                    stopColor='#d4af37'
                    stopOpacity='0'
                  />
                </linearGradient>
                <linearGradient
                  id={`${divider.id}-stroke-m`}
                  x1='0'
                  y1='0'
                  x2='1'
                  y2='0'
                >
                  <stop
                    offset='0%'
                    stopColor='#d4af37'
                  />
                  <stop
                    offset='50%'
                    stopColor='#ffe27a'
                  />
                  <stop
                    offset='100%'
                    stopColor='#d4af37'
                  />
                </linearGradient>
              </defs>
              <line
                className='xsm:hidden'
                x1={divider.x1}
                y1='0'
                x2={divider.x2}
                y2='100%'
                stroke={`url(#${divider.id}-stroke)`}
                strokeWidth='2'
                strokeLinecap='round'
                vectorEffect='non-scaling-stroke'
              />
              {/* Mobile: seam ngang chéo giữa các dải */}
              <line
                className='hidden xsm:inline'
                x1='0'
                y1={divider.y1}
                x2='100%'
                y2={divider.y2}
                stroke={`url(#${divider.id}-stroke-m)`}
                strokeWidth='2'
                vectorEffect='non-scaling-stroke'
              />
            </svg>
          </div>
        ))}
    </>
  )
}
