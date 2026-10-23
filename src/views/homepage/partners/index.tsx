'use client'

import type { HomepagePartners } from '@/interfaces/homepage.interface'
import { LogoCell, LogoRow } from '@/views/homepage/partners/components/logo-row'

const Partners = ({ data }: { data?: HomepagePartners }) => {
  const ecosystem = data?.ecosystem?.gallery?.filter(Boolean) || []
  const partners = data?.partners?.gallery?.filter(Boolean) || []
  const ecosystemTitle = data?.ecosystem?.ecosystem_title || data?.ecosystem?.partners_title
  const partnersTitle = data?.partners?.partners_title || data?.partners?.ecosystem_title

  return (
    <section className='bg-white px-[3.125rem] py-[5rem] xsm:px-[1.5rem] xsm:py-[3rem]'>
      <div className='mx-auto max-w-[95rem]'>
        <div className='flex items-start justify-between gap-[3rem] xsm:flex-col xsm:gap-[1.25rem]'>
          {data?.title ? (
            <div
              data-aos='fade-up'
              className='text-[2.75rem] leading-[1.2] font-light tracking-[0.02em] text-[#1A1A1A] uppercase xsm:text-[1.6rem] [&_br]:block [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-[#b5935e]'
              dangerouslySetInnerHTML={{ __html: data.title }}
            />
          ) : null}
          {data?.desc ? (
            <div
              data-aos='fade-left'
              data-aos-delay='150'
              className='mt-[0.5rem] max-w-[26rem] text-[0.9375rem] leading-[1.65] text-[#555] xsm:mt-0 [&_blockquote]:border-l [&_blockquote]:border-[#C6A15B] [&_blockquote]:pl-[1.25rem] [&_blockquote]:not-italic [&_blockquote_p]:m-0 [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-[#b5935e]'
              dangerouslySetInnerHTML={{ __html: data.desc }}
            />
          ) : null}
        </div>

        {ecosystem.length ? (
          <LogoRow title={ecosystemTitle || 'Hệ sinh thái'}>
            {ecosystem.map((logo, index) => (
              <LogoCell
                key={index}
                logo={logo}
                className='h-[7.5rem] w-[17rem] px-[3rem] xsm:h-[6rem] xsm:w-[12rem] xsm:px-[1.75rem]'
                imageClassName='max-h-[3rem] xsm:max-h-[2.25rem]'
              />
            ))}
          </LogoRow>
        ) : null}

        {partners.length ? (
          <LogoRow
            title={partnersTitle || 'Đối tác'}
            reverse
          >
            {partners.map((logo, index) => (
              <LogoCell
                key={index}
                logo={logo}
                className='h-[7.5rem] w-[17rem] px-[3rem] xsm:h-[6rem] xsm:w-[12rem] xsm:px-[1.75rem]'
                imageClassName='max-h-[3rem] xsm:max-h-[2.25rem]'
              />
            ))}
          </LogoRow>
        ) : null}
      </div>
    </section>
  )
}

export default Partners
