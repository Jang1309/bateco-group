import Image from 'next/image'

import { cn } from '@/lib/utils'

export type CoverTone = 'navy' | 'green'

type DocumentCoverProps = {
  label: string
  title: string
  year: string
  /** Ảnh bìa thật; bỏ trống sẽ dựng bìa mặc định */
  image?: string
  tone?: CoverTone
  /** Thu nhỏ bìa trên mobile (dùng khi bìa nằm cạnh nội dung) */
  compactOnMobile?: boolean
  className?: string
}

const TONES: Record<CoverTone, string> = {
  navy: 'bg-[linear-gradient(160deg,#1E3A6E_0%,#1A2B48_55%,#0F1C33_100%)]',
  green: 'bg-[linear-gradient(160deg,#1F7A54_0%,#0F5A3C_55%,#0A3F2A_100%)]',
}

/** Bìa tài liệu dạng sách, nghiêng 3D và xoay thẳng khi hover phần tử cha có class `group` */
const DocumentCover = ({
  label,
  title,
  year,
  image,
  tone = 'navy',
  compactOnMobile = false,
  className,
}: DocumentCoverProps) => {
  return (
    <div
      className={cn(
        'relative w-[11rem] [perspective:60rem]',
        compactOnMobile ? 'xsm:w-[6.5rem]' : 'xsm:w-[9.5rem]',
        className,
      )}
    >
      <div
        aria-hidden
        className='absolute inset-x-[0.75rem] -bottom-[0.75rem] h-[1.5rem] rounded-full bg-[#0F1C33]/25 blur-[0.75rem] transition-all duration-500 group-hover:inset-x-[0.25rem] group-hover:bg-[#0F1C33]/30'
      />
      <div
        className={cn(
          'relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-[0.375rem] p-[1rem] shadow-[0_1rem_2rem_rgba(15,28,51,0.25)] transition-transform duration-500 ease-out [transform:rotateY(-14deg)_rotateX(4deg)] group-hover:[transform:rotateY(0deg)_rotateX(0deg)_translateY(-0.25rem)]',
          TONES[tone],
          compactOnMobile && 'xsm:p-[0.625rem]',
        )}
      >
        {image ? (
          <Image
            src={image}
            alt={`${label} ${title} ${year}`}
            fill
            sizes='11rem'
            className='object-cover'
          />
        ) : (
          <>
            <span
              aria-hidden
              className='absolute -right-[2.5rem] -bottom-[2.5rem] size-[7rem] rounded-full border-[1.25rem] border-[#B5935E]/25'
            />
            <Image
              src='/header/d-logo-white.png'
              alt=''
              width={120}
              height={40}
              className={cn('relative h-auto w-[4.75rem]', compactOnMobile && 'xsm:w-[3rem]')}
            />
            <div className='relative text-left'>
              <span
                className={cn(
                  'block h-[0.125rem] w-[1.5rem] bg-[#DFBA73]',
                  compactOnMobile && 'xsm:w-[1rem]',
                )}
              />
              <p
                className={cn(
                  'mt-[0.5rem] text-[0.5625rem] font-bold tracking-[0.2em] text-[#DFBA73] uppercase',
                  compactOnMobile && 'xsm:mt-[0.25rem] xsm:text-[0.4375rem]',
                )}
              >
                {label}
              </p>
              <p
                className={cn(
                  'text-[1rem] leading-[1.15] font-bold text-white uppercase',
                  compactOnMobile && 'xsm:text-[0.625rem]',
                )}
              >
                {title}
              </p>
              <p
                className={cn(
                  'mt-[0.25rem] text-[0.75rem] font-semibold text-white/70',
                  compactOnMobile && 'xsm:mt-[0.125rem] xsm:text-[0.5625rem]',
                )}
              >
                {year}
              </p>
            </div>
          </>
        )}
        <span
          aria-hidden
          className='absolute inset-y-0 left-0 w-[0.5rem] bg-[linear-gradient(90deg,rgba(0,0,0,0.25),rgba(255,255,255,0.05))]'
        />
      </div>
    </div>
  )
}

export default DocumentCover
