'use client'

import Image from 'next/image'

import { InfiniteSlider } from '@/components/shared/infinite-slider'
import { cn } from '@/lib/utils'

import { ECOSYSTEM, type Partner, PARTNERS } from './data'

const CELL =
  'flex shrink-0 items-center justify-center border-r border-[#EEEEEE] bg-white transition-colors duration-300 hover:bg-[#FBF7EF]'

const Partners = () => {
  return (
    <section className='bg-white px-[3.125rem] py-[5rem] xsm:px-[1.5rem] xsm:py-[3rem]'>
      <div className='mx-auto max-w-[95rem]'>
        <div className='flex items-start justify-between gap-[3rem] xsm:flex-col xsm:gap-[1.25rem]'>
          <h2
            data-aos='fade-up'
            className='text-[2.75rem] leading-[1.2] font-light tracking-[0.02em] text-[#1A1A1A] uppercase xsm:text-[1.6rem]'
          >
            Hệ sinh thái và
            <br />
            đối tác của chúng tôi.
          </h2>
          <p
            data-aos='fade-left'
            data-aos-delay='150'
            className='mt-[0.5rem] max-w-[26rem] border-l border-[#C6A15B] pl-[1.25rem] text-[0.9375rem] leading-[1.65] text-[#555] xsm:mt-0'
          >
            Bateco Group phát triển bằng sức mạnh cộng hưởng giữa hệ sinh thái đa ngành và mạng lưới
            đối tác uy tín trong nước, quốc tế.
          </p>
        </div>

        <Row title='Hệ sinh thái Bateco'>
          {ECOSYSTEM.map((item) => (
            <LogoCell
              key={item.name}
              item={item}
              className='h-[7.5rem] w-[17rem] px-[3rem] xsm:h-[6rem] xsm:w-[12rem] xsm:px-[1.75rem]'
              imageClassName={
                item.tall ? 'max-h-[5rem] xsm:max-h-[3.75rem]' : 'max-h-[3rem] xsm:max-h-[2.25rem]'
              }
            />
          ))}
        </Row>

        <Row
          title='Đối tác chiến lược'
          reverse
        >
          {PARTNERS.map((partner) => (
            <LogoCell
              key={partner.name}
              item={partner}
              className='h-[7.5rem] w-[17rem] px-[3rem] xsm:h-[6rem] xsm:w-[12rem] xsm:px-[1.75rem]'
              imageClassName={
                partner.tall
                  ? 'max-h-[5rem] xsm:max-h-[3.75rem]'
                  : 'max-h-[3rem] xsm:max-h-[2.25rem]'
              }
            />
          ))}
        </Row>
      </div>
    </section>
  )
}

type RowProps = { title: string; reverse?: boolean; children: React.ReactNode }

const Row = ({ title, reverse, children }: RowProps) => (
  <div
    data-aos='fade-up'
    className='mt-[3.5rem] xsm:mt-[2.5rem]'
  >
    <h3 className='text-[0.75rem] font-bold tracking-[0.2em] text-[#1A1A1A] uppercase'>{title}</h3>
    {/* Mờ dần ở 2 mép để logo trượt vào/ra mềm hơn */}
    <div className='mt-[1.25rem] border-y border-[#EEEEEE] [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]'>
      <InfiniteSlider
        gap={0}
        speed={90}
        speedOnHover={40}
        reverse={reverse}
      >
        {children}
      </InfiniteSlider>
    </div>
  </div>
)

type LogoCellProps = { item: Partner; className: string; imageClassName: string }

const LogoCell = ({ item, className, imageClassName }: LogoCellProps) => (
  <div className={cn(CELL, 'group', className)}>
    <Image
      src={item.logo}
      alt={item.name}
      width={240}
      height={120}
      className={cn(
        'h-auto w-auto max-w-full object-contain mix-blend-multiply grayscale-[30%] transition-[filter,scale] duration-300 group-hover:scale-[1.05] group-hover:grayscale-0',
        imageClassName,
      )}
    />
  </div>
)

export default Partners
