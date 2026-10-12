import Banner from '@/views/homepage/banner'
import HomeBrand from '@/views/homepage/brand'
import Footprint from '@/views/homepage/footprint'
import Investment from '@/views/homepage/investment'
import HomeJourney from '@/views/homepage/journey'
import HomeNews from '@/views/homepage/news'
import Partners from '@/views/homepage/partners'
import Projects from '@/views/homepage/projects'
import Vision from '@/views/homepage/vision'

const HomePageView = () => {
  return (
    <main>
      <Banner />
      <HomeNews />
      <HomeBrand />
      <HomeJourney />
      <Vision />
      <Investment />
      <Footprint />
      <Partners />
      <Projects />
    </main>
  )
}

export default HomePageView
