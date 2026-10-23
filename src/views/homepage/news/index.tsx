import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import type { PostListItem } from '@/interfaces/postList.interface'
import Logo from '@/layouts/header/components/logo'
import OtherNewsSlider, {
  type OtherNewsSlide,
} from '@/views/homepage/news/components/other-news-slider'

const formatPostDate = (value?: string) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}.${month}.${date.getFullYear()}`
}

const postHref = (post: PostListItem) => {
  const slug = post.slug || (post.id != null ? String(post.id) : '')
  if (!slug) return ROUTES.news
  return { pathname: '/tin-tuc/[slug]' as const, params: { slug } }
}

const HomeNews = async ({ posts }: { posts?: PostListItem[] }) => {
  const t = await getTranslations('HomeNews')
  const featured = posts?.[0]
  const others: OtherNewsSlide[] =
    posts?.slice(1).map((post) => ({
      image: post.thumbnail?.url || '/home/news/featured.jpg',
      date: formatPostDate(post.published),
      title: post.title || '',
      href: postHref(post),
    })) || []

  if (!featured && !others.length) return null

  const featuredExcerpt = featured?.post_excerpt || featured?.excerpt || ''
  const featuredImage = featured?.thumbnail?.url || '/home/news/featured.jpg'
  const featuredDate = formatPostDate(featured?.published)
  const featuredCategory = featured?.taxonomies?.category?.[0]?.name

  return (
    <section className='bg-white'>
      <div className='flex items-center gap-[1.25rem] px-[3.75rem] pt-[1.875rem] xsm:px-[1.5rem]'>
        <span className='h-[0.117rem] flex-1 bg-[#c8a462]' />
        <Logo />
        <span className='h-[0.117rem] flex-1 bg-[#c8a462]' />
      </div>

      {featured ? (
        <div className='mx-auto flex w-full max-w-[95rem] items-stretch gap-[4.375rem] px-[3.75rem] py-[3rem] xsm:flex-col xsm:gap-[1.5rem] xsm:px-[1.5rem] xsm:py-[2rem]'>
          <Link
            href={postHref(featured)}
            data-aos='fade-right'
            className='group min-w-0 flex-1 overflow-hidden bg-[#f5f5f5] shadow-[0_0.3125rem_1.875rem_rgba(0,0,0,0.06)]'
          >
            <Image
              src={featuredImage}
              alt={featured.title || ''}
              width={1600}
              height={1067}
              className='h-[29.6875rem] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] xsm:h-[16rem]'
            />
          </Link>

          <div className='flex min-w-0 flex-1 flex-col justify-center pl-[1.25rem] xsm:pl-0'>
            {featured.title ? (
              <h2
                data-aos='fade-up'
                className='text-pretty text-[2.5rem] leading-[3.25rem] font-bold text-[#525252] xsm:text-[1.25rem] xsm:leading-[1.55]'
              >
                <Link
                  href={postHref(featured)}
                  className='transition-colors duration-300 hover:text-[#b68d4c]'
                >
                  {featured.title}
                </Link>
              </h2>
            ) : null}

            <div
              data-aos='fade-up'
              data-aos-delay='100'
              className='mt-[1.25rem] flex flex-wrap items-center gap-y-[0.35rem] pt-[0.25rem] xsm:mt-[0.875rem]'
            >
              <span className='text-[0.875rem] leading-[1.25rem] font-bold tracking-[0.04rem] text-[#b68d4c] uppercase xsm:text-[0.75rem] xsm:leading-[1.1rem]'>
                {featuredCategory || t('hot')}
              </span>
              {featuredDate ? (
                <>
                  <span className='pl-[0.75rem] text-[0.875rem] leading-[1.25rem] font-medium text-[#d4d4d4] xsm:text-[0.75rem]'>
                    |
                  </span>
                  <span className='flex items-center pl-[0.75rem]'>
                    <Image
                      src='/home/news/clock.svg'
                      alt=''
                      width={16}
                      height={16}
                      className='size-[1.25rem] xsm:size-[1rem]'
                    />
                    <time className='pl-[0.375rem] text-[0.875rem] leading-[1.25rem] font-medium tracking-[0.02rem] text-[#737373] xsm:text-[0.75rem]'>
                      {featuredDate}
                    </time>
                  </span>
                </>
              ) : null}
            </div>

            {featuredExcerpt ? (
              <p
                data-aos='fade-up'
                data-aos-delay='200'
                className='mt-[1.25rem] max-w-[36rem] pt-[0.25rem] pb-[0.75rem] text-pretty text-[1rem] leading-[1.5rem] font-normal text-[#525252] xsm:mt-[0.875rem] xsm:pb-[0.5rem] xsm:text-[0.875rem] xsm:leading-[1.45]'
              >
                {featuredExcerpt}
              </p>
            ) : null}

            <Link
              href={postHref(featured)}
              className='mt-[1.25rem] inline-flex w-fit items-center justify-center bg-[#b68d4c] px-[2rem] py-[0.75rem] text-[0.875rem] leading-[1.25rem] font-semibold tracking-[0.04rem] text-white uppercase shadow-[0_0.078rem_0.078rem_rgba(0,0,0,0.05)] transition-colors hover:bg-[#a47d42]'
            >
              {t('readMore')}
            </Link>
          </div>
        </div>
      ) : null}

      <div className='mx-auto w-full max-w-[95rem] px-[3.75rem] xsm:px-[1.5rem]'>
        <div
          data-aos='fade-up'
          className='flex items-center justify-between border-b border-[#e6dcbf] pb-[2.5rem]'
        >
          <div className='flex items-center gap-[0.9375rem]'>
            <span className='h-[1.875rem] w-[0.15625rem] bg-[#b88e4f]' />
            <h2 className='text-[1.25rem] leading-[1.75rem] font-normal tracking-[0.16rem] text-[#333] uppercase xsm:text-[1rem] xsm:tracking-[0.08rem]'>
              {t('otherTitle')}
            </h2>
          </div>
          <Link
            href={ROUTES.news}
            className='flex items-center gap-[0.5rem] text-[0.8125rem] leading-[1.25rem] font-semibold tracking-[0.04rem] text-[#b88e4f] uppercase transition-opacity hover:opacity-80'
          >
            {t('viewAll')}
            <Image
              src='/home/news/arrow.svg'
              alt=''
              width={16}
              height={16}
              className='size-[1.25rem]'
            />
          </Link>
        </div>

        <OtherNewsSlider items={others} />
      </div>
    </section>
  )
}

export default HomeNews
