import { parseAsInteger, parseAsString, parseAsStringLiteral } from 'nuqs'

export const PROJECT_SORT_VALUES = ['moi-nhat', 'cu-nhat'] as const
export type ProjectSort = (typeof PROJECT_SORT_VALUES)[number]

/** Query URL: ?linh-vuc=&q=&sap-xep=cu-nhat&trang=2 */
export const projectsSearchParams = {
  'linh-vuc': parseAsString,
  q: parseAsString,
  'sap-xep': parseAsStringLiteral(PROJECT_SORT_VALUES).withDefault('moi-nhat').withOptions({
    clearOnDefault: true,
  }),
  trang: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
}
