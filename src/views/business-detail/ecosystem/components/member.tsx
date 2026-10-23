import Image from 'next/image'

import { MEMBER_LOGOS } from '@/views/business-detail/data'

type MemberProps = {
  member: (typeof MEMBER_LOGOS)[number]
  index: number
}

const Member = ({ member, index }: MemberProps) => {
  return (
    <li
      data-aos='business-rise'
      data-aos-duration='800'
      data-aos-delay={index * 80}
      className='flex h-[6rem] items-center justify-center border border-[#EEEEEE] px-[1.5rem] transition-[border-color,background-color] duration-300 hover:border-[#C6A15B] hover:bg-[#FBF7EF] xsm:h-[4.5rem] xsm:px-[1rem]'
    >
      <Image
        src={member.logo}
        alt={member.name}
        width={523}
        height={143}
        className='h-auto max-h-[2.75rem] w-auto max-w-full object-contain xsm:max-h-[2rem]'
      />
    </li>
  )
}

export default Member
