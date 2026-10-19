import { Award as AwardIcon, Trophy } from 'lucide-react'

import BlockHeader from '@/views/news/components/block-header'
import { AWARDS, FEATURED_AWARD, OTHER_NEWS } from '@/views/news/data'

const BLOCK =
  'flex w-full flex-col rounded-[1rem] border border-[#EEF1F5] bg-white p-[1.75rem] xsm:rounded-[0.75rem] xsm:p-[1.25rem]'

/** Hàng cuối: Giải thưởng & Danh hiệu + Tin khác */
const NewsHighlights = () => {
  return (
    <section className='bg-[#FAFBFC] pt-[2.5rem] pb-[6rem] xsm:pt-[1.25rem] xsm:pb-[3.5rem]'>
      <div className='mx-auto grid max-w-[95rem] grid-cols-2 gap-[2rem] px-[3.75rem] xsm:grid-cols-1 xsm:gap-[1.25rem] xsm:px-[1.25rem]'>
        <div
          data-aos='business-rise'
          data-aos-duration='800'
          className='flex'
        >
          <div className={BLOCK}>
            <BlockHeader
              title='Giải thưởng & Danh hiệu'
              href='#'
            />

            <div className='mt-[1.5rem] flex gap-[1.25rem] rounded-[0.75rem] bg-[linear-gradient(135deg,#FBF6EC_0%,#FFFFFF_100%)] p-[1.5rem] ring-1 ring-[#EADFC8] xsm:flex-col xsm:gap-[1rem] xsm:p-[1.25rem]'>
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
                <h4 className='mt-[0.5rem] text-[1.25rem] leading-[1.4] font-bold text-[#1A2B48] xsm:text-[1.0625rem]'>
                  {FEATURED_AWARD.title}
                </h4>
                {FEATURED_AWARD.description ? (
                  <p className='mt-[0.5rem] text-[0.875rem] leading-[1.6] text-[#64748B]'>
                    {FEATURED_AWARD.description}
                  </p>
                ) : null}
              </div>
            </div>

            <div className='mt-[1rem] grid flex-1 grid-cols-2 gap-[1rem] xsm:gap-[0.75rem]'>
              {AWARDS.map((award) => (
                <div
                  key={award.id}
                  className='flex flex-col rounded-[0.75rem] border border-[#EEF1F5] bg-[#F7F9FB] p-[1.25rem] xsm:p-[1rem]'
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
              href='#'
            />
            <ul className='mt-[0.5rem]'>
              {OTHER_NEWS.map((item) => (
                <li
                  key={item.id}
                  className='border-b border-[#EEF1F5] last:border-b-0'
                >
                  <a
                    href={item.href}
                    className='group block py-[1.25rem]'
                  >
                    <span className='inline-block rounded-[0.25rem] border border-[#1A2B48]/15 px-[0.5rem] py-[0.1875rem] text-[0.625rem] font-bold tracking-[0.12em] text-[#1A2B48] uppercase'>
                      {item.tag}
                    </span>
                    <p className='mt-[0.625rem] line-clamp-2 text-[1rem] leading-[1.5] font-bold text-[#1A2B48] transition-colors duration-300 group-hover:text-[#B5935E] xsm:text-[0.9375rem]'>
                      {item.title}
                    </p>
                    <p className='mt-[0.25rem] line-clamp-1 text-[0.8125rem] text-[#64748B]'>
                      {item.excerpt}
                    </p>
                  </a>
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
