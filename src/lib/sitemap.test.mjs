import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  absolutePublicUrl,
  buildLocalizedSitemapEntry,
  collectPaginatedItems,
  pairTranslatedSlugs,
} from './sitemap.ts'

describe('absolutePublicUrl', () => {
  const base = 'https://bateco-investment.vn'

  it('builds vi urls without locale prefix', () => {
    assert.equal(absolutePublicUrl(base, 'vi', '/'), 'https://bateco-investment.vn')
    assert.equal(
      absolutePublicUrl(base, 'vi', '/gioi-thieu'),
      'https://bateco-investment.vn/gioi-thieu',
    )
  })

  it('builds en urls with /en prefix', () => {
    assert.equal(absolutePublicUrl(base, 'en', '/'), 'https://bateco-investment.vn/en')
    assert.equal(
      absolutePublicUrl(base, 'en', '/introduction'),
      'https://bateco-investment.vn/en/introduction',
    )
  })

  it('strips trailing slash on domain and normalizes path', () => {
    assert.equal(
      absolutePublicUrl('https://bateco-investment.vn/', 'vi', 'gioi-thieu'),
      'https://bateco-investment.vn/gioi-thieu',
    )
  })
})

describe('buildLocalizedSitemapEntry', () => {
  it('emits vi loc with en + x-default alternates', () => {
    const entry = buildLocalizedSitemapEntry({
      viUrl: 'https://bateco-investment.vn/gioi-thieu',
      enUrl: 'https://bateco-investment.vn/en/introduction',
      lastModified: '2026-01-15',
    })

    assert.equal(entry.url, 'https://bateco-investment.vn/gioi-thieu')
    assert.equal(entry.lastModified, '2026-01-15')
    assert.deepEqual(entry.alternates?.languages, {
      vi: 'https://bateco-investment.vn/gioi-thieu',
      en: 'https://bateco-investment.vn/en/introduction',
      'x-default': 'https://bateco-investment.vn/gioi-thieu',
    })
  })

  it('omits lastModified when missing', () => {
    const entry = buildLocalizedSitemapEntry({
      viUrl: 'https://bateco-investment.vn/',
      enUrl: 'https://bateco-investment.vn/en',
    })
    assert.equal(entry.lastModified, undefined)
  })
})

describe('pairTranslatedSlugs', () => {
  it('pairs via translations.en.slug and leaves en-only leftovers', () => {
    const { paired, enOnly } = pairTranslatedSlugs(
      [
        { slug: 'bat-dong-san', translations: { en: { slug: 'real-estate' } } },
        { slug: 'cong-nghiep', translations: { en: { slug: 'industry' } } },
        { slug: 'only-vi' },
      ],
      [{ slug: 'real-estate' }, { slug: 'industry' }, { slug: 'only-en' }],
    )

    assert.deepEqual(paired, [
      { viSlug: 'bat-dong-san', enSlug: 'real-estate' },
      { viSlug: 'cong-nghiep', enSlug: 'industry' },
    ])
    assert.deepEqual(
      enOnly.map((item) => item.slug),
      ['only-en'],
    )
  })
})

describe('collectPaginatedItems', () => {
  it('walks pages until totalPages is exhausted', async () => {
    const calls = []
    const items = await collectPaginatedItems(async (paged) => {
      calls.push(paged)
      if (paged === 1) {
        return { data: [{ slug: 'a' }, { slug: 'b' }], totalPages: 2 }
      }
      return { data: [{ slug: 'c' }], totalPages: 2 }
    })

    assert.deepEqual(calls, [1, 2])
    assert.deepEqual(
      items.map((item) => item.slug),
      ['a', 'b', 'c'],
    )
  })

  it('stops when a page returns empty data', async () => {
    const items = await collectPaginatedItems(async () => ({ data: [], totalPages: 5 }))
    assert.deepEqual(items, [])
  })
})
