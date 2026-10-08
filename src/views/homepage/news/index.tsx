import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import Logo from '@/layouts/header/components/logo'

import { OTHER_NEWS } from './data'
import OtherNewsSlider from './other-news-slider'

const HomeNews = async () => {
  const t = await getTranslations('HomeNews')

  return (
    <section className='bg-white'>
      <div className='flex items-center gap-[1.25rem] px-[3.75rem] pt-[1.875rem] xsm:px-[1.5rem]'>
        <span className='h-[0.117rem] flex-1 bg-[#c8a462]' />
        <Logo />
        <span className='h-[0.117rem] flex-1 bg-[#c8a462]' />
      </div>

      <div className='mx-auto flex w-full max-w-[95rem] items-stretch gap-[4.375rem] px-[3.75rem] py-[3rem] xsm:flex-col xsm:gap-[1.5rem] xsm:px-[1.5rem] xsm:py-[2rem]'>
        <div className='min-w-0 flex-1 overflow-hidden bg-[#f5f5f5] shadow-[0_0.3125rem_1.875rem_rgba(0,0,0,0.06)]'>
          <Image
            src='/home/news/featured.jpg'
            alt={t('featuredTitle')}
            width={1600}
            height={1067}
            unoptimized
            className='h-[29.6875rem] w-full object-cover xsm:h-[16rem]'
          />
        </div>

        <div className='flex min-w-0 flex-1 flex-col justify-center pl-[1.25rem] xsm:pl-0'>
          <h2 className='text-[2.5rem] font-bold leading-[3.25rem] text-[#525252] xsm:text-[1.5rem] xsm:leading-[1.85rem]'>
            {t('featuredTitle')}
          </h2>

          <div className='mt-[1.25rem] flex items-center pt-[0.25rem]'>
            <span className='text-[0.875rem] font-bold uppercase leading-[1.25rem] tracking-[0.04rem] text-[#b68d4c]'>
              {t('hot')}
            </span>
            <span className='pl-[0.75rem] text-[0.875rem] font-medium leading-[1.25rem] text-[#d4d4d4]'>
              |
            </span>
            <span className='flex items-center pl-[0.75rem]'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src='/home/news/clock.svg'
                alt=''
                width={16}
                height={16}
                className='size-[1.25rem]'
              />
              <time className='pl-[0.375rem] text-[0.875rem] font-medium leading-[1.25rem] tracking-[0.02rem] text-[#737373]'>
                07.09.2026
              </time>
            </span>
          </div>

          <p className='mt-[1.25rem] max-w-[36rem] pt-[0.25rem] pb-[0.75rem] text-[1rem] font-normal leading-[1.5rem] text-[#525252]'>
            {t('featuredExcerpt')}
          </p>

          <Link
            href={ROUTES.news}
            className='mt-[1.25rem] inline-flex w-fit items-center justify-center bg-[#b68d4c] px-[2rem] py-[0.75rem] text-[0.875rem] font-semibold uppercase leading-[1.25rem] tracking-[0.04rem] text-white shadow-[0_0.078rem_0.078rem_rgba(0,0,0,0.05)] transition-colors hover:bg-[#a47d42]'
          >
            {t('readMore')}
          </Link>
        </div>
      </div>

      <div className='mx-auto w-full max-w-[95rem] px-[3.75rem] xsm:px-[1.5rem]'>
        <div className='flex items-center justify-between border-b border-[#e6dcbf] pb-[2.5rem]'>
          <div className='flex items-center gap-[0.9375rem]'>
            <span className='h-[1.875rem] w-[0.15625rem] bg-[#b88e4f]' />
            <h2 className='text-[1.25rem] font-normal uppercase leading-[1.75rem] tracking-[0.16rem] text-[#333] xsm:text-[1rem] xsm:tracking-[0.08rem]'>
              {t('otherTitle')}
            </h2>
          </div>
          <Link
            href={ROUTES.news}
            className='flex items-center gap-[0.5rem] text-[0.8125rem] font-semibold uppercase leading-[1.25rem] tracking-[0.04rem] text-[#b88e4f] transition-opacity hover:opacity-80'
          >
            {t('viewAll')}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src='/home/news/arrow.svg'
              alt=''
              width={16}
              height={16}
              className='size-[1.25rem]'
            />
          </Link>
        </div>

        <OtherNewsSlider
          items={OTHER_NEWS.map((item) => ({
            ...item,
            title: t(item.titleKey),
          }))}
        />
      </div>
    </section>
  )
}

export default HomeNews
