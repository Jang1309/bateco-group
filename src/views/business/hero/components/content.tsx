import type { BusinessFieldBanner } from '@/interfaces/businessField.interface'
import { cn } from '@/lib/utils'

type HeroContentProps = {
  data?: BusinessFieldBanner
  /** Mobile stack: chữ trên nền trắng, không đè lên ảnh */
  stacked?: boolean
}

const HeroContent = ({ data, stacked }: HeroContentProps) => {
  return (
    <div
      className={cn(
        'relative z-[1] mx-auto max-w-[70rem] text-center',
        stacked ? 'w-full px-[1.25rem]' : 'px-[1.5rem]',
      )}
    >
      {data?.subtitle ? (
        <p
          className={cn(
            'business-hero-rise inline-flex items-center gap-[0.75rem] font-semibold tracking-[0.25em] text-[#B88E4F] uppercase',
            stacked ? 'text-[0.6875rem] tracking-[0.18em]' : 'text-[0.8125rem]',
          )}
          style={{ animationDelay: '40ms' }}
        >
          <span className='h-px w-[2rem] bg-[#C6A15B]' />
          {data.subtitle}
          <span className='h-px w-[2rem] bg-[#C6A15B]' />
        </p>
      ) : null}

      {data?.title ? (
        <div
          className={cn(
            'business-hero-fade font-bold tracking-[0.02em] text-[#1A2B48] uppercase [&_br]:block [&_p]:m-0 [&_strong]:bg-[linear-gradient(93deg,#DFBA73_0%,#BA8A38_55%,#996E27_100%)] [&_strong]:bg-clip-text [&_strong]:font-bold [&_strong]:text-transparent',
            stacked
              ? 'mt-[0.75rem] text-[1.25rem] leading-[1.3] tracking-normal'
              : 'mt-[1.25rem] text-[3.25rem] leading-[1.2]',
          )}
          style={{ animationDelay: '140ms' }}
          dangerouslySetInnerHTML={{ __html: data.title }}
        />
      ) : null}

      {data?.desc ? (
        <p
          className={cn(
            'business-hero-rise mx-auto font-medium text-[#475569]',
            stacked
              ? 'mt-[0.875rem] max-w-none text-pretty text-[0.875rem] leading-[1.6]'
              : 'mt-[1.5rem] max-w-[46rem] text-[1.0625rem] leading-[1.75]',
          )}
          style={{ animationDelay: '240ms' }}
        >
          {data.desc}
        </p>
      ) : null}
    </div>
  )
}

export default HeroContent
