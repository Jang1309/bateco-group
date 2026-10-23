import { Link } from '@/i18n/navigation'
import BlockHeader from '@/views/news/components/block-header'
import { type CategoryBlock as CategoryBlockData, getCategoryTitle } from '@/views/news/data'

import NewsCard from './news-card'

type CategoryBlockProps = {
  block: CategoryBlockData
}

const CategoryBlock = ({ block }: CategoryBlockProps) => {
  return (
    <div className='flex w-full flex-col'>
      <BlockHeader
        title={getCategoryTitle(block.category)}
        href={{ pathname: '/tin-tuc/danh-muc/[slug]', params: { slug: block.category } }}
      />

      <div className='mt-[1.75rem] grid grid-cols-2 gap-[1.5rem] xsm:mt-[1.25rem] xsm:grid-cols-1 xsm:gap-[0.875rem]'>
        {block.cards.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
          />
        ))}
      </div>

      <ul className='mt-[1.75rem] border-t border-[#E2E8F0] xsm:mt-[1.25rem]'>
        {block.list.map((item) => (
          <li
            key={item.id}
            className='border-b border-[#E2E8F0]'
          >
            <Link
              href={{ pathname: '/tin-tuc/[slug]', params: { slug: item.id } }}
              className='group flex gap-[1.25rem] rounded-[0.25rem] py-[1rem] xsm:gap-[0.875rem] outline-none focus-visible:ring-2 focus-visible:ring-[#B5935E] focus-visible:ring-offset-2'
            >
              <time className='w-[5.25rem] shrink-0 pt-[0.125rem] text-[0.8125rem] font-semibold text-[#B5935E] tabular-nums xsm:w-[4.75rem] xsm:text-[0.75rem]'>
                {item.date}
              </time>
              <p className='line-clamp-2 text-[0.9375rem] leading-[1.5] font-bold text-pretty text-[#1A2B48] transition-[color,translate] duration-300 group-hover:translate-x-[0.375rem] group-hover:text-[#B5935E] xsm:text-[0.875rem]'>
                {item.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryBlock
