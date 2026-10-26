import type { NewsPostDetailItem } from '@/interfaces/news.interface'
import type { NewsArticleDetail } from '@/views/news/data'
import { decodeHtmlEntities, formatNewsDate, stripHtml } from '@/views/news/map-post'

const FALLBACK_IMAGE = '/home/news/card-1.jpg'

export const mapPostDetail = (item?: NewsPostDetailItem | null): NewsArticleDetail | null => {
  if (!item?.slug && !item?.id) return null

  const category = item.taxonomies?.category?.[0]
  const slug = item.slug || String(item.id)

  return {
    id: slug,
    title: decodeHtmlEntities(item.title) || '',
    excerpt: stripHtml(item.post_excerpt || item.excerpt),
    category: category?.slug || '',
    categoryTitle: decodeHtmlEntities(category?.name),
    date: formatNewsDate(item.published),
    image: item.thumbnail?.url || FALLBACK_IMAGE,
    href: `/tin-tuc/${slug}`,
    content: item.content || item.post_content || '',
  }
}
