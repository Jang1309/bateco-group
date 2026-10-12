import { ECOSYSTEM_STATS } from '@/views/business-detail/data'

type StatProps = {
  stat: (typeof ECOSYSTEM_STATS)[number]
  index: number
}

const Stat = ({ stat, index }: StatProps) => {
  return (
    <div
      data-aos='business-rise'
      data-aos-duration='800'
      data-aos-delay={index * 120}
      className='flex flex-col-reverse items-center border-r border-[#EADFC8] last:border-r-0'
    >
      <dt className='mt-[0.5rem] text-[0.75rem] font-bold tracking-[0.18em] text-[#64748B] uppercase'>
        {stat.label}
      </dt>
      <dd className='text-[3.5rem] leading-none font-bold text-[#1A2B48] xsm:text-[2.5rem]'>
        {stat.value}
        {'suffix' in stat ? <span className='text-[#C39A5A]'>{stat.suffix}</span> : null}
      </dd>
    </div>
  )
}

export default Stat
