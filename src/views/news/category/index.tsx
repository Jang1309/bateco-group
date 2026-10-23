import PageHero from '@/components/shared/page-hero'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import ArticleCard from '@/views/news/components/article-card'
import BlockHeader from '@/views/news/components/block-header'
import { getCategoryArticles, getCategoryTitle, NEWS_CATEGORIES } from '@/views/news/data'
import FeaturedArticle from '@/views/news/featured/featured-article'

type NewsCategoryViewProps = {
  categoryId: string
}

// TODO: thêm phân trang khi có dữ liệu thật từ CMS
const NewsCategoryView = ({ categoryId }: NewsCategoryViewProps) => {
  const categoryTitle = getCategoryTitle(categoryId)
  const [featured, ...rest] = getCategoryArticles(categoryId)

  return (
    <main>
      <PageHero
        eyebrow={categoryTitle}
        title='Khám phá'
        highlight='để dẫn đầu'
        description='Tư duy kiến tạo - Năng lực thực thi'
        image='/home/vision/d-img-1.jpg'
      />

      <section className='border-t border-[#EEF1F5] bg-[#FAFBFC] pt-[3.5rem] pb-[6rem] xsm:pt-[2rem] xsm:pb-[3.5rem]'>
        <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
          <nav
            aria-label='Chuyên mục tin tức'
            className='-mx-[1.25rem] flex gap-[0.625rem] overflow-x-auto px-[1.25rem] pb-[0.25rem] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0'
          >
            {NEWS_CATEGORIES.map((category) => {
              const active = category.id === categoryId
              return (
                <Link
                  key={category.id}
                  href={{ pathname: '/tin-tuc/danh-muc/[slug]', params: { slug: category.id } }}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'shrink-0 rounded-full border px-[1.125rem] py-[0.625rem] text-[0.8125rem] font-semibold whitespace-nowrap transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#B5935E] focus-visible:ring-offset-2',
                    active
                      ? 'border-[#1A2B48] bg-[#1A2B48] text-white shadow-[0_0.75rem_1.5rem_-0.75rem_rgba(26,43,72,0.6)]'
                      : 'border-[#E2E8F0] bg-white text-[#1A2B48] hover:border-[#B5935E] hover:text-[#B5935E]',
                  )}
                >
                  {category.title}
                </Link>
              )
            })}
          </nav>

          {featured ? (
            <div
              data-aos='business-rise'
              data-aos-duration='800'
              className='mt-[2.5rem] xsm:mt-[1.5rem]'
            >
              <FeaturedArticle article={featured} />
            </div>
          ) : null}

          {rest.length > 0 ? (
            <div className='mt-[5rem] xsm:mt-[3rem]'>
              <BlockHeader title='Tất cả bài viết' />

              <ul className='mt-[2.25rem] grid grid-cols-3 gap-[2rem] xsm:mt-[1.5rem] xsm:grid-cols-1 xsm:gap-[1.25rem]'>
                {rest.map((article, index) => (
                  <li
                    key={article.id}
                    data-aos='business-rise'
                    data-aos-duration='800'
                    data-aos-delay={(index % 3) * 100}
                    className='flex'
                  >
                    <ArticleCard article={article} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  )
}

export default NewsCategoryView
