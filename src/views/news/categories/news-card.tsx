import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import type { NewsArticle } from '@/views/news/data'

type NewsCardProps = {
  article: NewsArticle
}

const NewsCard = ({ article }: NewsCardProps) => {
  return (
    <a
      href={article.href}
      className='group flex flex-col'
    >
      <div className='relative aspect-[4/3] overflow-hidden rounded-[0.5rem]'>
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes='(max-width: 639px) 46vw, 22vw'
          className='object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]'
        />
        <time className='absolute top-[0.75rem] left-[0.75rem] rounded-[0.25rem] bg-[#1A2B48]/85 px-[0.5rem] py-[0.25rem] text-[0.6875rem] font-bold text-white backdrop-blur-[0.25rem]'>
          {article.date}
        </time>
      </div>
      <h4 className='mt-[1rem] line-clamp-3 text-[1rem] leading-[1.45] font-bold text-[#1A2B48] transition-colors duration-300 group-hover:text-[#B5935E] xsm:mt-[0.75rem] xsm:text-[0.875rem]'>
        {article.title}
      </h4>
      <p className='mt-[0.5rem] line-clamp-2 text-[0.8125rem] leading-[1.55] text-[#64748B] xsm:hidden'>
        {article.excerpt}
      </p>
      <span className='mt-auto inline-flex items-center gap-[0.375rem] pt-[0.875rem] text-[0.75rem] font-bold text-[#B5935E]'>
        Xem thêm
        <ArrowRight className='size-[0.8125rem] transition-transform duration-300 group-hover:translate-x-[0.1875rem]' />
      </span>
    </a>
  )
}

export default NewsCard
