import type { IntroductionResponse } from '@/interfaces/introduction.interface'
import AboutEcosystem from '@/views/about/ecosystem'
import AboutHero from '@/views/about/hero'
import AboutHistory from '@/views/about/history'
import AboutLeadership from '@/views/about/leadership'
import AboutMessage from '@/views/about/message'
import AboutPillars from '@/views/about/pillars'

type AboutViewProps = {
  locale: string
  content?: IntroductionResponse
}

const AboutView = ({ locale, content }: AboutViewProps) => {
  return (
    <main>
      <AboutHero data={content?.banner} />
      <AboutMessage data={content?.message} />
      <AboutPillars
        locale={locale}
        data={content?.pillars}
      />
      <AboutLeadership
        locale={locale}
        data={content?.leadership}
      />
      <AboutHistory
        locale={locale}
        data={content?.history}
      />
      <AboutEcosystem
        locale={locale}
        data={content?.ecosystem}
      />
    </main>
  )
}

export default AboutView
