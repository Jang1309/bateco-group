import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import { Link } from '@/i18n/navigation'
import type { NewsArticle } from '@/views/news/data'

type NewsCardProps = {
  article: NewsArticle
}

const NewsCard = ({ article }: NewsCardProps) => {
  return (
    <Link
      href={{ pathname: '/tin-tuc/[slug]', params: { slug: article.id } }}
      className='group flex flex-col rounded-[0.75rem] outline-none focus-visible:ring-2 focus-visible:ring-[#B5935E] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAFBFC]'
    >
      <div className='relative aspect-[4/3] overflow-hidden rounded-[0.75rem] shadow-[0_1rem_2rem_-1.25rem_rgba(26,43,72,0.35)]'>
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes='(max-width: 639px) 46vw, 22vw'
          className='object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]'
        />
        <span
          aria-hidden
          className='absolute inset-0 bg-[linear-gradient(180deg,rgba(26,43,72,0.35)_0%,transparent_35%)]'
        />
        <time className='absolute top-[0.75rem] left-[0.75rem] rounded-[0.25rem] bg-white/90 px-[0.5rem] py-[0.25rem] text-[0.6875rem] font-bold text-[#1A2B48] tabular-nums backdrop-blur-[0.25rem]'>
          {article.date}
        </time>
      </div>
      <h4 className='mt-[1.125rem] line-clamp-3 text-[1.0625rem] leading-[1.45] font-bold tracking-[-0.005em] text-pretty text-[#1A2B48] transition-colors duration-300 group-hover:text-[#B5935E] xsm:mt-[0.75rem] xsm:text-[0.875rem]'>
        {article.title}
      </h4>
      <p className='mt-[0.5rem] line-clamp-2 text-[0.8125rem] leading-[1.6] text-[#64748B] xsm:hidden'>
        {article.excerpt}
      </p>
      <span className='mt-auto inline-flex w-fit items-center gap-[0.375rem] pt-[1rem] text-[0.75rem] font-bold text-[#B5935E]'>
        <span className='bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-[0.125rem] transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]'>
          Xem thêm
        </span>
        <ArrowRight className='size-[0.8125rem] transition-transform duration-300 group-hover:translate-x-[0.1875rem]' />
      </span>
    </Link>
  )
}

export default NewsCard
