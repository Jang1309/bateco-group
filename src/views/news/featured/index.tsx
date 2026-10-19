import SectionHeading from '@/components/shared/section-heading'
import { FEATURED_ARTICLE, HIGHLIGHT_ARTICLES } from '@/views/news/data'

import FeaturedArticle from './featured-article'
import HighlightSlider from './highlight-slider'

const FeaturedNews = () => {
  return (
    <section className='bg-white pt-[2rem] pb-[5rem] xsm:pt-[1rem] xsm:pb-[3rem]'>
      <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
        <SectionHeading title='Tin tức nổi bật' />
        <div
          data-aos='business-rise'
          data-aos-duration='800'
          className='mt-[2.5rem] xsm:mt-[1.5rem]'
        >
          <FeaturedArticle article={FEATURED_ARTICLE} />
        </div>
        <div
          data-aos='business-rise'
          data-aos-duration='800'
          data-aos-delay='100'
          className='mt-[1.5rem] xsm:mt-[1rem]'
        >
          <HighlightSlider articles={HIGHLIGHT_ARTICLES} />
        </div>
      </div>
    </section>
  )
}

export default FeaturedNews
