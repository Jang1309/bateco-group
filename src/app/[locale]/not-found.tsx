import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'

import { contactHrefFor, hrefFor } from '@/configs/routes'
import { Link, toAppHref } from '@/i18n/navigation'

export default function NotFoundPage() {
  const locale = useLocale()
  const t = useTranslations('NotFoundPage')

  return (
    <main className='flex min-h-dvh flex-col bg-white text-[#1a2b48]'>
      <div className='mx-auto flex w-full max-w-[95rem] flex-1 flex-col px-[2.5rem] py-[2.5rem] xsm:px-[1.5rem] xsm:py-[1.5rem]'>
        <Link
          href={toAppHref(hrefFor('home', locale))}
          aria-label='Bateco Group'
          className='w-fit cursor-pointer'
        >
          <Image
            src='/header/d-logo.png'
            alt='Bateco Group'
            width={1607}
            height={436}
            priority
            className='h-[3rem] w-auto xsm:h-[2.25rem]'
          />
        </Link>

        <div className='grid flex-1 grid-cols-[1fr_1.15fr] items-center gap-[3rem] xsm:grid-cols-1 xsm:gap-[1rem] xsm:py-[1rem]'>
          <div className='border-l-[0.1875rem] border-[#b5935e] pl-[3.125rem] xsm:order-2 xsm:pl-[1.25rem]'>
            <p className='text-[0.875rem] font-bold tracking-[0.08rem] text-[#b5935e] uppercase'>
              Error 404
            </p>
            <h1 className='mt-[1.25rem] text-[3rem] leading-[1.25] font-bold tracking-[0.02em] uppercase xsm:mt-[0.75rem] xsm:text-[1.75rem]'>
              {t('title')}
            </h1>
            <p className='mt-[1rem] max-w-[28rem] text-[1.0625rem] leading-[1.6] font-medium text-[#475569] xsm:text-[0.9375rem]'>
              {t('description')}
            </p>
            <div className='mt-[2.25rem] flex flex-wrap items-center gap-[1.75rem] xsm:mt-[1.5rem] xsm:gap-[1.25rem]'>
              <Link
                href={toAppHref(hrefFor('home', locale))}
                className='inline-flex cursor-pointer items-center justify-center bg-[#b5935e] px-[1.5rem] py-[0.875rem] text-[0.875rem] font-bold tracking-[0.04rem] text-white uppercase shadow-[0_0.25rem_0.75rem_rgba(181,147,94,0.35)] transition-colors duration-300 hover:bg-[#a4834f]'
              >
                {t('backHome')}
              </Link>
              <Link
                href={toAppHref(contactHrefFor(locale))}
                className='inline-flex cursor-pointer items-center gap-[0.35rem] text-[0.875rem] font-bold tracking-[0.04rem] text-[#b5935e] uppercase transition-opacity duration-300 hover:opacity-80'
              >
                {t('contact')}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <Image
            src='/404.gif'
            alt=''
            width={800}
            height={600}
            unoptimized
            priority
            className='h-auto w-full xsm:order-1'
          />
        </div>
      </div>
    </main>
  )
}
