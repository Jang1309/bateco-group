import { ArrowRight } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'

import DetailHero from '@/components/shared/detail-hero'
import { pathFor } from '@/configs/routes'
import { Link } from '@/i18n/navigation'

const HERO_IMAGE = '/home/d-banner.png'

type PolicySection = {
  id: string
  title: string
  paragraphs?: string[]
  items?: string[]
}

const PrivacyPolicyView = async () => {
  const locale = await getLocale()
  const t = await getTranslations('Privacy')
  const sections = t.raw('sections') as PolicySection[]

  return (
    <main>
      <DetailHero
        image={HERO_IMAGE}
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('intro')}
        meta={<span className='font-medium text-[#475569]'>{t('updated')}</span>}
      />

      <section className='bg-white pb-[6rem] xsm:pb-[3.5rem]'>
        <div className='mx-auto grid max-w-[95rem] grid-cols-[16rem_minmax(0,52rem)] gap-[6rem] px-[3.75rem] xlg:grid-cols-1 xlg:gap-[2rem] xsm:px-[1.25rem]'>
          {/* Mục lục: dính khi cuộn trên desktop, thành khối gọn trên mobile */}
          <nav
            aria-label={t('tocLabel')}
            className='self-start lg:sticky lg:top-[7rem]'
          >
            <p className='text-[0.6875rem] font-bold tracking-[0.16em] text-[#B5935E] uppercase'>
              {t('tocLabel')}
            </p>
            <ol className='mt-[1rem] border-l border-[#E2E8F0] xlg:rounded-[0.875rem] xlg:border-l-0 xlg:bg-[#F3F5F8] xlg:p-[1rem]'>
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className='-ml-px flex gap-[0.75rem] border-l-2 border-transparent py-[0.5rem] pl-[1rem] text-[0.875rem] leading-[1.45] text-[#64748B] transition-colors duration-300 hover:border-[#B5935E] hover:text-[#1A2B48] xlg:ml-0 xlg:border-l-0 xlg:pl-0'
                  >
                    <span className='w-[1.25rem] shrink-0 font-bold text-[#1A2B48]/40 tabular-nums'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div>
            {sections.map((section, index) => (
              <article
                key={section.id}
                id={section.id}
                className='scroll-mt-[7rem] border-t border-[#E2E8F0] py-[2.5rem] first:border-t-0 first:pt-0 xsm:py-[2rem]'
              >
                <h2 className='flex items-baseline gap-[1rem] text-[1.5rem] leading-[1.3] font-bold tracking-[-0.01em] text-[#1A2B48] xsm:text-[1.25rem]'>
                  <span className='text-[0.875rem] font-bold text-[#B5935E] tabular-nums'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {section.title}
                </h2>
                <div className='mt-[1.125rem] space-y-[0.875rem] text-[0.9375rem] leading-[1.75] text-pretty text-[#475569]'>
                  {section.paragraphs?.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                  {section.items?.length ? (
                    <ul className='space-y-[0.625rem]'>
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className='flex gap-[0.75rem]'
                        >
                          <span
                            aria-hidden
                            className='mt-[0.6875rem] size-[0.375rem] shrink-0 rotate-45 bg-[#B5935E]'
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}

            <aside className='mt-[1rem] flex items-center justify-between gap-[1.5rem] rounded-[1rem] bg-[#1A2B48] p-[2rem] text-white xsm:flex-col xsm:items-start xsm:p-[1.5rem]'>
              <div>
                <p className='text-[1.125rem] font-bold'>{t('ctaTitle')}</p>
                <p className='mt-[0.375rem] text-[0.875rem] leading-[1.6] text-white/65'>
                  {t('ctaDesc')}
                </p>
              </div>
              <Link
                href={pathFor('contact', locale)}
                className='group inline-flex shrink-0 items-center gap-[0.5rem] rounded-full bg-[#DFBA73] px-[1.25rem] py-[0.75rem] text-[0.875rem] font-bold text-[#1A2B48] transition-colors duration-300 hover:bg-white'
              >
                {t('ctaButton')}
                <ArrowRight className='size-[1rem] transition-transform duration-300 group-hover:translate-x-[0.1875rem]' />
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}

export default PrivacyPolicyView
