import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import { getCategoryTitle, type NewsArticle } from '@/views/news/data'

type FeaturedArticleProps = {
  article: NewsArticle
}

const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  return (
    <article className='group grid grid-cols-[1.15fr_1fr] overflow-hidden rounded-[1rem] border border-[#EEF1F5] bg-white shadow-[0_1rem_2.5rem_rgba(15,28,51,0.06)] xsm:grid-cols-1 xsm:rounded-[0.75rem]'>
      <a
        href={article.href}
        className='relative block aspect-[16/10] overflow-hidden'
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes='(max-width: 639px) 100vw, 50vw'
          className='object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]'
        />
      </a>

      <div className='flex flex-col justify-center px-[3rem] py-[2.5rem] xsm:px-[1.25rem] xsm:py-[1.5rem]'>
        <p className='flex items-center gap-[0.625rem] text-[0.75rem] font-bold tracking-[0.1em] uppercase'>
          <span className='text-[#B5935E]'>{getCategoryTitle(article.category)}</span>
          <span className='size-[0.25rem] rounded-full bg-[#CBD2DC]' />
          <time className='font-semibold tracking-normal text-[#94A3B8]'>{article.date}</time>
        </p>
        <h3 className='mt-[1rem] text-[1.75rem] leading-[1.35] font-bold text-[#1A2B48] xsm:text-[1.25rem]'>
          <a
            href={article.href}
            className='transition-colors duration-300 hover:text-[#B5935E]'
          >
            {article.title}
          </a>
        </h3>
        <p className='mt-[1rem] line-clamp-4 text-[0.9375rem] leading-[1.7] text-[#475569] xsm:line-clamp-3'>
          {article.excerpt}
        </p>
        <a
          href={article.href}
          className='group/btn mt-[1.75rem] inline-flex w-fit items-center gap-[0.5rem] rounded-[0.375rem] bg-[#1A2B48] px-[1.25rem] py-[0.75rem] text-[0.8125rem] font-bold text-white transition-colors duration-300 hover:bg-[#B5935E]'
        >
          Xem chi tiết
          <ArrowRight className='size-[0.9375rem] transition-transform duration-300 group-hover/btn:translate-x-[0.1875rem]' />
        </a>
      </div>
    </article>
  )
}

export default FeaturedArticle
