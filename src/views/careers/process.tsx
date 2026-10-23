import { PROCESS_STEPS } from '@/views/careers/data'

const CareersProcess = () => {
  return (
    <section className='bg-white pt-[2rem] pb-[6rem] xsm:pt-[1rem] xsm:pb-[3.5rem]'>
      <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
        <div
          data-aos='business-rise'
          data-aos-duration='800'
          className='rounded-[1.25rem] border border-[#EEF1F5] border-t-[0.1875rem] border-t-[#B5935E] bg-white px-[3rem] py-[3.5rem] shadow-[0_1.5rem_3rem_-2rem_rgba(26,43,72,0.2)] xsm:rounded-[1rem] xsm:px-[1.25rem] xsm:py-[2rem]'
        >
          <div className='text-center'>
            <p className='text-[0.75rem] font-bold tracking-[0.18em] text-[#B5935E] uppercase'>
              Recruitment Journey
            </p>
            <h2 className='mt-[0.75rem] text-[2rem] leading-[1.3] font-bold tracking-[-0.015em] text-[#1A2B48] xsm:text-[1.5rem]'>
              Quy trình tuyển dụng
            </h2>
          </div>

          <ol className='relative mt-[3.5rem] grid grid-cols-4 gap-[2rem] xsm:mt-[2.5rem] xsm:grid-cols-1 xsm:gap-[2rem]'>
            <span
              aria-hidden
              className='absolute top-[1.125rem] right-[12.5%] left-[12.5%] h-px bg-[#E2E8F0] xsm:hidden'
            />
            {PROCESS_STEPS.map((step) => (
              <li
                key={step.id}
                className='relative flex flex-col items-center text-center'
              >
                <span className='relative z-10 flex size-[2.25rem] items-center justify-center rounded-full bg-[#1A2B48] text-[0.75rem] font-bold tracking-[0.04em] text-white'>
                  {step.number}
                </span>
                <h3 className='mt-[1.25rem] text-[1.0625rem] leading-[1.35] font-bold text-[#1A2B48]'>
                  {step.title}
                </h3>
                <p className='mt-[0.5rem] max-w-[14rem] text-[0.8125rem] leading-[1.6] text-[#64748B]'>
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default CareersProcess
