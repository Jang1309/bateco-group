import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'

import DetailHero from '@/components/shared/detail-hero'
import { Link } from '@/i18n/navigation'
import ArticleCard from '@/views/news/components/article-card'
import BlockHeader from '@/views/news/components/block-header'
import { getCategoryArticles, getCategoryTitle, type NewsArticleDetail } from '@/views/news/data'
import RelatedSlider from '@/views/news/detail/related-slider'
import ShareActions from '@/views/news/detail/share-actions'

type NewsDetailViewProps = {
  article: NewsArticleDetail
}

const NewsDetailView = ({ article }: NewsDetailViewProps) => {
  const categoryTitle = getCategoryTitle(article.category)
  const categoryHref = {
    pathname: '/tin-tuc/danh-muc/[slug]' as const,
    params: { slug: article.category },
  }
  const related = getCategoryArticles(article.category).filter((item) => item.id !== article.id)

  return (
    <main>
      <DetailHero
        image={article.image}
        eyebrow={categoryTitle}
        title={article.title}
        meta={<time className='font-medium text-[#475569] tabular-nums'>{article.date}</time>}
      />

      <article className='bg-white pt-[4.5rem] pb-[5rem] xsm:pt-[2rem] xsm:pb-[3rem]'>
        <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
          <div className='grid grid-cols-[minmax(0,54rem)_24rem] justify-between gap-[5rem] xlg:grid-cols-1 xlg:gap-[3rem]'>
            <div>
              <p className='text-[1.1875rem] leading-[1.75] font-medium text-pretty text-[#1A2B48] xsm:text-[1.0625rem]'>
                {article.excerpt}
              </p>
              {/* content là HTML từ CMS nội bộ (nguồn tin cậy) */}
              <div
                className='news-content mt-[1.5rem]'
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              <div className='mt-[3.5rem] flex items-center justify-between gap-[1rem] border-t border-[#E2E8F0] pt-[1.5rem] xsm:flex-col xsm:items-start xsm:gap-[1.25rem]'>
                <Link
                  href={categoryHref}
                  className='group inline-flex items-center gap-[0.5rem] text-[0.875rem] font-bold text-[#1A2B48] transition-colors duration-300 hover:text-[#B5935E]'
                >
                  <ArrowLeft className='size-[1rem] transition-transform duration-300 group-hover:-translate-x-[0.1875rem]' />
                  Quay lại {categoryTitle}
                </Link>
                <ShareActions />
              </div>
            </div>

            {related.length > 0 ? (
              <aside className='self-start lg:sticky lg:top-[7rem] xlg:hidden'>
                <BlockHeader title='Cùng chuyên mục' />
                <ul>
                  {related.slice(0, 4).map((item) => (
                    <li
                      key={item.id}
                      className='border-b border-[#EEF1F5]'
                    >
                      <Link
                        href={{ pathname: '/tin-tuc/[slug]', params: { slug: item.id } }}
                        className='group flex gap-[1rem] py-[1.125rem] outline-none focus-visible:ring-2 focus-visible:ring-[#B5935E] focus-visible:ring-inset'
                      >
                        <div className='relative aspect-square w-[5rem] shrink-0 overflow-hidden rounded-[0.5rem]'>
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes='5rem'
                            className='object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]'
                          />
                        </div>
                        <div className='flex min-w-0 flex-col'>
                          <time className='text-[0.6875rem] font-semibold text-[#94A3B8] tabular-nums'>
                            {item.date}
                          </time>
                          <h3 className='mt-[0.25rem] line-clamp-3 text-[0.875rem] leading-[1.45] font-bold text-pretty text-[#1A2B48] transition-colors duration-300 group-hover:text-[#B5935E]'>
                            {item.title}
                          </h3>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className='border-t border-[#EEF1F5] bg-[#FAFBFC] py-[5rem] xsm:py-[3rem]'>
          <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
            <BlockHeader
              title='Tin liên quan'
              href={categoryHref}
            />
            {related.length > 3 ? (
              <RelatedSlider articles={related} />
            ) : (
              <ul className='mt-[2.25rem] grid grid-cols-3 gap-[2rem] xsm:mt-[1.5rem] xsm:grid-cols-1 xsm:gap-[1.25rem]'>
                {related.map((item, index) => (
                  <li
                    key={item.id}
                    data-aos='business-rise'
                    data-aos-duration='800'
                    data-aos-delay={index * 100}
                    className='flex'
                  >
                    <ArticleCard article={item} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ) : null}
    </main>
  )
}

export default NewsDetailView
