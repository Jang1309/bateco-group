import Image from 'next/image'

import type { SectorIntroFeature } from '@/interfaces/sectors.interface'

type FeatureProps = {
  feature: SectorIntroFeature
  index: number
}

const Feature = ({ feature, index }: FeatureProps) => {
  return (
    <li
      data-aos='business-rise'
      data-aos-duration='800'
      data-aos-delay={index * 120}
      className='group border-r border-[#EADFC8] px-[2rem] last:border-r-0 xsm:flex xsm:gap-[1rem] xsm:border-r-0 xsm:border-b xsm:px-0 xsm:py-[1.25rem] xsm:last:border-b-0'
    >
      {feature.icon ? (
        <Image
          src={feature.icon}
          alt=''
          width={36}
          height={36}
          unoptimized
          className='size-[2.25rem] shrink-0 object-contain transition-transform duration-300 group-hover:-translate-y-[0.25rem] xsm:mt-[0.125rem] xsm:size-[1.75rem]'
        />
      ) : null}
      <div className='min-w-0'>
        {feature.title ? (
          <h3 className='mt-[1.25rem] text-[1.0625rem] font-bold text-[#1A2B48] xsm:mt-0 xsm:text-[0.9375rem]'>
            {feature.title}
          </h3>
        ) : null}
        {feature.desc ? (
          <p className='mt-[0.625rem] text-[0.875rem] leading-[1.65] text-[#64748B] xsm:mt-[0.375rem] xsm:text-[0.8125rem] xsm:leading-[1.55]'>
            {feature.desc}
          </p>
        ) : null}
      </div>
    </li>
  )
}

export default Feature
