import { getGovernanceCategory } from '@/views/governance/data'
import GovernanceDocuments from '@/views/governance/documents'
import GovernanceHero from '@/views/governance/hero'

type GovernanceViewProps = {
  categoryId?: string
  page: number
}

const GovernanceView = ({ categoryId, page }: GovernanceViewProps) => {
  const category = getGovernanceCategory(categoryId)

  return (
    <main>
      <GovernanceHero />
      <GovernanceDocuments
        category={category}
        page={page}
      />
    </main>
  )
}

export default GovernanceView
