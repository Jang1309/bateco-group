import type { ProjectSort } from '@/views/projects/data'

export type ProjectQuery = {
  sector?: string
  q?: string
  sort?: ProjectSort
  page?: number
}

/** Dựng query string cho /du-an, bỏ các giá trị mặc định để URL gọn */
export function buildProjectQuery({ sector, q, sort, page }: ProjectQuery) {
  const query: Record<string, string> = {}
  if (sector) query['linh-vuc'] = sector
  if (q?.trim()) query.q = q.trim()
  if (sort && sort !== 'moi-nhat') query['sap-xep'] = sort
  if (page && page > 1) query.trang = String(page)
  return query
}
