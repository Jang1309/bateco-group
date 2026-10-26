import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  CACHE_REVALIDATE,
  CACHE_TAGS,
  cacheNext,
  cacheOption,
  cacheTagsForApi,
  isAllowedCmsApiPath,
} from './cache.ts'

describe('cacheNext / cacheOption', () => {
  it('uses shared TTL and always includes cms tag', () => {
    const next = cacheNext(CACHE_TAGS.news)
    assert.equal(next.revalidate, CACHE_REVALIDATE)
    assert.deepEqual(next.tags, [CACHE_TAGS.cms, CACHE_TAGS.news])
    assert.deepEqual(cacheOption(CACHE_TAGS.projects), { next: cacheNext(CACHE_TAGS.projects) })
  })

  it('dedupes tags', () => {
    assert.deepEqual(cacheNext(CACHE_TAGS.cms, CACHE_TAGS.cms, CACHE_TAGS.news).tags, [
      CACHE_TAGS.cms,
      CACHE_TAGS.news,
    ])
  })
})

describe('isAllowedCmsApiPath', () => {
  it('allows known CMS prefixes only', () => {
    assert.equal(isAllowedCmsApiPath('api/v1/get-all/post?lang=vi'), true)
    assert.equal(isAllowedCmsApiPath('wp/v2/pages/90'), true)
    assert.equal(isAllowedCmsApiPath('rankmath/v1/getHead'), true)
    assert.equal(isAllowedCmsApiPath('../etc/passwd'), false)
    assert.equal(isAllowedCmsApiPath('https://evil.test/x'), false)
  })
})

describe('cacheTagsForApi', () => {
  it('maps api paths to domain tags', () => {
    assert.deepEqual(cacheTagsForApi('api/v1/get-all/post?lang=vi'), [CACHE_TAGS.news])
    assert.deepEqual(cacheTagsForApi('api/v1/get-all/projects?lang=en'), [
      CACHE_TAGS.projects,
      CACHE_TAGS.business,
    ])
    assert.deepEqual(cacheTagsForApi('api/v1/get-all/careers'), [CACHE_TAGS.careers])
  })
})
