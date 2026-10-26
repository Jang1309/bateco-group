import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { getClientIp, rateLimit, resetRateLimitStore } from './rate-limit.ts'

describe('rateLimit', () => {
  it('allows up to limit then blocks within window', () => {
    resetRateLimitStore()
    const opts = { limit: 2, windowMs: 60_000, now: 1_000 }

    assert.equal(rateLimit('ip:a', opts).ok, true)
    assert.equal(rateLimit('ip:a', { ...opts, now: 1_100 }).ok, true)
    const blocked = rateLimit('ip:a', { ...opts, now: 1_200 })
    assert.equal(blocked.ok, false)
    assert.equal(blocked.remaining, 0)
    assert.ok(blocked.retryAfterSec >= 1)
  })

  it('resets after window slides past', () => {
    resetRateLimitStore()
    assert.equal(rateLimit('ip:b', { limit: 1, windowMs: 1_000, now: 0 }).ok, true)
    assert.equal(rateLimit('ip:b', { limit: 1, windowMs: 1_000, now: 500 }).ok, false)
    assert.equal(rateLimit('ip:b', { limit: 1, windowMs: 1_000, now: 1_001 }).ok, true)
  })

  it('isolates keys', () => {
    resetRateLimitStore()
    assert.equal(rateLimit('ip:1', { limit: 1, windowMs: 10_000, now: 0 }).ok, true)
    assert.equal(rateLimit('ip:2', { limit: 1, windowMs: 10_000, now: 0 }).ok, true)
  })
})

describe('getClientIp', () => {
  it('prefers first x-forwarded-for hop', () => {
    const req = new Request('http://localhost/api', {
      headers: {
        'x-forwarded-for': '1.2.3.4, 10.0.0.1',
        'x-real-ip': '9.9.9.9',
      },
    })
    assert.equal(getClientIp(req), '1.2.3.4')
  })

  it('falls back to x-real-ip then unknown', () => {
    assert.equal(
      getClientIp(new Request('http://localhost/api', { headers: { 'x-real-ip': '8.8.8.8' } })),
      '8.8.8.8',
    )
    assert.equal(getClientIp(new Request('http://localhost/api')), 'unknown')
  })
})
