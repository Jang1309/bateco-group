import { sectionId } from '@/configs/section-ids'
import type { IntroductionPillars } from '@/interfaces/introduction.interface'
import BrandBar from '@/views/about/pillars/components/brand-bar'
import PillarRow from '@/views/about/pillars/components/pillar-row'

type AboutPillarsProps = {
  locale?: string
  data?: IntroductionPillars
}

const AboutPillars = ({ locale = 'vi', data }: AboutPillarsProps) => {
  const pillars = data?.pillars ?? []

  return (
    <section
      id={sectionId('aboutVision', locale)}
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
