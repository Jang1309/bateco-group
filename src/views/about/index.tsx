import type { IntroductionResponse } from '@/interfaces/introduction.interface'
import AboutEcosystem from '@/views/about/ecosystem'
import AboutHero from '@/views/about/hero'
import AboutHistory from '@/views/about/history'
import AboutLeadership from '@/views/about/leadership'
import AboutMessage from '@/views/about/message'
import AboutPillars from '@/views/about/pillars'

type AboutViewProps = {
  content?: IntroductionResponse
}

const AboutView = ({ content }: AboutViewProps) => {
  return (
    <main>
      <AboutHero data={content?.banner} />
      <AboutMessage data={content?.message} />
      <AboutPillars data={content?.pillars} />
      <AboutLeadership data={content?.leadership} />
      <AboutHistory data={content?.history} />
      <AboutEcosystem data={content?.ecosystem} />
    </main>
  )
}

export default AboutView
