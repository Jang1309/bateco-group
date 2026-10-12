import SectionHeading from '@/views/business-detail/components/section-heading'
import type { SectorDetail } from '@/views/business-detail/data'

import Feature from './components/feature'

const SectorIntro = ({ sector }: { sector: SectorDetail }) => {
  const { intro } = sector

  return (
    <section className='bg-white px-[3.75rem] py-[5.5rem] xsm:px-[1.5rem] xsm:py-[3.5rem]'>
      <div className='mx-auto max-w-[95rem]'>
        <SectionHeading
          eyebrow='Định hướng phát triển'
          title={intro.title}
        />

        <div className='mt-[2.5rem] grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-start gap-[4rem] xsm:mt-[1.5rem] xsm:grid-cols-1 xsm:gap-[2.5rem]'>
          <p
            data-aos='business-rise'
            data-aos-duration='800'
            className='text-justify text-[1rem] leading-[1.8] font-medium text-[#475569] xsm:text-[0.9375rem]'
          >
            {intro.description}
          </p>

          <ul className='grid grid-cols-3 border-l border-[#EADFC8] xsm:grid-cols-1 xsm:border-t xsm:border-l-0'>
            {intro.features.map((feature, index) => (
              <Feature
                key={feature.title}
                feature={feature}
                index={index}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SectorIntro
