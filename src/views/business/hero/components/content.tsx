import type { BusinessFieldBanner } from '@/interfaces/businessField.interface'

type HeroContentProps = {
  data?: BusinessFieldBanner
}

const HeroContent = ({ data }: HeroContentProps) => {
  return (
    <div className='relative z-[1] mx-auto max-w-[70rem] px-[1.5rem] text-center'>
      {data?.subtitle ? (
        <p
          className='business-hero-rise inline-flex items-center gap-[0.75rem] text-[0.8125rem] font-semibold tracking-[0.25em] text-[#B88E4F] uppercase'
          style={{ animationDelay: '40ms' }}
        >
          <span className='h-px w-[2rem] bg-[#C6A15B]' />
          {data.subtitle}
          <span className='h-px w-[2rem] bg-[#C6A15B]' />
        </p>
      ) : null}

      {data?.title ? (
        <div
          className='business-hero-fade mt-[1.25rem] text-[3.25rem] leading-[1.2] font-bold tracking-[0.02em] text-[#1A2B48] uppercase [&_br]:block [&_p]:m-0 [&_strong]:bg-[linear-gradient(93deg,#DFBA73_0%,#BA8A38_55%,#996E27_100%)] [&_strong]:bg-clip-text [&_strong]:font-bold [&_strong]:text-transparent xsm:text-[1.75rem]'
          style={{ animationDelay: '140ms' }}
          dangerouslySetInnerHTML={{ __html: data.title }}
        />
      ) : null}

      {data?.desc ? (
        <p
          className='business-hero-rise mx-auto mt-[1.5rem] max-w-[46rem] text-[1.0625rem] leading-[1.75] font-medium text-[#475569] xsm:text-[0.9375rem]'
          style={{ animationDelay: '240ms' }}
        >
          {data.desc}
        </p>
      ) : null}
    </div>
  )
}

export default HeroContent
