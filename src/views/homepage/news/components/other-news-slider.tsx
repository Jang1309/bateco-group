'use client'

import Image from 'next/image'
import type { ComponentProps } from 'react'

import { InfiniteSlider } from '@/components/shared/infinite-slider'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export type OtherNewsSlide = {
  image: string
  date: string
  title: string
  href: ComponentProps<typeof Link>['href']
  bold?: boolean
}

const NewsCard = ({ item }: { item: OtherNewsSlide }) => (
  <Link
    href={item.href}
    className='group flex w-[22rem] shrink-0 flex-col xsm:w-[16rem]'
  >
    <div className='overflow-hidden rounded-[0.125rem] bg-[#f1f5f9] shadow-[0_0.078rem_0.156rem_rgba(0,0,0,0.05)]'>
      <Image
        src={item.image}
        alt={item.title}
        width={512}
        height={279}
        unoptimized
        className='h-[13rem] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] xsm:h-[10rem]'
      />
    </div>
    {item.date ? (
      <time className='mt-[0.875rem] text-[0.8125rem] leading-[1.25rem] font-medium text-[#b88e4f]'>
        {item.date}
      </time>
    ) : null}
    {item.title ? (
      <h3
        className={cn(
          'mt-[0.25rem] line-clamp-3 text-[0.9375rem] leading-[1.375rem] text-[#111827] transition-colors duration-300 group-hover:text-[#b68d4c]',
          item.bold ? 'font-bold' : 'font-normal',
        )}
      >
        {item.title}
      </h3>
    ) : null}
  </Link>
)

export default function OtherNewsSlider({ items }: { items: OtherNewsSlide[] }) {
  if (!items.length) return null

  return (
    <>
      {/* Desktop: auto marquee */}
      <div className='mt-[2rem] xsm:hidden'>
        <InfiniteSlider
          gap={24}
          speed={100}
          speedOnHover={40}
        >
          {items.map((item, index) => (
            <NewsCard
              key={index}
              item={item}
            />
          ))}
        </InfiniteSlider>
      </div>

      {/* Mobile: swipe ngang, ẩn scrollbar */}
      <div className='hidden_scroll mt-[1.5rem] -mx-[1.5rem] hidden overflow-x-auto px-[1.5rem] [scrollbar-width:none] xsm:block'>
        <div className='flex w-max gap-[1rem] snap-x snap-mandatory'>
          {items.map((item, index) => (
            <div
              key={index}
              className='snap-start'
            >
              <NewsCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
