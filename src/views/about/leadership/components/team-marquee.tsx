import { InfiniteSlider } from '@/components/shared/infinite-slider'
import type { AboutLeader } from '@/views/about/data'
import LeaderCard from '@/views/about/leadership/components/leader-card'

const MIN_MARQUEE_ITEMS = 5

type TeamMarqueeProps = {
  team: AboutLeader[]
}

const TeamMarquee = ({ team }: TeamMarqueeProps) => {
  if (team.length < MIN_MARQUEE_ITEMS) {
    return (
      <div className='flex flex-wrap justify-center gap-[1.5625rem] py-[1.25rem]'>
        {team.map((leader, index) => (
          <LeaderCard
            key={`${index}-${leader.name}`}
            leader={leader}
          />
        ))}
      </div>
    )
  }

  return (
    <div className='w-full py-[1.25rem] [mask-image:linear-gradient(90deg,transparent,#000_6.3%,#000_93.7%,transparent)]'>
      <InfiniteSlider
        gap={0}
        speed={50}
        speedOnHover={8}
      >
        {team.map((leader, index) => (
          <div
            key={`${index}-${leader.name}`}
            className='flex pr-[1.5625rem] xsm:pr-[1rem]'
          >
            <LeaderCard leader={leader} />
          </div>
        ))}
      </InfiniteSlider>
    </div>
  )
}

export default TeamMarquee
