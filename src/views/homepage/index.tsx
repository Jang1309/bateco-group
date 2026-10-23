import type { HomepageAcf } from '@/interfaces/homepage.interface'
import type { PostListItem } from '@/interfaces/postList.interface'
import type { ProjectsResponse } from '@/interfaces/projects.interface'
import type { SectorsResponse } from '@/interfaces/sectors.interface'
import Banner from '@/views/homepage/banner'
import HomeBrand from '@/views/homepage/brand'
import Footprint from '@/views/homepage/footprint'
import Investment from '@/views/homepage/investment'
import HomeJourney from '@/views/homepage/journey'
import HomeNews from '@/views/homepage/news'
import Partners from '@/views/homepage/partners'
import Projects from '@/views/homepage/projects'
import Vision from '@/views/homepage/vision'

const HomePageView = ({
  homepage,
  postList,
  sectors,
  projects,
}: {
  homepage?: HomepageAcf
  postList?: PostListItem[]
  sectors?: SectorsResponse
  projects?: ProjectsResponse
}) => {
  return (
    <main>
      <Banner data={homepage?.banner} />
      <HomeNews posts={postList} />
      <HomeBrand data={homepage?.brand} />
      <HomeJourney data={homepage?.journey} />
      <Vision data={homepage?.vision} />
      <Investment sectors={sectors} />
      <Footprint data={homepage?.footprint} />
      <Partners data={homepage?.partners} />
      <Projects projects={projects} />
    </main>
  )
}

export default HomePageView
