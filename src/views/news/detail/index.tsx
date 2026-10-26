import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'

import DetailHero from '@/components/shared/detail-hero'
import SectionHeading from '@/components/shared/section-heading'
import { contactHrefFor, pathFor } from '@/configs/routes'
import { Link, toAppHref } from '@/i18n/navigation'
import type { Contact } from '@/interfaces/siteSetting.interface'
import { resolveCategoryTitle, type NewsArticle, type NewsArticleDetail } from '@/views/news/data'
import RelatedSlider from '@/views/news/detail/related-slider'
import ShareActions from '@/views/news/detail/share-actions'

import '@/views/projects/detail/styles/styles.css'

type NewsDetailViewProps = {
  article: NewsArticleDetail
  related?: NewsArticle[]
  contact?: Contact
}

const NewsDetailView = async ({ article, related = [], contact }: NewsDetailViewProps) => {
  const locale = await getLocale()
  const t = await getTranslations('News')
  const tc = await getTranslations('Common')
  const categoryTitle = resolveCategoryTitle(article)
  const categoryHref = toAppHref(
    article.category
      ? `${pathFor('newsCategory', locale)}?danh-muc=${encodeURIComponent(article.category)}`
      : pathFor('newsCategory', locale),
  )

  const contacts = contact?.contacts?.filter((item) => item.link?.title) ?? []
  const buttonHref = toAppHref(contactHrefFor(locale, contact?.button?.url))
  const others = related.filter((item) => item.id !== article.id).slice(0, 6)

  return (
    <main>
      <DetailHero
        image={article.image}
        eyebrow={categoryTitle || t('eyebrow')}
        title={article.title}
        description={article.excerpt || undefined}
        meta={
          article.date ? (
            <time className='font-medium text-[#475569] tabular-nums'>{article.date}</time>
          ) : undefined
        }
      />

      <article className='project-detail-content'>
        <div className='project-detail-content__inner !grid !max-w-[95rem] grid-cols-[minmax(0,54rem)_22rem] justify-center gap-[4rem] !px-[3.75rem] xlg:grid-cols-1 xlg:gap-[2rem] xsm:!px-[1rem]'>
          <div className='project-detail-content__article-wrap w-full'>
            <div className='project-detail-content__article'>
              {article.content ? (
                <div
                  id='news_detail'
                  className='news-content'
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              ) : (
                <p className='text-[0.9375rem] text-[#64748B]'>{tc('contentUpdating')}</p>
              )}

              <div className='mt-[3.5rem] flex items-center justify-between gap-[1rem] border-t border-[#E2E8F0] pt-[1.5rem] xsm:flex-col xsm:items-start xsm:gap-[1.25rem]'>
                <Link
                  href={categoryHref}
                  className='group inline-flex items-center gap-[0.5rem] text-[0.875rem] font-bold text-[#1A2B48] transition-colors duration-300 hover:text-[#B5935E]'
                >
                  <ArrowLeft className='size-[1rem] transition-transform duration-300 group-hover:-translate-x-[0.1875rem]' />
                  {categoryTitle ? `${tc('back')} ${categoryTitle}` : t('backToList')}
                </Link>
                <ShareActions />
              </div>
            </div>
          </div>

          <aside className='self-start lg:sticky lg:top-[7rem]'>
            <div className='overflow-hidden rounded-[1rem] bg-[#1A2B48] text-white xsm:rounded-[0.75rem]'>
              <div className='relative aspect-[16/9]'>
                <Image
                  src={article.image}
                  alt=''
                  fill
                  unoptimized
                  sizes='22rem'
                  className='object-cover'
                />
                <div
                  aria-hidden
                  className='absolute inset-0 bg-[linear-gradient(180deg,rgba(26,43,72,0)_40%,#1A2B48_100%)]'
                />
              </div>

              <div className='px-[1.75rem] pb-[1.75rem] xsm:px-[1.25rem] xsm:pb-[1.25rem]'>
                {contact?.eyebrow ? (
                  <p className='text-[0.6875rem] font-bold tracking-[0.16em] text-[#DFBA73] uppercase'>
                    {contact.eyebrow}
                  </p>
                ) : null}
                {contact?.title ? (
                  <div
                    className='mt-[0.5rem] text-[1.25rem] leading-[1.35] font-bold [&_br]:hidden [&_p]:m-0 [&_strong]:text-[#DFBA73]'
                    dangerouslySetInnerHTML={{ __html: contact.title }}
                  />
                ) : null}
                {contact?.desc ? (
                  <p className='mt-[0.625rem] text-[0.875rem] leading-[1.6] text-white/65'>
                    {contact.desc}
                  </p>
                ) : null}

                {contacts.length > 0 ? (
                  <ul className='mt-[1.5rem] flex flex-col gap-[0.875rem] border-t border-white/10 pt-[1.25rem]'>
                    {contacts.map((item, index) => {
                      const isMail = item.link?.url?.startsWith('mailto:')

                      return (
                        <li key={item.link?.url || index}>
                          <a
                            href={item.link?.url || '#'}
                            className='group block'
                          >
                            <span className='block text-[0.6875rem] font-bold tracking-[0.16em] text-white/50 uppercase'>
                              {isMail ? 'Email' : 'Hotline'}
                            </span>
                            <span
                              className={
                                isMail
                                  ? 'mt-[0.125rem] block truncate text-[0.9375rem] font-semibold transition-colors duration-300 group-hover:text-[#DFBA73]'
                                  : 'mt-[0.125rem] block text-[1.5rem] leading-tight font-bold tabular-nums transition-colors duration-300 group-hover:text-[#DFBA73]'
                              }
                            >
                              {item.link?.title}
                            </span>
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                ) : null}

                <Link
                  href={buttonHref}
                  target={contact?.button?.target || undefined}
                  className='group mt-[1.5rem] flex items-center justify-between rounded-[0.5rem] bg-white py-[0.375rem] pr-[0.375rem] pl-[1.25rem] text-[0.875rem] font-semibold text-[#1A2B48] transition-colors duration-300 hover:bg-[#DFBA73]'
                >
                  {contact?.button?.title || t('contactCta')}
                  <span className='flex size-[2.25rem] items-center justify-center rounded-[0.375rem] bg-[#1A2B48] text-white'>
                    <ArrowRight className='size-[1rem] transition-transform duration-300 group-hover:translate-x-[0.125rem]' />
                  </span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {others.length > 0 ? (
        <section className='border-t border-[#EEF1F5] bg-[#FAFBFC] py-[5rem] xsm:py-[3rem]'>
          <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
            <SectionHeading title={t('related')} />
            <RelatedSlider articles={others} />
          </div>
        </section>
      ) : null}
    </main>
  )
}

export default NewsDetailView
