import Image from 'next/image'

import FootprintMap from './footprint-map'

const Footprint = () => {
  return (
    <section className='relative overflow-hidden bg-[linear-gradient(180deg,#FDFBF7_0%,#F8F1E3_100%)] px-[3.125rem] py-[4.5rem] xsm:px-[1.5rem] xsm:py-[2.5rem]'>
      {/* Quầng sáng xanh nhạt phía biển, làm nền cho Hoàng Sa - Trường Sa */}
      <span
        aria-hidden
        className='pointer-events-none absolute top-[20%] right-[-10%] size-[45rem] rounded-full bg-[radial-gradient(circle,rgba(186,214,230,0.45)_0%,transparent_65%)] xsm:hidden'
      />

      <div className='relative mx-auto flex max-w-[95rem] items-start gap-[3rem] xsm:flex-col xsm:items-stretch xsm:gap-[2rem]'>
        <div className='w-[42%] shrink-0 pt-[2rem] xsm:w-full xsm:pt-0'>
          <h2
            data-aos='fade-up'
            className='text-[3.25rem] leading-[1.1] font-extrabold tracking-[0.01em] text-[#0B1A33] uppercase xsm:text-[2rem]'
          >
            Dấu ấn{' '}
            <span
              style={{
                background: 'linear-gradient(93deg, #DFBA73 0%, #BA8A38 55%, #996E27 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Bateco
            </span>
          </h2>

          <p
            data-aos='fade-up'
            data-aos-delay='100'
            className='mt-[1.5rem] max-w-[34rem] border-l-2 border-[#C6A15B] pl-[1.25rem] text-[1rem] leading-[1.75] text-[#475569] xsm:text-[0.9rem]'
          >
            Bateco Group (thành lập ngày 18/09/2012) đã trải qua hành trình 14 năm phát triển và
            chính thức bước sang tuổi 15 với diện mạo mới là{' '}
            <strong className='font-semibold text-[#0B1A33]'>Bateco Investment Group</strong>.
          </p>

          {/* Ảnh với khung vàng lệch phía sau, giống ảnh section Vision */}
          <div
            data-aos='zoom-in-up'
            data-aos-delay='200'
            className='relative mt-[2.5rem] w-[88%] pr-[1rem] pb-[1rem] xsm:w-full xsm:pr-[0.75rem] xsm:pb-[0.75rem]'
          >
            <span
              aria-hidden
              className='absolute top-[1rem] right-0 bottom-0 left-[1rem] rounded-[1rem] border border-[#C6A15B]/60 xsm:top-[0.75rem] xsm:left-[0.75rem]'
            />
            <div className='group relative aspect-[16/10] overflow-hidden rounded-[1rem] shadow-[0_1.25rem_3rem_rgba(11,26,51,0.22)]'>
              <Image
                src='/home/vision/d-img-1.jpg'
                alt='Lễ kỷ niệm 14 năm Bateco'
                fill
                sizes='(max-width: 639px) 92vw, 36vw'
                className='object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]'
              />
              <span
                aria-hidden
                className='absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(180deg,transparent_0%,rgba(5,11,20,0.8)_100%)]'
              />
              <p className='absolute bottom-[1rem] left-[1.25rem] text-[0.875rem] font-semibold tracking-[0.04em] text-white uppercase xsm:text-[0.75rem]'>
                Lễ kỷ niệm 14 năm Bateco
              </p>
            </div>
          </div>
        </div>

        <div className='mx-auto w-full max-w-[44rem] flex-1 xsm:max-w-[26rem]'>
          <FootprintMap />
        </div>
      </div>
    </section>
  )
}

export default Footprint
