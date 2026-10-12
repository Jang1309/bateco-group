import Image from 'next/image'

import JourneyTimeline from '@/views/homepage/journey/timeline'

const journey = () => {
  return (
    <section className='relative overflow-hidden bg-[linear-gradient(180deg,#0B1A33_0%,#0A1730_60%,#050B18_100%)] pt-[5rem] pb-[5.5rem] xsm:pt-[3rem] xsm:pb-[3rem]'>
      {/* Lưới mảnh + các quầng sáng vàng/xanh tạo chiều sâu cho nền tối */}
      <span
        aria-hidden
        className='pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(198,161,91,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(198,161,91,0.06)_1px,transparent_1px)] bg-[length:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_45%,#000_0%,transparent_100%)]'
      />
      <span
        aria-hidden
        className='pointer-events-none absolute top-[-12rem] left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(223,186,115,0.18)_0%,transparent_65%)]'
      />
      <span
        aria-hidden
        className='pointer-events-none absolute right-[-10rem] bottom-[-14rem] size-[46rem] rounded-full bg-[radial-gradient(circle,rgba(52,102,194,0.28)_0%,transparent_65%)]'
      />

      <div
        data-aos='fade-up'
        className='relative px-[1.5rem]'
      >
        <h2
          className='mx-auto w-fit text-center text-[3.75rem] leading-[4.75rem] font-bold tracking-[0.23rem] uppercase xsm:text-[1.9rem] xsm:leading-[2.4rem] xsm:tracking-[0.08rem]'
          style={{
            background: 'linear-gradient(93deg, #F2D59A 0%, #DFBA73 40%, #BA8A38 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Chặng đường phát triển
        </h2>
        <Image
          src='/home/journey/decor.svg'
          alt=''
          width={1000}
          height={240}
          className='mx-auto h-[1rem] w-auto'
        />
        <p className='mt-4 text-center text-[1rem] leading-[1.5625rem] tracking-[0.23rem] text-white/55 uppercase xsm:text-[0.7rem] xsm:tracking-[0.1rem]'>
          Bateco Group • Hành trình kiến tạo vị thế
        </p>
      </div>

      <div className='relative'>
        <JourneyTimeline />
      </div>
    </section>
  )
}

export default journey
