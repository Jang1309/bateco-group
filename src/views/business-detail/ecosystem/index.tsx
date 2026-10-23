import { ECOSYSTEM_STATS, MEMBER_LOGOS } from '@/views/business-detail/data'

import Member from './components/member'
import Stat from './components/stat'

const SectorEcosystem = () => {
  return (
    <section className='bg-white px-[3.75rem] py-[5.5rem] xsm:px-[1.5rem] xsm:py-[3.5rem]'>
      <div className='mx-auto max-w-[75rem] text-center'>
        <h2
          data-aos='business-rise'
          data-aos-duration='800'
          className='text-[2.5rem] leading-[1.25] font-bold tracking-[0.02em] text-[#1A2B48] uppercase xsm:text-[1.5rem]'
        >
          Sức mạnh thực thi từ một hệ sinh thái vững chắc
        </h2>

        <dl className='mx-auto mt-[3rem] grid max-w-[44rem] grid-cols-2 xsm:mt-[2rem]'>
          {ECOSYSTEM_STATS.map((stat, index) => (
            <Stat
              key={stat.label}
              stat={stat}
              index={index}
            />
          ))}
        </dl>

        <ul className='mt-[3.5rem] grid grid-cols-4 gap-[1.25rem] xsm:mt-[2.5rem] xsm:grid-cols-2 xsm:gap-[0.75rem]'>
          {MEMBER_LOGOS.map((member, index) => (
            <Member
              key={member.name}
              member={member}
              index={index}
            />
          ))}
        </ul>

        <p className='mx-auto mt-[1.5rem] max-w-[46rem] text-[0.8125rem] leading-[1.6] text-[#94A3B8]'>
          Năng lực tài chính cùng mạng lưới công ty thành viên giúp Bateco triển khai dự án nhanh
          chóng, đồng bộ và bảo đảm chất lượng bền vững.
        </p>
      </div>
    </section>
  )
}

export default SectorEcosystem
