import type { NewsFeaturedPost } from '@/interfaces/postList.interface'
import type { NewsArticle } from '@/views/news/data'
import { decodeHtmlEntities, stripHtml } from '@/views/news/map-post'

const FALLBACK_IMAGE = '/home/news/card-1.jpg'

export const mapFeaturedPost = (post?: NewsFeaturedPost | null): NewsArticle | null => {
  if (!post?.slug && !post?.id) return null

  const category = post.taxonomies?.category?.[0]
  const image =
    post.featured_image?.url ||
    (typeof post.acf?.featured_image === 'object' ? post.acf.featured_image?.url : undefined) ||
    FALLBACK_IMAGE

  const slug = post.slug || String(post.id)

  return {
    id: slug,
    title: decodeHtmlEntities(post.title) || '',
    excerpt: stripHtml(post.post_excerpt || post.excerpt),
    category: category?.slug || '',
    categoryTitle: decodeHtmlEntities(category?.name),
    date: '',
    image,
    href: `/tin-tuc/${slug}`,
  }
}

export const mapFeaturedPosts = (posts?: NewsFeaturedPost[] | null): NewsArticle[] => {
  // CMS có thể trả `posts: ""` khi chưa chọn bài nổi bật
  if (!Array.isArray(posts)) return []
  return posts.map(mapFeaturedPost).filter((item): item is NewsArticle => item !== null)
}
