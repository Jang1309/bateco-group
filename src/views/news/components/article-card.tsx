import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { ComponentProps } from 'react'

import { Link } from '@/i18n/navigation'
import { resolveCategoryTitle, type NewsArticle } from '@/views/news/data'

type ArticleCardProps = {
  article: NewsArticle
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const t = useTranslations('News')

  return (
    <Link
      href={article.href as ComponentProps<typeof Link>['href']}
      className='group flex w-full flex-col overflow-hidden rounded-[1rem] bg-white ring-1 ring-[#1A2B48]/[0.06] transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none hover:-translate-y-[0.375rem] hover:shadow-[0_2rem_3rem_-1.75rem_rgba(26,43,72,0.35)] focus-visible:ring-2 focus-visible:ring-[#B5935E]'
    >
      <div className='relative aspect-[16/10] overflow-hidden'>
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes='(max-width: 639px) 100vw, 30vw'
          className='object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]'
        />
      </div>

      <div className='flex flex-1 flex-col p-[1.75rem] xsm:p-[1.25rem]'>
        <p className='flex items-center gap-[0.625rem] text-[0.6875rem]'>
          <span className='truncate font-bold tracking-[0.12em] text-[#B5935E] uppercase'>
            {resolveCategoryTitle(article)}
          </span>
          <span className='h-[0.625rem] w-px shrink-0 bg-[#CBD2DC]' />
          <time className='shrink-0 font-medium text-[#94A3B8] tabular-nums'>{article.date}</time>
        </p>
        <h3 className='mt-[0.875rem] line-clamp-2 text-[1.1875rem] leading-[1.4] font-bold tracking-[-0.01em] text-pretty text-[#1A2B48] transition-colors duration-300 group-hover:text-[#B5935E] xsm:text-[1.0625rem]'>
          {article.title}
        </h3>
        <p className='mt-[0.625rem] mb-[1.5rem] line-clamp-2 text-[0.875rem] leading-[1.65] text-[#64748B]'>
          {article.excerpt}
        </p>
        <span className='mt-auto flex items-center justify-between border-t border-[#EEF1F5] pt-[1.125rem] text-[0.8125rem] font-semibold text-[#1A2B48]'>
          {t('readMore')}
          <span
            aria-hidden
            className='flex size-[2.25rem] items-center justify-center rounded-full bg-[#F1F4F8] text-[#1A2B48] transition-colors duration-300 group-hover:bg-[#B5935E] group-hover:text-white'
          >
            <ArrowRight className='size-[0.9375rem] transition-transform duration-300 group-hover:translate-x-[0.125rem]' />
          </span>
        </span>
      </div>
    </Link>
  )
}

export default ArticleCard
