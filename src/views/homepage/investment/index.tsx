'use client'

import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { pathFor } from '@/configs/routes'
import { Link, toAppHref } from '@/i18n/navigation'
import type { SectorItem } from '@/interfaces/sectors.interface'
import DetailPanel from '@/views/homepage/investment/components/detail-panel'
import SectorList from '@/views/homepage/investment/components/sector-list'
import { HOVER_DELAY_MS } from '@/views/homepage/investment/constants'
import { mapSectors } from '@/views/homepage/investment/data'

const Investment = ({ sectors }: { sectors?: SectorItem[] }) => {
  const locale = useLocale()
  const t = useTranslations('HomeInvestment')
  const items = mapSectors(sectors, locale)
  const center = items.length ? Math.floor(items.length / 2) : 0

  const [{ active, prev }, setView] = useState({ active: center, prev: center })
  const [hovered, setHovered] = useState<number | null>(null)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearHoverTimer = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current)
      hoverTimer.current = null
    }
  }

  const select = (index: number) => {
    clearHoverTimer()
    setView((view) => (view.active === index ? view : { active: index, prev: view.active }))
    setHovered(index)
  }

  const preview = (index: number) => {
    clearHoverTimer()
    hoverTimer.current = setTimeout(() => select(index), HOVER_DELAY_MS)
  }

  useEffect(() => clearHoverTimer, [])

  if (!items.length) return null

  return (
    <section className='bg-white px-[3.125rem] py-[4.5rem] xsm:px-[1.5rem] xsm:py-[2.5rem]'>
      <div className='mx-auto max-w-[95rem]'>
        <div
          data-aos='fade-up'
          className='flex items-start justify-between gap-[1rem]'
        >
          <div>
            <h2 className='text-[2.75rem] leading-[1.2] font-light tracking-[0.06em] text-[#333] uppercase xsm:text-[1.5rem]'>
              {t('title')}
            </h2>
            <span className='mt-[1.25rem] block h-[0.125rem] w-[4.25rem] bg-[#C6A15B] xsm:mt-[0.75rem]' />
          </div>
          <Link
            href={toAppHref(pathFor('business', locale))}
            className='mt-[1rem] flex shrink-0 items-center gap-[0.5rem] text-[0.8125rem] font-semibold tracking-[0.04rem] text-[#b88e4f] uppercase transition-opacity hover:opacity-80 xsm:mt-[0.35rem] xsm:text-[0.7rem]'
          >
            {t('viewAll')}
            <Image
              src='/home/news/arrow.svg'
              alt=''
              width={16}
              height={16}
              className='size-[1.25rem]'
            />
          </Link>
        </div>

        <div className='mt-[2.5rem] flex items-stretch gap-[3.75rem] xsm:mt-[1.75rem] xsm:flex-col-reverse xsm:items-stretch xsm:gap-[1.5rem]'>
          <DetailPanel
            items={items}
            active={active}
            prev={prev}
          />
          <SectorList
            items={items}
            center={center}
            hovered={hovered}
            onPreview={preview}
            onSelect={select}
            onLeave={() => {
              clearHoverTimer()
              setHovered(null)
            }}
            onBlur={() => setHovered(null)}
          />
        </div>
      </div>
    </section>
  )
}

export default Investment
