import BlockHeader from '@/views/news/components/block-header'
import { type CategoryBlock as CategoryBlockData, getCategoryTitle } from '@/views/news/data'

import NewsCard from './news-card'

type CategoryBlockProps = {
  block: CategoryBlockData
}

const CategoryBlock = ({ block }: CategoryBlockProps) => {
  return (
    <div className='flex w-full flex-col rounded-[1rem] border border-[#EEF1F5] bg-white p-[1.75rem] xsm:rounded-[0.75rem] xsm:p-[1.25rem]'>
      {/* TODO: trỏ "Xem tất cả" tới trang danh sách theo chuyên mục khi có */}
      <BlockHeader
        title={getCategoryTitle(block.category)}
        href='#'
      />

      <div className='mt-[1.5rem] grid grid-cols-2 gap-[1.5rem] xsm:mt-[1.25rem] xsm:gap-[0.875rem]'>
        {block.cards.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
          />
        ))}
      </div>

      <ul className='mt-[1.5rem] rounded-[0.5rem] bg-[#F7F9FB] px-[1.25rem] xsm:mt-[1.25rem] xsm:px-[1rem]'>
        {block.list.map((item) => (
          <li
            key={item.id}
            className='border-b border-[#E9EDF2] last:border-b-0'
          >
            <a
              href={item.href}
              className='group block py-[1rem]'
            >
              <time className='text-[0.75rem] font-bold text-[#B5935E]'>{item.date}</time>
              <p className='mt-[0.25rem] line-clamp-2 text-[0.9375rem] leading-[1.5] font-bold text-[#1A2B48] transition-colors duration-300 group-hover:text-[#B5935E] xsm:text-[0.875rem]'>
                {item.title}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryBlock
