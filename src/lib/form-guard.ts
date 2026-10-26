/** Honeypot field name — bots fill it; humans never see it. */
export const HONEYPOT_FIELD = 'company_url'

export function isHoneypotTriggered(value: unknown): boolean {
  if (value == null) return false
  return String(value).trim().length > 0
}

/**
 * Soft origin/referer check. Missing headers (same-origin FormData from some
 * browsers) are allowed; mismatched host is rejected.
 *
 * @param domain Absolute site URL, e.g. https://bateco-investment.vn
 */
export function isAllowedFormOrigin(request: Request, domain?: string): boolean {
  if (!domain) return true

  let allowedHost: string
  try {
    allowedHost = new URL(domain).host
  } catch {
    return true
  }

  const origin = request.headers.get('origin')
  if (origin) {
    try {
      return new URL(origin).host === allowedHost
    } catch {
      return false
    }
  }

  const referer = request.headers.get('referer')
  if (referer) {
    try {
      return new URL(referer).host === allowedHost
    } catch {
      return false
    }
  }

  // No Origin/Referer — allow (common for same-origin multipart in some browsers)
  return true
}
