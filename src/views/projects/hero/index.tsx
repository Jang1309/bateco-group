'use client'

import { useLenis } from 'lenis/react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import type { MouseEvent } from 'react'

import BannerTopOverlay from '@/components/shared/banner-top-overlay'
import { sectionId } from '@/configs/section-ids'
import type { ProjectsPageBanner } from '@/interfaces/projects.interface'
import { cn } from '@/lib/utils'
import { scrollToSection } from '@/utils/scrollToSection'
import { stripHtml } from '@/views/news/map-post'

const FALLBACK_IMAGE = '/home/investment/d-card-2.png'

type ProjectsHeroProps = {
  data?: ProjectsPageBanner
}

type HeroCopyProps = {
  banner: ProjectsPageBanner
  listingSectionId: string
  exploreLabel: string
  stacked?: boolean
  onExplore: (event: MouseEvent<HTMLAnchorElement>) => void
}

const HeroCopy = ({
  banner,
  listingSectionId,
  exploreLabel,
  stacked,
  onExplore,
}: HeroCopyProps) => (
  <div
    className={cn(stacked ? 'px-[1.25rem]' : 'relative z-[1] mx-auto max-w-[95rem] px-[3.75rem]')}
  >
    <div className={cn(stacked ? 'max-w-none' : 'max-w-[34rem]')}>
      {banner.subtitle ? (
        <p
          className={cn(
            'business-hero-rise flex items-center gap-[0.75rem] font-bold tracking-[0.2em] text-[#B5935E] uppercase',
            stacked ? 'text-[0.6875rem] tracking-[0.14em]' : 'text-[0.75rem]',
          )}
          style={{ animationDelay: '40ms' }}
        >
          <span className={cn('h-px bg-[#C6A15B]', stacked ? 'w-[1.5rem]' : 'w-[2rem]')} />
          {banner.subtitle}
        </p>
      ) : null}

      {banner.title ? (
        <div
          className={cn(
            'business-hero-fade font-bold text-[#1A2B48] [&_br]:block [&_p]:m-0 [&_strong]:mt-[0.25rem] [&_strong]:block [&_strong]:font-normal [&_strong]:text-[#B5935E] [&_strong]:italic',
            stacked
              ? 'mt-[0.75rem] text-[1.75rem] leading-[1.25]'
              : 'mt-[1.25rem] text-[3rem] leading-[1.2]',
          )}
          style={{ animationDelay: '140ms' }}
          dangerouslySetInnerHTML={{ __html: banner.title }}
        />
      ) : null}

      {banner.desc ? (
        <p
          className={cn(
            'business-hero-rise font-medium text-[#1A2B48] text-pretty',
            stacked
              ? 'mt-[0.875rem] text-[0.875rem] leading-[1.6]'
              : 'mt-[1.5rem] max-w-[30rem] text-[1.0625rem] leading-[1.65]',
          )}
          style={{ animationDelay: '240ms' }}
        >
          {banner.desc}
        </p>
      ) : null}

      <div
        className={cn('business-hero-rise', stacked ? 'mt-[1.5rem]' : 'mt-[2rem]')}
        style={{ animationDelay: '340ms' }}
      >
        <a
          href={`#${listingSectionId}`}
          onClick={onExplore}
          className={cn(
            'group inline-flex items-center justify-center gap-[0.625rem] rounded-full bg-[linear-gradient(93deg,#C9A468_0%,#B5935E_55%,#9E7C48_100%)] text-[0.8125rem] font-bold tracking-[0.06em] text-white uppercase shadow-[0_0.5rem_1.25rem_rgba(181,147,94,0.35)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[0.125rem] hover:shadow-[0_0.75rem_1.5rem_rgba(181,147,94,0.45)]',
            stacked ? 'w-full px-[1.5rem] py-[0.95rem]' : 'px-[1.75rem] py-[0.875rem]',
          )}
        >
          {exploreLabel}
          <ArrowRight className='size-[1rem] transition-transform duration-300 group-hover:translate-x-[0.25rem]' />
        </a>
      </div>
    </div>
  </div>
)

const ProjectsHero = ({ data }: ProjectsHeroProps) => {
  const locale = useLocale()
  const t = useTranslations('Projects')
  const listingSectionId = sectionId('projectsListing', locale)
  const lenis = useLenis()
  const fallbackBanner: ProjectsPageBanner = {
    subtitle: t('eyebrow'),
    title: `<p>${t('heroTitle')}</p>`,
    desc: t('heroDesc'),
    desktop: FALLBACK_IMAGE,
  }
  const banner = data?.title || data?.subtitle ? data : fallbackBanner
  const desktop = banner.desktop || FALLBACK_IMAGE
  const mobile = typeof banner.mobile === 'string' && banner.mobile ? banner.mobile : desktop
  const srTitle = stripHtml(banner.title) || banner.subtitle || t('heroTitle')

  const handleExplore = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const el = document.getElementById(listingSectionId)
    if (!el) return

    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const headerPx = (window.matchMedia('(max-width: 639px)').matches ? 4.5 : 5.5) * rem
    const top = el.getBoundingClientRect().top + (lenis?.scroll ?? window.scrollY) - headerPx

    if (lenis) lenis.scrollTo(top, { duration: 1.2 })
    else scrollToSection(listingSectionId, 0.9, window.innerWidth <= 639 ? 4.5 : 5.5)
  }

  return (
    <section className='relative overflow-hidden bg-white'>
      <h1 className='sr-only'>{srTitle}</h1>
      {/* Desktop: chữ trái + ảnh phải */}
      <div className='relative overflow-hidden pt-[9.5rem] pb-[6rem] xsm:hidden'>
        <div className='absolute inset-y-0 right-0 w-[70%]'>
          <Image
            src={desktop}
            alt=''
            fill
            priority
            sizes='70vw'
            quality={75}
            className='object-cover object-center'
          />
          <div
            aria-hidden
            className='absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.85)_20%,rgba(255,255,255,0)_55%)]'
          />
        </div>
        <BannerTopOverlay />
        <HeroCopy
          banner={banner}
          listingSectionId={listingSectionId}
          exploreLabel={t('explore')}
          onExplore={handleExplore}
        />
      </div>

      {/* Mobile: ảnh full → chữ + CTA trên nền trắng */}
      <div className='relative hidden xsm:block'>
        <BannerTopOverlay />
        <div className='relative aspect-[4/3] w-full overflow-hidden'>
          <Image
            src={mobile}
            alt=''
            fill
            priority
            sizes='100vw'
            quality={75}
            className='object-cover object-center'
          />
          <div
            aria-hidden
            className='pointer-events-none absolute inset-x-0 bottom-0 h-[3.5rem] bg-[linear-gradient(180deg,transparent_0%,#fff_100%)]'
          />
        </div>
        <div className='pt-[0.25rem] pb-[2.5rem]'>
          <HeroCopy
            banner={banner}
            listingSectionId={listingSectionId}
            exploreLabel={t('explore')}
            stacked
            onExplore={handleExplore}
          />
        </div>
      </div>
    </section>
  )
}

export default ProjectsHero
