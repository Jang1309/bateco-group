import type { ProjectListItem } from '@/interfaces/projects.interface'
import type { SectorItem } from '@/interfaces/sectors.interface'
import type { Contact, Ecosystem } from '@/interfaces/siteSetting.interface'
import SectorCta from '@/views/business-detail/cta'
import SectorEcosystem from '@/views/business-detail/ecosystem'
import SectorHero from '@/views/business-detail/hero'
import SectorIntro from '@/views/business-detail/intro'
import SectorProjects from '@/views/business-detail/projects'

type BusinessDetailViewProps = {
  locale: string
  sector: SectorItem
  projects?: ProjectListItem[]
  ecosystem?: Ecosystem
  contact?: Contact
}

const BusinessDetailView = ({
  locale,
  sector,
  projects,
  ecosystem,
  contact,
}: BusinessDetailViewProps) => {
  return (
    <main>
      <SectorHero sector={sector} />
      <SectorIntro sector={sector} />
      <SectorProjects
        projects={projects}
        locale={locale}
      />
      <SectorEcosystem data={ecosystem} />
      <SectorCta data={contact} />
    </main>
  )
}

export default BusinessDetailView
