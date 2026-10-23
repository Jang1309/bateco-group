import Image from 'next/image'

import BannerTopOverlay from '@/components/shared/banner-top-overlay'
import CountUp from '@/components/shared/count-up'
import { HERO_STATS } from '@/views/governance/data'

const GovernanceHero = () => {
  return (
    <section className='relative overflow-hidden bg-white pt-[10rem] pb-[5.5rem] xsm:pt-[17rem] xsm:pb-[2.5rem]'>
      <div className='absolute inset-y-0 right-0 w-[68%] xsm:inset-x-0 xsm:bottom-auto xsm:h-[24rem] xsm:w-full'>
        {/* TODO: thay bằng ảnh hero riêng của trang văn bản quản trị */}
        <Image
          src='/home/vision/d-img-1.jpg'
          alt=''
          fill
          priority
          sizes='(max-width: 639px) 100vw, 68vw'
          className='object-cover object-center'
        />
        <div
          aria-hidden
          className='absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.85)_22%,rgba(255,255,255,0)_60%)] xsm:bg-[linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0)_35%,rgba(255,255,255,0.7)_75%,#fff_100%)]'
        />
      </div>
      <BannerTopOverlay />

      <span
        aria-hidden
        className='absolute right-[1.75rem] bottom-[5.5rem] text-[0.625rem] font-semibold tracking-[0.3em] text-[#B5935E] uppercase [writing-mode:vertical-rl] xsm:hidden'
      >
        Scroll to Bateco
      </span>

      <div className='relative z-[1] mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
        <div className='max-w-[34rem]'>
          <p
            className='business-hero-rise text-[0.875rem] font-bold tracking-[0.04em] text-[#1A2B48] uppercase xsm:text-[0.75rem]'
            style={{ animationDelay: '40ms' }}
          >
            Bateco Group
          </p>
          <h1
            className='business-hero-fade mt-[1rem] text-[3rem] leading-[1.25] font-bold tracking-[0.02em] uppercase xsm:mt-[0.75rem] xsm:text-[2rem]'
            style={{ animationDelay: '140ms' }}
          >
            <span className='block text-[#B5935E]'>Khám phá</span>
            <span className='block text-[#1A2B48]'>Để dẫn đầu</span>
          </h1>
          <p
            className='business-hero-rise mt-[1.25rem] max-w-[30rem] text-[1.0625rem] leading-[1.6] font-medium text-[#1A2B48] xsm:text-[0.9375rem]'
            style={{ animationDelay: '240ms' }}
          >
            Tập đoàn đầu tư đa ngành, phát triển bằng năng lực thực thi và giá trị bền vững.
          </p>

          <dl
            className='business-hero-rise mt-[2rem] grid max-w-[26rem] grid-cols-2 gap-x-[2.5rem] gap-y-[1.5rem] xsm:gap-x-[1.25rem]'
            style={{ animationDelay: '340ms' }}
          >
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className='flex flex-col-reverse border-l-[0.1875rem] border-[#1A2B48] pl-[1rem] xsm:pl-[0.75rem]'
              >
                <dt className='mt-[0.25rem] text-[0.875rem] font-medium text-[#475569] xsm:text-[0.8125rem]'>
                  {stat.label}
                </dt>
                <dd className='text-[2rem] leading-[1.1] font-bold text-[#1A2B48] xsm:text-[1.625rem]'>
                  <CountUp
                    value={stat.value}
                    delay={0.4}
                  />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export default GovernanceHero
