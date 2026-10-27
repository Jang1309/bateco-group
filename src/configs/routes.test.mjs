import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  contactHrefFor,
  detailLocalePaths,
  isContactPath,
  localePath,
  newsCategoryListingHref,
  pathFor,
  resolveTranslatedSlug,
} from './routes.ts'

describe('isContactPath', () => {
  it('matches locale contact paths and absolute urls', () => {
    assert.equal(isContactPath('/lien-he'), true)
    assert.equal(isContactPath('/contact'), true)
    assert.equal(isContactPath('https://bateco-investment.vn/lien-he'), true)
    assert.equal(isContactPath('https://bateco-investment.vn/en/contact'), true)
    assert.equal(isContactPath('/projects'), false)
  })
})

describe('contactHrefFor', () => {
  it('returns localized contact path by default', () => {
    assert.equal(contactHrefFor('vi'), '/lien-he')
    assert.equal(contactHrefFor('en'), '/contact')
  })

  it('remaps cms contact urls to the active locale', () => {
    assert.equal(contactHrefFor('en', '/lien-he'), '/contact')
    assert.equal(contactHrefFor('vi', '/contact'), '/lien-he')
    assert.equal(contactHrefFor('en', 'https://bateco-investment.vn/lien-he'), '/contact')
  })

  it('passes through unrelated urls', () => {
    assert.equal(contactHrefFor('en', '/projects'), '/projects')
  })
})

describe('localePath', () => {
  it('keeps vi paths bare (as-needed default locale)', () => {
    assert.equal(localePath('vi', '/'), '/')
    assert.equal(localePath('vi', '/tin-tuc/danh-muc'), '/tin-tuc/danh-muc')
  })

  it('prefixes en paths with /en', () => {
    assert.equal(localePath('en', '/'), '/en')
    assert.equal(localePath('en', '/news/category'), '/en/news/category')
  })
})

describe('newsCategoryListingHref', () => {
  it('keeps /en on english legacy slug redirects with english keys', () => {
    assert.equal(
      newsCategoryListingHref('en', 'press-release'),
      '/en/news/category?category=press-release',
    )
  })

  it('uses bare vietnamese listing path with vietnamese keys', () => {
    assert.equal(
      newsCategoryListingHref('vi', 'thong-cao'),
      '/tin-tuc/danh-muc?chuyen-muc=thong-cao',
    )
  })

  it('encodes slug for query', () => {
    assert.equal(newsCategoryListingHref('en', 'a b'), '/en/news/category?category=a%20b')
  })
})

describe('aboutGovernance paths', () => {
  it('uses administrative-document for english public url', () => {
    assert.equal(pathFor('aboutGovernance', 'en'), '/introduction/administrative-document')
    assert.equal(pathFor('aboutGovernance', 'vi'), '/gioi-thieu/van-ban-quan-tri')
  })
})

describe('detailLocalePaths', () => {
  it('maps news detail to translated en slug', () => {
    assert.equal(
      resolveTranslatedSlug('vi', 'tin-abc', 'en', { en: { slug: 'news-abc' } }),
      'news-abc',
    )
    const result = detailLocalePaths({
      detailKey: 'newsDetail',
      listingKey: 'news',
      locale: 'vi',
      slug: 'tin-abc',
      translations: { en: { slug: 'news-abc' } },
    })
    assert.equal(result.path, '/tin-tuc/tin-abc')
    assert.equal(result.alternatePath, '/news/news-abc')
  })

  it('falls back to listing when translation missing', () => {
    const result = detailLocalePaths({
      detailKey: 'projectDetail',
      listingKey: 'projects',
      locale: 'vi',
      slug: 'du-an-a',
      translations: {},
    })
    assert.equal(result.paths.en, '/projects')
  })
})
