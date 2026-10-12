import SectorCta from './cta'
import type { SectorDetail } from './data'
import SectorEcosystem from './ecosystem'
import SectorHero from './hero'
import SectorIntro from './intro'
import SectorProjects from './projects'

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
