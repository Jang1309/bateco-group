import { hrefFor } from '@/configs/routes'
import type { PostListItem } from '@/interfaces/postList.interface'
import { decodeHtmlEntities } from '@/utils/decodeHtmlEntities'
import type { NewsArticle } from '@/views/news/data'

export { decodeHtmlEntities }

const FALLBACK_IMAGE = '/home/news/card-1.jpg'

export const stripHtml = (value?: string) =>
  value
    ?.replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || ''

export const formatNewsDate = (value?: string) => {
  if (!value) return ''
  const [y, m, d] = value.split('-')
  if (y && m && d) return `${d}/${m}/${y}`
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}/${month}/${date.getFullYear()}`
}

export const mapPostListItem = (
  item?: PostListItem | null,
  locale: string = 'vi',
): NewsArticle | null => {
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
    href: hrefFor('newsDetail', locale, { slug }),
  }
}

export const mapPostListItems = (
  items?: PostListItem[] | null,
  locale: string = 'vi',
): NewsArticle[] =>
  (items ?? [])
    .map((item) => mapPostListItem(item, locale))
    .filter((item): item is NewsArticle => item !== null)
