import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  getNewsFilter,
  newsCategoryQueryKey,
  newsSearchParams,
  setNewsCategory,
  setNewsPage,
} from './search-params.ts'

describe('newsSearchParams', () => {
  it('uses vietnamese keys for vi', () => {
    assert.deepEqual(Object.keys(newsSearchParams('vi')).sort(), ['chuyen-muc', 'trang'])
  })

  it('uses english keys for en', () => {
    assert.deepEqual(Object.keys(newsSearchParams('en')).sort(), ['category', 'page'])
  })
})

describe('getNewsFilter / setters', () => {
  it('reads and writes en category/page', () => {
    assert.deepEqual(getNewsFilter('en', { category: 'hot-news', page: 2 }), {
      categorySlug: 'hot-news',
      page: 2,
    })
    assert.deepEqual(setNewsCategory('en', 'hot-news'), { category: 'hot-news', page: 1 })
    assert.deepEqual(setNewsPage('en', 3), { page: 3 })
    assert.equal(newsCategoryQueryKey('en'), 'category')
  })

  it('reads and writes vi chuyen-muc/trang', () => {
    assert.deepEqual(getNewsFilter('vi', { 'chuyen-muc': 'tin-nong', trang: 2 }), {
      categorySlug: 'tin-nong',
      page: 2,
    })
    assert.deepEqual(setNewsCategory('vi', 'tin-nong'), { 'chuyen-muc': 'tin-nong', trang: 1 })
    assert.equal(newsCategoryQueryKey('vi'), 'chuyen-muc')
  })
})
