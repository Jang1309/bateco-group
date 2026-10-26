import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { HONEYPOT_FIELD, isAllowedFormOrigin, isHoneypotTriggered } from './form-guard.ts'

const DOMAIN = 'http://localhost:3000'

describe('isHoneypotTriggered', () => {
  it('triggers only when filled', () => {
    assert.equal(isHoneypotTriggered(''), false)
    assert.equal(isHoneypotTriggered('   '), false)
    assert.equal(isHoneypotTriggered(null), false)
    assert.equal(isHoneypotTriggered('http://spam.test'), true)
    assert.equal(HONEYPOT_FIELD, 'company_url')
  })
})

describe('isAllowedFormOrigin', () => {
  it('accepts matching origin host', () => {
    const req = new Request('http://localhost:3000/api/careers/apply', {
      headers: { origin: 'http://localhost:3000' },
    })
    assert.equal(isAllowedFormOrigin(req, DOMAIN), true)
  })

  it('rejects mismatched origin', () => {
    const req = new Request('http://localhost:3000/api/careers/apply', {
      headers: { origin: 'https://evil.test' },
    })
    assert.equal(isAllowedFormOrigin(req, DOMAIN), false)
  })

  it('allows missing origin/referer', () => {
    assert.equal(
      isAllowedFormOrigin(new Request('http://localhost:3000/api/careers/apply'), DOMAIN),
      true,
    )
  })

  it('allows all when domain is empty', () => {
    const req = new Request('http://localhost:3000/api/careers/apply', {
      headers: { origin: 'https://evil.test' },
    })
    assert.equal(isAllowedFormOrigin(req), true)
  })
})
