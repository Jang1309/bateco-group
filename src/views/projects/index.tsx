import FeaturedProjects from '@/views/projects/featured'
import ProjectsHero from '@/views/projects/hero'
import ProjectListing from '@/views/projects/listing'
import type { ProjectQuery } from '@/views/projects/listing/query'

type ProjectsViewProps = {
  query: ProjectQuery
}

const ProjectsView = ({ query }: ProjectsViewProps) => {
  return (
    <main>
      <ProjectsHero />
      <FeaturedProjects />
      <ProjectListing query={query} />
    </main>
  )
}

export default ProjectsView
