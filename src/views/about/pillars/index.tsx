import type { IntroductionPillars } from '@/interfaces/introduction.interface'
import BrandBar from '@/views/about/pillars/components/brand-bar'
import PillarRow from '@/views/about/pillars/components/pillar-row'

type AboutPillarsProps = {
  data?: IntroductionPillars
}

const AboutPillars = ({ data }: AboutPillarsProps) => {
  const pillars = data?.pillars ?? []

  return (
    <section
      id='tam-nhin'
      className='scroll-mt-[6rem] bg-[#FDFDFD] pb-[2.8125rem] xsm:pb-[1rem]'
    >
      <BrandBar logo={data?.logo} />
      <div className='mt-[0.78rem]'>
        {pillars.map((pillar, index) => (
          <PillarRow
            key={`${index}-${pillar.title}`}
            pillar={pillar}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}

export default AboutPillars
