import { parseAsInteger, parseAsString } from 'nuqs'

/** Query URL: ?danh-muc=tin-nong&trang=2 */
export const newsSearchParams = {
  'danh-muc': parseAsString,
  trang: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
}
