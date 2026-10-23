import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

import { Link } from '@/i18n/navigation'
import { getCategoryTitle, type NewsArticle } from '@/views/news/data'

type FeaturedArticleProps = {
  article: NewsArticle
}

const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  return (
    <article className='group relative isolate grid grid-cols-[1.35fr_1fr] overflow-hidden rounded-[1.25rem] bg-white shadow-[0_2rem_4rem_-2rem_rgba(26,43,72,0.25)] ring-1 ring-[#1A2B48]/[0.06] xsm:grid-cols-1 xsm:rounded-[0.875rem]'>
      <span
        aria-hidden
        className='pointer-events-none absolute -top-[6rem] -right-[6rem] -z-10 size-[18rem] rounded-full bg-[radial-gradient(circle,rgba(223,186,115,0.16),transparent_70%)]'
      />
      {/* Ảnh phủ kín chiều cao card, không còn khoảng trắng dưới ảnh */}
      <div className='relative min-h-[30rem] overflow-hidden xsm:aspect-[4/3] xsm:min-h-0'>
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes='(max-width: 639px) 100vw, 57vw'
          className='object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]'
        />
        <span
          aria-hidden
          className='absolute inset-0 bg-[linear-gradient(200deg,transparent_55%,rgba(15,28,51,0.55)_100%)]'
        />
        <span className='absolute bottom-[1.5rem] left-[1.5rem] rounded-[0.25rem] bg-[#B5935E] px-[0.75rem] py-[0.375rem] text-[0.6875rem] font-bold tracking-[0.14em] text-white uppercase xsm:bottom-[1rem] xsm:left-[1rem]'>
          Tiêu điểm
        </span>
      </div>

      <div className='flex flex-col p-[3rem] xsm:p-[1.25rem]'>
        <p className='flex flex-wrap items-center gap-x-[0.75rem] gap-y-[0.25rem] text-[0.75rem]'>
          <span className='font-bold tracking-[0.12em] text-[#B5935E] uppercase'>
            {getCategoryTitle(article.category)}
          </span>
          <span className='h-[0.75rem] w-px bg-[#CBD2DC]' />
          <time className='font-medium text-[#94A3B8] tabular-nums'>{article.date}</time>
        </p>

        <h3 className='mt-[1.25rem] text-[1.75rem] leading-[1.3] font-bold tracking-[-0.015em] text-balance text-[#1A2B48] xsm:mt-[0.875rem] xsm:text-[1.25rem]'>
          <Link
            href={{ pathname: '/tin-tuc/[slug]', params: { slug: article.id } }}
            className='rounded-[0.25rem] outline-none transition-colors duration-300 after:absolute after:inset-0 hover:text-[#B5935E] focus-visible:ring-2 focus-visible:ring-[#B5935E] focus-visible:ring-offset-4'
          >
            {article.title}
          </Link>
        </h3>

        <p className='mt-[1rem] line-clamp-3 text-[0.9375rem] leading-[1.75] text-pretty text-[#64748B] xsm:text-[0.875rem]'>
          {article.excerpt}
        </p>

        <div className='mt-auto flex items-center justify-between gap-[1rem] border-t border-[#EEF1F5] pt-[1.5rem] xsm:mt-[1.5rem] xsm:pt-[1rem]'>
          <span className='text-[0.8125rem] font-semibold text-[#1A2B48]'>Xem chi tiết</span>
          <span
            aria-hidden
            className='flex size-[2.75rem] items-center justify-center rounded-full bg-[#1A2B48] text-white shadow-[0_0.75rem_1.5rem_-0.75rem_rgba(26,43,72,0.6)] transition-[background-color,rotate] duration-300 group-hover:rotate-45 group-hover:bg-[#B5935E]'
          >
            <ArrowUpRight className='size-[1.125rem]' />
          </span>
        </div>
      </div>
    </article>
  )
}

export default FeaturedArticle
