export type NewsCategory = {
  id: string
  title: string
}

export type NewsArticle = {
  id: string
  title: string
  excerpt: string
  category: NewsCategory['id'] | string
  /** Tên danh mục từ CMS */
  categoryTitle?: string
  date: string
  image: string
  href: string
}

export type NewsArticleDetail = NewsArticle & {
  /** HTML từ CMS, render bằng dangerouslySetInnerHTML */
  content: string
}

export type CategoryBlock = {
  category: NewsCategory['id'] | string
  /** Tên chuyên mục từ CMS */
  categoryTitle?: string
  /** 2 bài có ảnh */
  cards: NewsArticle[]
  /** Các bài chỉ hiển thị tiêu đề */
  list: Pick<NewsArticle, 'id' | 'title' | 'date' | 'href'>[]
}

export function resolveCategoryTitle(article: Pick<NewsArticle, 'category' | 'categoryTitle'>) {
  return article.categoryTitle || article.category || ''
}
