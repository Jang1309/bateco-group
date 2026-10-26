import type { NewsPageResponse } from '@/interfaces/postList.interface'
import NewsCategories from '@/views/news/categories'
import type { CategoryBlock } from '@/views/news/data'
import FeaturedNews from '@/views/news/featured'
import NewsHero from '@/views/news/hero'
import { mapFeaturedPosts } from '@/views/news/map-featured-post'

type NewsViewProps = {
  content?: NewsPageResponse
  categoryBlocks?: CategoryBlock[]
}

const NewsView = ({ content, categoryBlocks = [] }: NewsViewProps) => {
  const featuredArticles = mapFeaturedPosts(content?.featured_news?.posts)

  return (
    <main>
      <NewsHero data={content?.banner} />
      <FeaturedNews articles={featuredArticles} />
      <NewsCategories blocks={categoryBlocks} />
    </main>
  )
}

export default NewsView
