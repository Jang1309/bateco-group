import { Award as AwardIcon, Trophy } from 'lucide-react'

import { Link } from '@/i18n/navigation'
import BlockHeader from '@/views/news/components/block-header'
import { AWARDS, FEATURED_AWARD, OTHER_NEWS } from '@/views/news/data'

const BLOCK = 'flex w-full flex-col'

/** Hàng cuối: Giải thưởng & Danh hiệu + Tin khác */
const NewsHighlights = () => {
  return (
    <section className='bg-[#FAFBFC] pt-[2rem] pb-[6rem] xsm:pt-[1.75rem] xsm:pb-[3.5rem]'>
      <div className='mx-auto grid max-w-[95rem] grid-cols-2 gap-x-[4rem] gap-y-[4.5rem] px-[3.75rem] xsm:grid-cols-1 xsm:gap-y-[3rem] xsm:px-[1.25rem]'>
        <div
          data-aos='business-rise'
          data-aos-duration='800'
          className='flex'
        >
          <div className={BLOCK}>
            <BlockHeader
              title='Giải thưởng & Danh hiệu'
              href='/news'
            />

            <div className='mt-[1.5rem] flex gap-[1.25rem] rounded-[0.75rem] bg-[linear-gradient(135deg,#FBF6EC_0%,#FFFFFF_100%)] p-[1.75rem] shadow-[0_1.5rem_3rem_-1.5rem_rgba(181,147,94,0.35)] ring-1 ring-[#EADFC8] xsm:flex-col xsm:gap-[1rem] xsm:p-[1.25rem]'>
              <span className='flex size-[3.5rem] shrink-0 items-center justify-center rounded-[0.75rem] bg-[#1A2B48] text-[#DFBA73]'>
                <Trophy
                  className='size-[1.625rem]'
                  strokeWidth={1.75}
                />
              </span>
              <div>
                <p className='text-[0.6875rem] font-bold tracking-[0.14em] text-[#B5935E] uppercase'>
                  {FEATURED_AWARD.label}
                </p>
                <h4 className='mt-[0.5rem] text-[1.25rem] leading-[1.4] font-bold tracking-[-0.01em] text-balance text-[#1A2B48] xsm:text-[1.0625rem]'>
                  {FEATURED_AWARD.title}
                </h4>
                {FEATURED_AWARD.description ? (
                  <p className='mt-[0.5rem] text-[0.875rem] leading-[1.6] text-[#64748B]'>
                    {FEATURED_AWARD.description}
                  </p>
                ) : null}
              </div>
            </div>

            <div className='mt-[1rem] grid flex-1 grid-cols-2 gap-[1rem] xsm:grid-cols-1 xsm:gap-[0.75rem]'>
              {AWARDS.map((award) => (
                <div
                  key={award.id}
                  className='flex flex-col rounded-[0.75rem] bg-white p-[1.25rem] ring-1 ring-[#1A2B48]/[0.06] transition-[box-shadow,translate] duration-300 hover:-translate-y-[0.125rem] hover:shadow-[0_1rem_2rem_-1rem_rgba(26,43,72,0.2)] xsm:p-[1rem]'
                >
                  <AwardIcon
                    className='size-[1.25rem] text-[#B5935E]'
                    strokeWidth={1.75}
                  />
                  <p className='mt-[0.75rem] text-[0.625rem] font-bold tracking-[0.14em] text-[#B5935E] uppercase'>
                    {award.label}
                  </p>
                  <p className='mt-[0.375rem] text-[0.9375rem] leading-[1.45] font-bold text-[#1A2B48] xsm:text-[0.875rem]'>
                    {award.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          data-aos='business-rise'
          data-aos-duration='800'
          data-aos-delay='100'
          className='flex'
        >
          <div className={BLOCK}>
            <BlockHeader
              title='Tin khác'
              href='/news'
            />
            <ul className='mt-[0.5rem]'>
              {OTHER_NEWS.map((item) => (
                <li
                  key={item.id}
                  className='border-b border-[#EEF1F5] last:border-b-0'
                >
                  <Link
                    href={{ pathname: '/tin-tuc/[slug]', params: { slug: item.id } }}
                    className='group flex rounded-[0.25rem] py-[1.25rem] outline-none focus-visible:ring-2 focus-visible:ring-[#B5935E] focus-visible:ring-offset-2'
                  >
                    <div className='min-w-0'>
                      <span className='text-[0.6875rem] font-bold tracking-[0.12em] text-[#B5935E] uppercase'>
                        {item.tag}
                      </span>
                      <p className='mt-[0.375rem] line-clamp-2 text-[1.0625rem] leading-[1.5] font-bold text-[#1A2B48] transition-colors duration-300 group-hover:text-[#B5935E] xsm:text-[0.9375rem]'>
                        {item.title}
                      </p>
                      <p className='mt-[0.25rem] line-clamp-1 text-[0.8125rem] text-[#64748B]'>
                        {item.excerpt}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsHighlights
