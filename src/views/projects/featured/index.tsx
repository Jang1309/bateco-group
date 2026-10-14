import SectionHeading from '@/components/shared/section-heading'
import { PROJECTS } from '@/views/projects/data'

import FeaturedSlider from './featured-slider'

const FeaturedProjects = () => {
  const featured = PROJECTS.filter((project) => project.featured)

  if (featured.length === 0) return null

  return (
    <section className='bg-white pt-[2rem] pb-[5rem] xsm:pt-[1rem] xsm:pb-[3rem]'>
      <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
        <SectionHeading title='Dự án nổi bật' />
        <div
          data-aos='business-rise'
          data-aos-duration='800'
          data-aos-delay='100'
          className='mt-[2.5rem] xsm:mt-[1.5rem]'
        >
          <FeaturedSlider projects={featured} />
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
