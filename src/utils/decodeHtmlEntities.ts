/** Decode common HTML entities from CMS strings (WP often returns `&amp;`). */
export function decodeHtmlEntities(value?: string): string {
  return (
    value
      ?.replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code))) || ''
  )
}
