import homepageService from '@/services/homepage'
import HomePageView from '@/views/homepage'

const HomePage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params

  const [homepageResponse, postListResponse, sectorsResponse, projectsResponse] = await Promise.all(
    [
      homepageService.getHomepage(locale),
      homepageService.getPostList(locale),
      homepageService.getSectors(locale),
      homepageService.getProjects(locale),
    ],
  )

  return (
    <HomePageView
      homepage={homepageResponse?.acf}
      postList={postListResponse?.data}
      sectors={sectorsResponse?.data}
      projects={projectsResponse?.data}
    />
  )
}

export default HomePage
