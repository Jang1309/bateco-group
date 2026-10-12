import Image from 'next/image'

import { Link } from '@/i18n/navigation'
import Logo from '@/layouts/header/components/logo'
import { cn } from '@/lib/utils'

import { type Sector, SECTORS } from './data'

const BusinessSectors = () => {
  return (
    <section className='relative pb-[6rem] xsm:pb-[3.5rem] pt-[1.875rem] bg-[#FAFBFC]'>
      {/* Logo giữa 2 vạch vàng, ngăn phần giới thiệu với danh sách lĩnh vực */}
      <div
        data-aos='business-rise'
        data-aos-duration='800'
        className='mx-auto flex max-w-[95rem] items-center gap-[1.25rem] px-[3.75rem] xsm:px-[1.5rem]'
      >
        <span className='h-[0.0875rem] flex-1 bg-[linear-gradient(90deg,transparent,#C8A462)]' />
        <Logo imageClassName='h-[2.5rem] xsm:h-[2.25rem]' />
        <span className='h-[0.0875rem] flex-1 bg-[linear-gradient(90deg,#C8A462,transparent)]' />
      </div>

      <ol className='mx-auto mt-[4rem] max-w-[95rem] px-[3.75rem] xsm:mt-[2.5rem] xsm:px-[1.5rem]'>
        {SECTORS.map((sector, index) => (
          <SectorRow
            key={sector.id}
            sector={sector}
            index={index}
          />
        ))}
      </ol>
    </section>
  )
}

// Mỗi lĩnh vực là 1 hàng 2 cột bằng nhau (ảnh | chữ), đổi bên xen kẽ, các hàng nằm sát nhau
const SectorRow = ({ sector, index }: { sector: Sector; index: number }) => {
  const reversed = index % 2 === 1

  return (
    <li
      id={sector.id}
      data-aos='business-rise'
      data-aos-duration='800'
      className='grid scroll-mt-[7rem] grid-cols-2 bg-white xsm:grid-cols-1'
    >
      <div
        className={cn(
          'group relative min-h-[28rem] overflow-hidden xsm:min-h-0 xsm:aspect-[4/3]',
          reversed && 'order-2 xsm:order-none',
        )}
      >
        <Image
          src={sector.image}
          alt={sector.title}
          fill
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
          {sector.title}
        </h2>
        <p className='mt-[1.25rem] text-justify font-medium max-w-[34rem] text-[1rem] leading-[1.75] text-[#1F2A37] xsm:text-[0.9375rem]'>
          {sector.description}
        </p>
        <Link
          href={{ pathname: '/linh-vuc-kinh-doanh/[slug]', params: { slug: sector.id } }}
          className='mt-[2rem] inline-flex w-fit items-center rounded-full bg-[#C39A5A] px-[1.5rem] py-[0.7rem] text-[0.75rem] font-bold tracking-[0.06em] text-white uppercase transition-[background-color,box-shadow] duration-300 hover:bg-[#B08447] hover:shadow-[0_0.5rem_1.25rem_rgba(184,142,79,0.35)]'
        >
          Xem thêm
        </Link>
      </div>
    </li>
  )
}

export default BusinessSectors
