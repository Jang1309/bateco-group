import type { AboutPillar } from '@/views/about/data'
import BrandBar from '@/views/about/pillars/components/brand-bar'
import PillarRow from '@/views/about/pillars/components/pillar-row'

type AboutPillarsProps = {
  pillars: AboutPillar[]
}

const AboutPillars = ({ pillars }: AboutPillarsProps) => {
  return (
    <section
      id='tam-nhin'
      className='scroll-mt-[6rem] bg-[#FDFDFD] pb-[2.8125rem] xsm:pb-[1rem]'
    >
      <BrandBar />
      <div className='mt-[0.78rem]'>
        {pillars.map((pillar, index) => (
          <PillarRow
            key={`${index}-${pillar.index}`}
            pillar={pillar}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}

export default AboutPillars
