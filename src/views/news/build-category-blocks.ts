import type { NewsCategoryItem } from '@/interfaces/news.interface'
import type { CategoryBlock, NewsArticle, NewsCategory } from '@/views/news/data'
import { decodeHtmlEntities } from '@/views/news/map-post'

const CARDS_PER_BLOCK = 2
const LIST_PER_BLOCK = 4

export const mapNewsCategories = (items?: NewsCategoryItem[] | null): NewsCategory[] =>
  (items ?? [])
    .filter((item) => item.slug)
    .map((item) => ({
      id: item.slug!,
      title: decodeHtmlEntities(item.name) || item.slug!,
    }))

export const buildCategoryBlocks = (
  categories: NewsCategory[],
  articles: NewsArticle[],
  options?: { cardsPerBlock?: number; listPerBlock?: number },
): CategoryBlock[] => {
  const cardsPerBlock = options?.cardsPerBlock ?? CARDS_PER_BLOCK
  const listPerBlock = options?.listPerBlock ?? LIST_PER_BLOCK

  return categories.map((category) => {
    const posts = articles.filter((article) => article.category === category.id)
    const cards = posts.slice(0, cardsPerBlock)
    const list = posts.slice(cardsPerBlock, cardsPerBlock + listPerBlock).map((item) => ({
      id: item.id,
      title: item.title,
      date: item.date,
      href: item.href,
    }))

    return {
      category: category.id,
      categoryTitle: category.title,
      cards,
      list,
    }
  })
}
