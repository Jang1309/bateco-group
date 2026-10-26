import { Link } from '@/i18n/navigation'
import BlockHeader from '@/views/news/components/block-header'
import type { CategoryBlock as CategoryBlockData } from '@/views/news/data'

import NewsCard from './news-card'

type CategoryBlockProps = {
  block: CategoryBlockData
}

const CategoryBlock = ({ block }: CategoryBlockProps) => {
  const title = block.categoryTitle || block.category

  return (
    <div className='flex w-full flex-col'>
      <BlockHeader
        title={title}
        href={{
          pathname: '/tin-tuc/danh-muc',
          query: { 'danh-muc': block.category },
        }}
      />

      {block.cards.length > 0 ? (
        <div className='mt-[1.75rem] grid grid-cols-2 gap-[1.5rem] xsm:mt-[1.25rem] xsm:grid-cols-1 xsm:gap-[0.875rem]'>
          {block.cards.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
            />
          ))}
        </div>
      ) : (
        <p className='mt-[1.75rem] text-[0.875rem] text-[#94A3B8] xsm:mt-[1.25rem]'>
          Chưa có bài viết trong chuyên mục này.
        </p>
      )}

      {block.list.length > 0 ? (
        <ul className='mt-[1.75rem] border-t border-[#E2E8F0] xsm:mt-[1.25rem]'>
          {block.list.map((item) => (
            <li
              key={item.id}
              className='border-b border-[#E2E8F0]'
            >
              <Link
                href={{ pathname: '/tin-tuc/[slug]', params: { slug: item.id } }}
                className='group flex gap-[1.25rem] rounded-[0.25rem] py-[1rem] outline-none focus-visible:ring-2 focus-visible:ring-[#B5935E] focus-visible:ring-offset-2 xsm:gap-[0.875rem]'
              >
                {item.date ? (
                  <time className='w-[5.25rem] shrink-0 pt-[0.125rem] text-[0.8125rem] font-semibold text-[#B5935E] tabular-nums xsm:w-[4.75rem] xsm:text-[0.75rem]'>
                    {item.date}
                  </time>
                ) : null}
                <p className='line-clamp-2 text-[0.9375rem] leading-[1.5] font-bold text-pretty text-[#1A2B48] transition-[color,translate] duration-300 group-hover:translate-x-[0.375rem] group-hover:text-[#B5935E] xsm:text-[0.875rem]'>
                  {item.title}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default CategoryBlock
