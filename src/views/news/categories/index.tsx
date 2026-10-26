import type { CategoryBlock as CategoryBlockData } from '@/views/news/data'

import CategoryBlock from './category-block'

type NewsCategoriesProps = {
  blocks?: CategoryBlockData[]
}

const NewsCategories = ({ blocks = [] }: NewsCategoriesProps) => {
  if (blocks.length === 0) return null

  return (
    <section className='border-t border-[#EEF1F5] bg-[#FAFBFC] pt-[5rem] pb-[6rem] xsm:pt-[3rem] xsm:pb-[3.5rem]'>
      <div className='mx-auto grid max-w-[95rem] grid-cols-2 gap-x-[4rem] gap-y-[4.5rem] px-[3.75rem] xsm:grid-cols-1 xsm:gap-y-[3rem] xsm:px-[1.25rem]'>
        {blocks.map((block, index) => (
          <div
            key={block.category}
            data-aos='business-rise'
            data-aos-duration='800'
            data-aos-delay={(index % 2) * 100}
            className='flex'
          >
            <CategoryBlock block={block} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default NewsCategories
