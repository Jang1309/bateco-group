import type { AboutContent } from '@/views/about/data'
import AboutEcosystem from '@/views/about/ecosystem'
import AboutHero from '@/views/about/hero'
import AboutHistory from '@/views/about/history'
import AboutLeadership from '@/views/about/leadership'
import AboutMessage from '@/views/about/message'
import AboutPillars from '@/views/about/pillars'

type AboutViewProps = {
  content: AboutContent
}

const AboutView = ({ content }: AboutViewProps) => {
  return (
    <main>
      <AboutHero hero={content.hero} />
      <AboutMessage message={content.message} />
      <AboutPillars pillars={content.pillars} />
      <AboutLeadership leadership={content.leadership} />
      <AboutHistory history={content.history} />
      <AboutEcosystem ecosystem={content.ecosystem} />
    </main>
  )
}

export default AboutView
