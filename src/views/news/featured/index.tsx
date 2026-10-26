import SectionHeading from '@/components/shared/section-heading'
import type { NewsArticle } from '@/views/news/data'

import FeaturedArticle from './featured-article'
import HighlightSlider from './highlight-slider'

type FeaturedNewsProps = {
  articles?: NewsArticle[]
}

const FeaturedNews = ({ articles = [] }: FeaturedNewsProps) => {
  const [featured, ...highlights] = articles

  if (!featured) return null

  return (
    <section className='bg-white pt-[2rem] pb-[5rem] xsm:pt-[1rem] xsm:pb-[3rem]'>
      <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
        <SectionHeading title='Tin tức nổi bật' />
        <div
          data-aos='business-rise'
          data-aos-duration='800'
          className='mt-[2.5rem] xsm:mt-[1.5rem]'
        >
          <FeaturedArticle article={featured} />
        </div>
        {highlights.length > 0 ? (
          <div
            data-aos='business-rise'
            data-aos-duration='800'
            data-aos-delay='100'
            className='mt-[1.5rem] xsm:mt-[1rem]'
          >
            <HighlightSlider articles={highlights} />
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default FeaturedNews
