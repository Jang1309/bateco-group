import type { ComponentProps } from 'react'

import { hrefFor } from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import type { SectorItem } from '@/interfaces/sectors.interface'

/** Fallback khi acf.banner.image trống */
export const SECTOR_FALLBACK_IMAGES = [
  '/home/investment/d-card-1.png',
  '/home/investment/d-card-2.png',
  '/home/investment/d-card-3.png',
  '/home/investment/d-card-4.png',
  '/home/investment/d-card-5.png',
] as const

export type InvestmentItem = {
  label: string
  title: [string, string]
  description: string
  image: string
  href: ComponentProps<typeof Link>['href']
}

const splitTitle = (name?: string): [string, string] => {
  const words = (name || '').trim().split(/\s+/).filter(Boolean)
  if (words.length <= 1) return [name || '', '']
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
}

export const mapSectors = (sectors?: SectorItem[], locale: string = 'vi'): InvestmentItem[] => {
  const items: InvestmentItem[] = []

  ;(sectors || []).forEach((sector: SectorItem, index) => {
    const slug = sector.slug
    if (!sector.name && !slug) return

    items.push({
      label: sector.name || '',
      title: splitTitle(sector.name),
      description: sector.description || sector.acf?.banner?.desc || '',
      image:
        sector.acf?.banner?.image || SECTOR_FALLBACK_IMAGES[index % SECTOR_FALLBACK_IMAGES.length],
      href: (slug
        ? hrefFor('businessDetail', locale, { slug })
        : hrefFor('business', locale)) as ComponentProps<typeof Link>['href'],
    })
  })

  return items
}
