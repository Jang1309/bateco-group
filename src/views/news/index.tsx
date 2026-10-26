import { getLocale } from 'next-intl/server'

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

const NewsView = async ({ content, categoryBlocks = [] }: NewsViewProps) => {
  const locale = await getLocale()
  const featuredArticles = mapFeaturedPosts(content?.featured_news?.posts, locale)

  return (
    <main>
      <NewsHero data={content?.banner} />
      <FeaturedNews articles={featuredArticles} />
      <NewsCategories blocks={categoryBlocks} />
    </main>
  )
}

export default NewsView
