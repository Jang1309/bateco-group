import Image from 'next/image'

const BusinessHero = () => {
  return (
    <section className='relative pt-[4.5rem] pb-[6rem] xsm:pt-[3rem] xsm:pb-[3.5rem]'>
      <div className='absolute inset-0 overflow-hidden'>
        {/* TODO: thay bằng ảnh hero riêng của trang lĩnh vực kinh doanh */}
        <Image
          src='/linh-vuc-kinh-doanh/d-banner.png'
          alt=''
          fill
          priority
          unoptimized
          sizes='100vw'
          className='object-cover object-center'
        />
      </div>

      <div className='relative mx-auto max-w-[70rem] px-[1.5rem] text-center'>
        <p
          className='business-hero-rise inline-flex items-center gap-[0.75rem] text-[0.8125rem] font-semibold tracking-[0.25em] text-[#B88E4F] uppercase'
          style={{ animationDelay: '40ms' }}
        >
          <span className='h-px w-[2rem] bg-[#C6A15B]' />
          Lĩnh vực kinh doanh
          <span className='h-px w-[2rem] bg-[#C6A15B]' />
        </p>
        <h1
          className='business-hero-fade mt-[1.25rem] text-[3.25rem] leading-[1.2] font-bold tracking-[0.02em] text-[#1A2B48] uppercase xsm:text-[1.75rem]'
          style={{ animationDelay: '140ms' }}
        >
          Hệ sinh thái đa ngành
          <br />
          <span
            style={{
              background: 'linear-gradient(93deg, #DFBA73 0%, #BA8A38 55%, #996E27 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Nền tảng kiến tạo tương lai
          </span>
        </h1>
        <p
          className='business-hero-rise mx-auto mt-[1.5rem] max-w-[46rem] text-[1.0625rem] font-medium leading-[1.75] text-[#475569] xsm:text-[0.9375rem]'
          style={{ animationDelay: '240ms' }}
        >
          BATECO Group tự hào xây dựng mô hình tăng trưởng tuần hoàn đa ngành vững mạnh với 5 trụ
          cột chiến lược. Chúng tôi không ngừng đổi mới công nghệ, nâng cao tiêu chuẩn quản trị quốc
          tế để tạo lập giá trị bền vững cho đối tác và cộng đồng.
        </p>
      </div>
    </section>
  )
}

export default BusinessHero
