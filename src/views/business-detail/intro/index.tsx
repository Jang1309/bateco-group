import type { SectorItem } from '@/interfaces/sectors.interface'
import SectionHeading from '@/views/business-detail/components/section-heading'

import Feature from './components/feature'

const SectorIntro = ({ sector }: { sector: SectorItem }) => {
  const intro = sector.acf?.intro
  if (!intro) return null

  const features = intro.features?.filter((feature) => feature.title || feature.desc) ?? []

  return (
    <section className='bg-white px-[3.75rem] py-[5.5rem] xsm:px-[1.25rem] xsm:py-[3rem]'>
      <div className='mx-auto grid max-w-[95rem] grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-[4rem] xsm:grid-cols-1 xsm:gap-[2rem]'>
        <div>
          <SectionHeading
            eyebrow={intro.subtitle || 'Định hướng phát triển'}
            title={intro.title || ''}
          />

          {intro.desc ? (
            <p
              data-aos='business-rise'
              data-aos-duration='800'
              className='mt-[2.5rem] text-justify text-[1rem] leading-[1.8] font-medium text-[#475569] xsm:mt-[1.25rem] xsm:text-left xsm:text-[0.875rem] xsm:leading-[1.65]'
            >
              {intro.desc}
            </p>
          ) : null}
        </div>

        {features.length > 0 ? (
          <ul className='grid grid-cols-3 border-l border-[#EADFC8] xsm:grid-cols-1 xsm:gap-0 xsm:border-t xsm:border-l-0'>
            {features.map((feature, index) => (
              <Feature
                key={feature.title || index}
                feature={feature}
                index={index}
              />
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}

export default SectorIntro
