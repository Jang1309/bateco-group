import SectionHeading from '@/components/shared/section-heading'
import type { ProjectListItem } from '@/interfaces/projects.interface'
import { mapProjectListItem } from '@/views/projects/map-project'

import FeaturedSlider from './featured-slider'

type FeaturedProjectsProps = {
  projects?: ProjectListItem[]
}

const FeaturedProjects = ({ projects = [] }: FeaturedProjectsProps) => {
  const featured = projects
    .map(mapProjectListItem)
    .filter((item): item is NonNullable<typeof item> => item !== null)

  if (featured.length === 0) return null

  return (
    <section className='bg-white pt-[2rem] pb-[5rem] xsm:pt-[0.5rem] xsm:pb-[2.5rem]'>
      <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
        <SectionHeading title='Dự án nổi bật' />
        <div
          data-aos='business-rise'
          data-aos-duration='800'
          data-aos-delay='100'
          className='mt-[2.5rem] xsm:mt-[1.25rem]'
        >
          <FeaturedSlider projects={featured} />
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
