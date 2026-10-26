import type { CareersDetailItem, CareersListItem } from '@/interfaces/careers.interface'

const FALLBACK_IMAGE = '/home/vision/d-img-2.jpg'

export type CareerCardModel = {
  id: string
  slug: string
  title: string
  type: string
  department: string
  departmentSlug?: string
  location: string
  locationSlug?: string
  salary: string
  education: string
  deadline?: string
  image: string
}

export type CareerDetailModel = CareerCardModel & {
  content: string
  excerpt: string
}

const resolveImage = (item?: CareersListItem | CareersDetailItem | null) =>
  item?.acf?.featured_image || item?.thumbnail?.url || FALLBACK_IMAGE

export const mapCareerListItem = (item?: CareersListItem | null): CareerCardModel | null => {
  if (!item?.slug && !item?.id) return null

  const info = item.acf?.infomation
  const slug = item.slug || String(item.id)

  return {
    id: slug,
    slug,
    title: item.title || '',
    type: info?.work_arrangement || '',
    department: item.taxonomies?.departments?.[0]?.name || '',
    departmentSlug: item.taxonomies?.departments?.[0]?.slug || undefined,
    location: item.taxonomies?.locations?.[0]?.name || '',
    locationSlug: item.taxonomies?.locations?.[0]?.slug || undefined,
    salary: info?.salary || '',
    education: info?.education || '',
    deadline: info?.application_deadline || undefined,
    image: resolveImage(item),
  }
}

export const mapCareerDetail = (item?: CareersDetailItem | null): CareerDetailModel | null => {
  const base = mapCareerListItem(item)
  if (!base) return null

  return {
    ...base,
    content: item?.content || item?.post_content || '',
    excerpt: item?.post_excerpt || item?.excerpt || '',
  }
}
