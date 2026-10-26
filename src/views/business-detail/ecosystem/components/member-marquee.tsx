'use client'

import { InfiniteSlider } from '@/components/shared/infinite-slider'

import Member from './member'

type MemberMarqueeProps = {
  members: string[]
}

const MemberMarquee = ({ members }: MemberMarqueeProps) => {
  return (
    <div className='mt-[3.5rem] [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] xsm:mt-[2.5rem] xsm:[mask-image:none]'>
      <InfiniteSlider
        gap={20}
        speed={70}
        speedOnHover={35}
      >
        {members.map((logo, index) => (
          <Member
            key={`${logo}-${index}`}
            logo={logo}
            compact
          />
        ))}
      </InfiniteSlider>
    </div>
  )
}

export default MemberMarquee
