import { ABOUT_GOVERNANCE_MENU, getAboutGovernanceCategory } from '@/views/governance/data'
import GovernanceDocuments from '@/views/governance/documents'
import GovernanceHero from '@/views/governance/hero'

type AboutGovernanceViewProps = {
  categoryId?: string
  page: number
}

const AboutGovernanceView = ({ categoryId, page }: AboutGovernanceViewProps) => {
  const category = getAboutGovernanceCategory(categoryId)

  return (
    <main>
      <GovernanceHero />
      <GovernanceDocuments
        category={category}
        page={page}
        menu={ABOUT_GOVERNANCE_MENU}
        basePath='/gioi-thieu/van-ban-quan-tri'
      />
    </main>
  )
}

export default AboutGovernanceView
