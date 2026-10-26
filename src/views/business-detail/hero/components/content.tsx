'use client'

import { useLenis } from 'lenis/react'
import { useLocale, useTranslations } from 'next-intl'
import type { MouseEvent } from 'react'

import ROUTES from '@/configs/routes'
import { sectionId } from '@/configs/section-ids'
import { Link } from '@/i18n/navigation'
import type { SectorItem } from '@/interfaces/sectors.interface'
import { cn } from '@/lib/utils'
import { scrollToSection } from '@/utils/scrollToSection'

type SectorHeroContentProps = {
  sector: SectorItem
  stacked?: boolean
}

const SectorHeroContent = ({ sector, stacked }: SectorHeroContentProps) => {
  const locale = useLocale()
  const t = useTranslations('BusinessDetail')
  const projectsSectionId = sectionId('businessProjects', locale)
  const lenis = useLenis()
  const title = sector.acf?.banner?.title || sector.name || ''
  const description = sector.acf?.banner?.desc || sector.description || ''

  const handleExploreProjects = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const el = document.getElementById(projectsSectionId)
    if (!el) return

    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const headerPx = (window.matchMedia('(max-width: 639px)').matches ? 4.5 : 5.5) * rem
    const top = el.getBoundingClientRect().top + (lenis?.scroll ?? window.scrollY) - headerPx

    if (lenis) lenis.scrollTo(top, { duration: 1.2 })
    else scrollToSection(projectsSectionId, 0.9, window.innerWidth <= 639 ? 4.5 : 5.5)
  }

  return (
    <div
      className={cn(
        'relative z-[1] w-full',
        stacked ? 'mx-auto max-w-none' : 'mx-auto max-w-[95rem] px-[3.75rem]',
      )}
    >
      {sector.name ? (
        <p
          className={cn(
            'business-hero-rise flex items-center gap-[0.75rem] font-semibold tracking-[0.2em] text-[#B5935E] uppercase',
            stacked ? 'text-[0.6875rem] tracking-[0.14em]' : 'text-[0.8125rem]',
          )}
          style={{ animationDelay: '40ms' }}
        >
          <span className='h-px w-[2.5rem] bg-[#C6A15B] xsm:w-[1.75rem]' />
          {sector.name}
        </p>
      ) : null}

      {title ? (
        <h1
          className={cn(
            'business-hero-rise font-bold text-[#1A2B48] text-pretty',
            stacked
              ? 'mt-[0.75rem] max-w-none text-[1.5rem] leading-[1.3]'
              : 'mt-[1.25rem] max-w-[44rem] text-[3.5rem] leading-[1.2]',
          )}
          style={{ animationDelay: '140ms' }}
        >
          {title}
        </h1>
      ) : null}

      {description ? (
        <p
          className={cn(
            'business-hero-rise text-[#1A2B48]/80 text-pretty',
            stacked
              ? 'mt-[0.875rem] max-w-none text-[0.875rem] leading-[1.6]'
              : 'mt-[1.5rem] max-w-[38rem] text-[1.0625rem] leading-[1.7]',
          )}
          style={{ animationDelay: '240ms' }}
        >
          {description}
        </p>
      ) : null}

      <div
        className={cn(
          'business-hero-rise',
          stacked
            ? 'mt-[1.5rem] flex flex-col gap-[0.75rem]'
            : 'mt-[2.5rem] flex flex-wrap items-center gap-[1rem]',
        )}
        style={{ animationDelay: '340ms' }}
      >
        <a
          href={`#${projectsSectionId}`}
          onClick={handleExploreProjects}
          className={cn(
            'inline-flex items-center justify-center gap-[0.5rem] bg-[#C39A5A] px-[1.5rem] py-[0.875rem] text-[0.8125rem] font-bold tracking-[0.06em] text-white uppercase transition-[background-color,box-shadow] duration-300 hover:bg-[#B08447] hover:shadow-[0_0.5rem_1.25rem_rgba(184,142,79,0.35)]',
            stacked && 'w-full py-[0.95rem]',
          )}
        >
          {t('exploreProjects')}
          <span aria-hidden>→</span>
        </a>
        <Link
          href={ROUTES.contact}
          className={cn(
            'inline-flex items-center justify-center border border-[#1A2B48]/35 px-[1.5rem] py-[0.875rem] text-[0.8125rem] font-bold tracking-[0.06em] text-[#1A2B48] uppercase transition-colors duration-300 hover:border-[#1A2B48] hover:bg-[#1A2B48] hover:text-white',
            stacked && 'w-full py-[0.95rem]',
          )}
        >
          {t('contactCta')}
        </Link>
      </div>
    </div>
  )
}

export default SectorHeroContent
