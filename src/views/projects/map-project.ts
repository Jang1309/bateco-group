import type { ProjectListItem } from '@/interfaces/projects.interface'

const FALLBACK_IMAGE = '/home/investment/d-card-1.png'

export type ProjectCardModel = {
  id: string
  slug: string
  title: string
  sectorSlug?: string
  sectorLabel: string
  image: string
  date?: string
}

export const mapProjectListItem = (item: ProjectListItem): ProjectCardModel | null => {
  const slug = item.slug
  if (!slug && !item.id) return null

  const sector = item.taxonomies?.sectors?.[0]

  return {
    id: String(item.id ?? slug),
    slug: slug || String(item.id),
    title: item.title || '',
    sectorSlug: sector?.slug,
    sectorLabel: sector?.name || '',
    image: item.thumbnail?.url || FALLBACK_IMAGE,
    date: item.published,
  }
}
