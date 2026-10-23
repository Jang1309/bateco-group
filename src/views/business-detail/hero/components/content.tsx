import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import type { SectorDetail } from '@/views/business-detail/data'

const HeroContent = ({ sector }: { sector: SectorDetail }) => {
  return (
    <div className='relative z-[1] mx-auto w-full max-w-[95rem] px-[3.75rem] xsm:px-[1.5rem]'>
      <p
        className='business-hero-rise flex items-center gap-[0.75rem] text-[0.8125rem] font-semibold tracking-[0.2em] text-[#B5935E] uppercase xsm:text-[0.6875rem]'
        style={{ animationDelay: '40ms' }}
      >
        <span className='h-px w-[2.5rem] bg-[#C6A15B]' />
        {sector.name}
      </p>
      <h1
        className='business-hero-rise mt-[1.25rem] max-w-[44rem] text-[3.5rem] leading-[1.2] font-bold text-[#1A2B48] xsm:text-[2rem]'
        style={{ animationDelay: '140ms' }}
      >
        {sector.hero.title}
      </h1>
      <p
        className='business-hero-rise mt-[1.5rem] max-w-[38rem] text-[1.0625rem] leading-[1.7] text-[#1A2B48]/80 xsm:text-[0.9375rem]'
        style={{ animationDelay: '240ms' }}
      >
        {sector.hero.description}
      </p>

      <div
        className='business-hero-rise mt-[2.5rem] flex flex-wrap items-center gap-[1rem] xsm:mt-[2rem]'
        style={{ animationDelay: '340ms' }}
      >
        <a
          href='#du-an'
          className='inline-flex items-center gap-[0.5rem] bg-[#C39A5A] px-[1.5rem] py-[0.875rem] text-[0.8125rem] font-bold tracking-[0.06em] text-white uppercase transition-[background-color,box-shadow] duration-300 hover:bg-[#B08447] hover:shadow-[0_0.5rem_1.25rem_rgba(184,142,79,0.35)]'
        >
          Khám phá dự án
          <span aria-hidden>→</span>
        </a>
        <Link
          href={ROUTES.contact}
          className='inline-flex items-center border border-[#1A2B48]/35 px-[1.5rem] py-[0.875rem] text-[0.8125rem] font-bold tracking-[0.06em] text-[#1A2B48] uppercase transition-colors duration-300 hover:border-[#1A2B48] hover:bg-[#1A2B48] hover:text-white'
        >
          Liên hệ hợp tác
        </Link>
      </div>
    </div>
  )
}

export default HeroContent
