import type { BusinessFieldResponse } from '@/interfaces/businessField.interface'
import type { SectorItem } from '@/interfaces/sectors.interface'
import BusinessHero from '@/views/business/hero'
import BusinessSectors from '@/views/business/sectors'

type BusinessViewProps = {
  content?: BusinessFieldResponse
  sectors?: SectorItem[]
}

const BusinessView = ({ content, sectors }: BusinessViewProps) => {
  return (
    <main>
      <BusinessHero data={content?.banner} />
      <BusinessSectors sectors={sectors} />
    </main>
  )
}

export default BusinessView
