import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { decodeHtmlEntities } from './decodeHtmlEntities.ts'

describe('decodeHtmlEntities', () => {
  it('decodes ampersand entities from cms titles', () => {
    assert.equal(decodeHtmlEntities('Văn hóa &amp; Con người BATECO'), 'Văn hóa & Con người BATECO')
    assert.equal(decodeHtmlEntities('Giải thưởng &amp; Danh hiệu'), 'Giải thưởng & Danh hiệu')
  })

  it('returns empty string for missing input', () => {
    assert.equal(decodeHtmlEntities(), '')
    assert.equal(decodeHtmlEntities(undefined), '')
  })
})
