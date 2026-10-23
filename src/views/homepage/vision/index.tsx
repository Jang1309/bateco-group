'use client'

import type { HomepageVision } from '@/interfaces/homepage.interface'
import VisionSlider from '@/views/homepage/vision/components/vision-slider'
import VisionStats from '@/views/homepage/vision/components/vision-stats'

const Vision = ({ data }: { data?: HomepageVision }) => {
  const slides = data?.slides?.filter((slide) => slide.image) || []
  const stats = data?.stats || []
  const featuredStat = Math.min(2, Math.max(0, stats.length - 1))
  const titleLines = (data?.title || '').split(/\n|\\n/).filter(Boolean)

  return (
    <section className='px-[3.125rem] py-[4.5rem] xsm:px-[1.5rem] xsm:py-[2.5rem]'>
      <div className='mx-auto flex max-w-[95rem] items-center gap-[3.75rem] xsm:flex-col xsm:items-stretch xsm:gap-[2rem]'>
        {slides.length ? <VisionSlider slides={slides} /> : null}

        <div className='min-w-0 flex-1'>
          {titleLines.length ? (
            <h2
              data-aos='fade-up'
              data-aos-delay='150'
              className='text-center text-[2.15rem] leading-[1.25] font-bold tracking-[0.04em] uppercase xsm:text-[1.55rem]'
              style={{
                background: 'linear-gradient(93deg, #DFBA73 0%, #BA8A38 55%, #996E27 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {titleLines.map((line, index) => (
                <span
                  key={index}
                  className='block'
                >
                  {line}
                </span>
              ))}
            </h2>
          ) : null}

          {stats.length ? (
            <VisionStats
              stats={stats}
              featuredStat={featuredStat}
            />
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default Vision
