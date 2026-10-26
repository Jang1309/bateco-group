import Image from 'next/image'

import { cn } from '@/lib/utils'

type MemberProps = {
  logo: string
  index?: number
  /** Ô trong marquee — fixed width, không AOS */
  compact?: boolean
}

const Member = ({ logo, index = 0, compact }: MemberProps) => {
  const cell = (
    <div
      className={cn(
        'flex items-center justify-center border border-[#EEEEEE] transition-all duration-500 ease-out hover:border-[#C6A15B] hover:bg-[#FBF7EF]',
        compact
          ? 'h-[6rem] w-[14rem] shrink-0 px-[1.75rem] xsm:h-[4.5rem] xsm:w-[11rem] xsm:px-[1.25rem]'
          : 'h-[6rem] px-[1.5rem] xsm:h-[4.5rem] xsm:px-[1rem]',
      )}
    >
      <Image
        src={logo}
        alt=''
        width={200}
        height={80}
        unoptimized
        className='h-auto max-h-[2.75rem] w-auto max-w-full object-contain xsm:max-h-[2rem]'
      />
    </div>
  )

  if (compact) return cell

  return (
    <li
      data-aos='business-rise'
      data-aos-duration='800'
      data-aos-delay={index * 80}
    >
      {cell}
    </li>
  )
}

export default Member
