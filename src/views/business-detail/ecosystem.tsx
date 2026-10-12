import Image from 'next/image'

import { ECOSYSTEM_STATS, MEMBER_LOGOS } from './data'

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
            <div
              key={stat.label}
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
          ))}
        </dl>

        <ul className='mt-[3.5rem] grid grid-cols-4 gap-[1.25rem] xsm:mt-[2.5rem] xsm:grid-cols-2 xsm:gap-[0.75rem]'>
          {MEMBER_LOGOS.map((member, index) => (
            <li
              key={member.name}
              data-aos='business-rise'
              data-aos-duration='800'
              data-aos-delay={index * 80}
              className='flex h-[6rem] items-center justify-center border border-[#EEEEEE] px-[1.5rem] transition-[border-color,background-color] duration-300 hover:border-[#C6A15B] hover:bg-[#FBF7EF] xsm:h-[4.5rem] xsm:px-[1rem]'
            >
              <Image
                src={member.logo}
                alt={member.name}
                width={523}
                height={143}
                className='h-auto max-h-[2.75rem] w-auto max-w-full object-contain xsm:max-h-[2rem]'
              />
            </li>
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
