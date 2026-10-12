import type { SectorFeature } from '@/views/business-detail/data'

type FeatureProps = {
  feature: SectorFeature
  index: number
}

const Feature = ({ feature, index }: FeatureProps) => {
  return (
    <li
      data-aos='business-rise'
      data-aos-duration='800'
      data-aos-delay={index * 120}
      className='group border-r border-[#EADFC8] px-[2rem] last:border-r-0 xsm:border-r-0 xsm:border-b xsm:px-0 xsm:py-[1.5rem]'
    >
      <feature.icon
        strokeWidth={1.5}
        className='size-[2.25rem] text-[#B88E4F] transition-transform duration-300 group-hover:-translate-y-[0.25rem]'
      />
      <h3 className='mt-[1.25rem] text-[1.0625rem] font-bold text-[#1A2B48]'>{feature.title}</h3>
      <p className='mt-[0.625rem] text-[0.875rem] leading-[1.65] text-[#64748B]'>
        {feature.description}
      </p>
    </li>
  )
}

export default Feature
