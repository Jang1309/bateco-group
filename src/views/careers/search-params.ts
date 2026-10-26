import { parseAsInteger, parseAsString } from 'nuqs'

/** Query URL: ?phong-ban=&dia-diem=&q=&trang=2 */
export const careersSearchParams = {
  'phong-ban': parseAsString,
  'dia-diem': parseAsString,
  q: parseAsString,
  trang: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
}
