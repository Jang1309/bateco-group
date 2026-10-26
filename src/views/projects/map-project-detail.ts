import type {
  ProjectDetailAcf,
  ProjectDetailImage,
  ProjectDetailItem,
  ProjectDetailSpec,
} from '@/interfaces/projects.interface'

const FALLBACK_IMAGE = '/home/investment/d-card-1.png'

const stripHtml = (value?: string) =>
  value
    ?.replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || ''

const resolveImageUrl = (value?: string | ProjectDetailImage | false | null) => {
  if (!value) return undefined
  if (typeof value === 'string' && value.length > 0) return value
  if (typeof value === 'object' && typeof value.url === 'string' && value.url.length > 0) {
    return value.url
  }
  return undefined
}

const resolveGallery = (acf?: ProjectDetailAcf | null): string[] => {
  if (!acf?.gallery || !Array.isArray(acf.gallery)) return []
  return acf.gallery
    .map((item) => resolveImageUrl(item))
    .filter((url): url is string => Boolean(url))
}

/** Lấy ảnh trong HTML content làm gallery fallback khi ACF gallery trống */
const extractImagesFromHtml = (html?: string): string[] => {
  if (!html) return []
  const urls: string[] = []
  const re = /<img[^>]+src=["']([^"']+)["']/gi
  let match: RegExpExecArray | null
  while ((match = re.exec(html)) !== null) {
    if (match[1] && !urls.includes(match[1])) urls.push(match[1])
  }
  return urls
}

const resolveSpecs = (acf?: ProjectDetailAcf | null): { label: string; value: string }[] => {
  if (!acf?.specs || !Array.isArray(acf.specs)) return []
  return acf.specs
    .map((item: ProjectDetailSpec) => ({
      label: item.label?.trim() || '',
      value: item.value?.trim() || '',
    }))
    .filter((item) => item.label && item.value)
}

export type ProjectDetailModel = {
  id: string
  slug: string
  title: string
  image: string
  date?: string
  sectorSlug?: string
  sectorLabel: string
  summary: string
  location?: string
  content: string
  specs: { label: string; value: string }[]
  gallery: string[]
}

export const mapProjectDetail = (item?: ProjectDetailItem | null): ProjectDetailModel | null => {
  if (!item?.slug && !item?.id) return null

  const sector = item.taxonomies?.sectors?.[0]
  const content = item.content || item.post_content || ''
  const acfGallery = resolveGallery(item.acf)
  const gallery = acfGallery.length > 0 ? acfGallery : extractImagesFromHtml(content)

  const image =
    resolveImageUrl(item.acf?.featured_image) || item.thumbnail?.url || gallery[0] || FALLBACK_IMAGE

  const summary = stripHtml(item.excerpt || item.post_excerpt)

  const specs = resolveSpecs(item.acf)
  const location = item.acf?.location?.trim() || undefined

  // Meta phụ khi CMS chưa có specs ACF
  if (specs.length === 0) {
    if (sector?.name) specs.push({ label: 'Lĩnh vực', value: sector.name })
    if (location) specs.push({ label: 'Địa điểm', value: location })
    if (item.published) {
      const [y, m, d] = item.published.split('-')
      specs.push({
        label: 'Ngày đăng',
        value: y && m && d ? `${d}/${m}/${y}` : item.published,
      })
    }
  }

  return {
    id: String(item.id ?? item.slug),
    slug: item.slug || String(item.id),
    title: item.title || '',
    image,
    date: item.published,
    sectorSlug: sector?.slug,
    sectorLabel: sector?.name || '',
    summary,
    location,
    content,
    specs,
    gallery,
  }
}
