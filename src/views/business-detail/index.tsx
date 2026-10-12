import SectorCta from '@/views/business-detail/cta'
import type { SectorDetail } from '@/views/business-detail/data'
import SectorEcosystem from '@/views/business-detail/ecosystem'
import SectorHero from '@/views/business-detail/hero'
import SectorIntro from '@/views/business-detail/intro'
import SectorProjects from '@/views/business-detail/projects'

const BusinessDetailView = ({ sector }: { sector: SectorDetail }) => {
  return (
    <main>
      <SectorHero sector={sector} />
      <SectorIntro sector={sector} />
      <SectorProjects sector={sector} />
      <SectorEcosystem />
      <SectorCta />
    </main>
  )
}

export default BusinessDetailView
