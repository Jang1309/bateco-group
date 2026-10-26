type Bucket = {
  timestamps: number[]
}

const buckets = new Map<string, Bucket>()

export type RateLimitResult = {
  ok: boolean
  remaining: number
  retryAfterSec: number
}

/**
 * In-memory sliding-window rate limit (per process).
 * Fine for a single Node/IIS worker; not shared across multiple instances.
 */
export function rateLimit(
  key: string,
  {
    limit,
    windowMs,
    now = Date.now(),
  }: {
    limit: number
    windowMs: number
    now?: number
  },
): RateLimitResult {
  const cutoff = now - windowMs
  const bucket = buckets.get(key) ?? { timestamps: [] }
  const recent = bucket.timestamps.filter((ts) => ts > cutoff)

  if (recent.length >= limit) {
    buckets.set(key, { timestamps: recent })
    const oldest = recent[0] ?? now
    const retryAfterSec = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000))
    return { ok: false, remaining: 0, retryAfterSec }
  }

  recent.push(now)
  buckets.set(key, { timestamps: recent })
  return { ok: true, remaining: Math.max(0, limit - recent.length), retryAfterSec: 0 }
}

/** Test helper — clears all buckets. */
export function resetRateLimitStore() {
  buckets.clear()
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  const realIp = request.headers.get('x-real-ip')?.trim()
  if (realIp) return realIp
  return 'unknown'
}
