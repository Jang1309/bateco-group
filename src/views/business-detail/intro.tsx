import type { SectorDetail } from './data'
import SectionHeading from './section-heading'

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

          <ul className='grid grid-cols-3 border-l border-[#EADFC8] xsm:grid-cols-1 xsm:border-l-0 xsm:border-t'>
            {intro.features.map((feature, index) => (
              <li
                key={feature.title}
                data-aos='business-rise'
                data-aos-duration='800'
                data-aos-delay={index * 120}
                className='group border-r border-[#EADFC8] px-[2rem] last:border-r-0 xsm:border-r-0 xsm:border-b xsm:px-0 xsm:py-[1.5rem]'
              >
                <feature.icon
                  strokeWidth={1.5}
                  className='size-[2.25rem] text-[#B88E4F] transition-transform duration-300 group-hover:-translate-y-[0.25rem]'
                />
                <h3 className='mt-[1.25rem] text-[1.0625rem] font-bold text-[#1A2B48]'>
                  {feature.title}
                </h3>
                <p className='mt-[0.625rem] text-[0.875rem] leading-[1.65] text-[#64748B]'>
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SectorIntro
