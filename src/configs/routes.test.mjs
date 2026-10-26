import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { contactHrefFor, isContactPath } from './routes.ts'

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
