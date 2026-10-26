import { parseAsInteger, parseAsString } from 'nuqs'

/** Query URL: ?danh-muc=slug&trang=2 — trang=1 bị clear khỏi URL */
export const investorRelationsSearchParams = {
  'danh-muc': parseAsString,
  trang: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
}
