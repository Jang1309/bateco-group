import { WHY_ITEMS } from '@/views/careers/data'

const CareersWhy = () => {
  return (
    <section className='bg-white pt-[5rem] pb-[2rem] xsm:pt-[3rem] xsm:pb-[1rem]'>
      <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
        <div className='flex items-end justify-between gap-[3rem] xsm:flex-col xsm:items-start xsm:gap-[1rem]'>
          <div className='max-w-[36rem]'>
            <p className='text-[0.75rem] font-bold tracking-[0.18em] text-[#B5935E] uppercase'>
              Why Bateco
            </p>
            <h2 className='mt-[0.75rem] text-[2rem] leading-[1.3] font-bold tracking-[-0.015em] text-[#1A2B48] xsm:text-[1.5rem]'>
              Đồng hành để phát triển dài hạn
            </h2>
          </div>
          <p className='max-w-[28rem] text-[0.9375rem] leading-[1.7] text-[#64748B] xsm:text-[0.875rem]'>
            Chúng tôi xây dựng môi trường nơi tài năng được ghi nhận, phát triển và cùng kiến tạo
            giá trị bền vững cho cộng đồng.
          </p>
        </div>

        <ul className='mt-[3rem] grid grid-cols-3 gap-[1.5rem] xsm:mt-[2rem] xsm:grid-cols-1 xsm:gap-[1rem]'>
          {WHY_ITEMS.map((item, index) => {
            const Icon = item.icon

            return (
              <li
                key={item.id}
                data-aos='business-rise'
                data-aos-duration='800'
                data-aos-delay={index * 100}
              >
                <div className='group relative overflow-hidden rounded-[1.25rem] bg-white p-[2rem] shadow-[0_0.75rem_2rem_-1.5rem_rgba(26,43,72,0.1)] ring-1 ring-[#1A2B48]/[0.06] transition-[box-shadow,translate] duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[0.25rem] hover:shadow-[0_2rem_3.5rem_-1.75rem_rgba(26,43,72,0.22)] xsm:rounded-[1rem] xsm:p-[1.5rem] xsm:transition-none xsm:hover:translate-y-0 xsm:hover:shadow-[0_0.75rem_2rem_-1.5rem_rgba(26,43,72,0.1)]'>
                  <span
                    aria-hidden
                    className='pointer-events-none absolute top-[1rem] right-[1.25rem] text-[4.5rem] leading-none font-bold text-[#1A2B48]/[0.05] select-none'
                  >
                    {item.number}
                  </span>
                  <span className='relative flex size-[2.75rem] items-center justify-center rounded-full bg-[#1A2B48] text-white transition-colors duration-300 group-hover:bg-[#B5935E] xsm:transition-none xsm:group-hover:bg-[#1A2B48]'>
                    <Icon
                      className='size-[1.125rem]'
                      strokeWidth={1.75}
                    />
                  </span>
                  <h3 className='relative mt-[1.5rem] text-[1.125rem] leading-[1.4] font-bold text-[#1A2B48] xsm:text-[1.0625rem]'>
                    {item.title}
                  </h3>
                  <p className='relative mt-[0.625rem] text-[0.875rem] leading-[1.65] text-[#64748B]'>
                    {item.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default CareersWhy
