'use client'

import Image from 'next/image'

import { InfiniteSlider } from '@/components/shared/infinite-slider'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

import type { OtherNewsItem } from './data'

type Slide = OtherNewsItem & {
  title: string
}

export default function OtherNewsSlider({ items }: { items: Slide[] }) {
  return (
    <InfiniteSlider
      gap={24}
      speed={100}
      speedOnHover={40}
      className='mt-[2rem]'
    >
      {items.map((item) => (
        <Link
          key={item.titleKey}
          href={item.href}
          className='flex w-[22rem] shrink-0 flex-col xsm:w-[16rem]'
        >
          <div className='overflow-hidden rounded-[0.125rem] bg-[#f1f5f9] shadow-[0_0.078rem_0.156rem_rgba(0,0,0,0.05)]'>
            <Image
              src={item.image}
              alt={item.title}
              width={512}
              height={279}
              unoptimized
              className='h-[13rem] w-full object-cover xsm:h-[10rem]'
            />
          </div>
          <time className='mt-[0.875rem] text-[0.8125rem] font-medium leading-[1.25rem] text-[#b88e4f]'>
            {item.date}
          </time>
          <h3
            className={cn(
              'mt-[0.25rem] line-clamp-3 text-[0.9375rem] leading-[1.375rem] text-[#111827]',
              item.bold ? 'font-bold' : 'font-normal',
            )}
          >
            {item.title}
          </h3>
        </Link>
      ))}
    </InfiniteSlider>
  )
}
