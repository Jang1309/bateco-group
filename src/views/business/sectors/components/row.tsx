import Image from 'next/image'

import { Link } from '@/i18n/navigation'
import type { SectorItem } from '@/interfaces/sectors.interface'
import { cn } from '@/lib/utils'
import { SECTOR_FALLBACK_IMAGES } from '@/views/homepage/investment/data'

type SectorRowProps = {
  sector: SectorItem
  index: number
}

const SectorRow = ({ sector, index }: SectorRowProps) => {
  const reversed = index % 2 === 1
  const title = sector.name || ''
  const slug = sector.slug
  const image = sector.acf?.image || SECTOR_FALLBACK_IMAGES[index % SECTOR_FALLBACK_IMAGES.length]

  return (
    <li
      id={slug}
      data-aos='business-rise'
      data-aos-duration='800'
      className='grid scroll-mt-[7rem] grid-cols-2 bg-white xsm:grid-cols-1'
    >
      <div
        className={cn(
          'group relative min-h-[28rem] overflow-hidden xsm:aspect-[4/3] xsm:min-h-0',
          reversed && 'order-2 xsm:order-none',
        )}
      >
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          sizes='(max-width: 639px) 92vw, 46vw'
          className='object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]'
        />
      </div>

      <div className='flex flex-col justify-center px-[5rem] py-[3.5rem] xsm:px-[1.5rem] xsm:py-[2rem]'>
        <p className='text-[1.75rem] leading-none font-bold text-[#B88E4F] xsm:text-[1.375rem]'>
          {String(index + 1).padStart(2, '0')}
          <span className='ml-[0.6rem] font-normal'>/</span>
        </p>
        <h2 className='mt-[1rem] max-w-[32rem] text-[2rem] leading-[1.3] font-bold tracking-[0.01em] text-[#B88E4F] uppercase xsm:text-[1.375rem]'>
          {title}
        </h2>
        {sector.description ? (
          <p className='mt-[1.25rem] max-w-[34rem] text-justify text-[1rem] leading-[1.75] font-medium text-[#1F2A37] xsm:text-[0.9375rem]'>
            {sector.description}
          </p>
        ) : null}
        {slug ? (
          <Link
            href={{ pathname: '/linh-vuc-kinh-doanh/[slug]', params: { slug } }}
            className='mt-[2rem] inline-flex w-fit items-center rounded-full bg-[#C39A5A] px-[1.5rem] py-[0.7rem] text-[0.75rem] font-bold tracking-[0.06em] text-white uppercase transition-[background-color,box-shadow] duration-300 hover:bg-[#B08447] hover:shadow-[0_0.5rem_1.25rem_rgba(184,142,79,0.35)]'
          >
            Xem thêm
          </Link>
        ) : null}
      </div>
    </li>
  )
}

export default SectorRow
