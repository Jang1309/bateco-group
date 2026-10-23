'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  const t = useTranslations('ErrorPage')

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className='relative flex min-h-dvh flex-col overflow-hidden bg-[#FDFBF7] text-[#1a2b48]'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40rem_28rem_at_15%_15%,rgba(181,147,94,0.12),transparent_70%),radial-gradient(ellipse_32rem_24rem_at_90%_85%,rgba(26,43,72,0.05),transparent_65%)]'
      />

      <div className='relative z-[1] mx-auto flex w-full max-w-[95rem] flex-1 flex-col px-[2.5rem] py-[2.5rem] xsm:px-[1.5rem] xsm:py-[1.5rem]'>
        <Link
          href={ROUTES.home}
          aria-label='Bateco Group'
          className='w-fit cursor-pointer'
        >
          <Image
            src='/logo.png'
            alt='Bateco Group'
            width={200}
            height={54}
            priority
            className='h-[2.75rem] w-auto xsm:h-[2.25rem]'
          />
        </Link>

        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-[36rem] border-l-[0.1875rem] border-[#b5935e] pl-[3.125rem] xsm:pl-[1.25rem]'>
            <p className='text-[0.75rem] font-semibold tracking-[0.2em] text-[#b5935e] uppercase'>
              {t('code')}
            </p>
            <h1 className='mt-[1rem] text-[2.5rem] leading-[1.25] font-bold tracking-[0.02em] uppercase xsm:text-[1.75rem]'>
              {t('title')}
            </h1>
            <p className='mt-[1rem] text-[1.0625rem] leading-[1.6] font-medium text-[#475569] xsm:text-[0.9375rem]'>
              {t('description')}
            </p>
            {error.digest ? (
              <p className='mt-[0.75rem] font-mono text-[0.75rem] tracking-[0.04em] text-[#94A3B8]'>
                {error.digest}
              </p>
            ) : null}
            <div className='mt-[2.25rem] flex flex-wrap items-center gap-[1rem] xsm:mt-[1.5rem]'>
              <button
                type='button'
                onClick={reset}
                className='inline-flex cursor-pointer items-center justify-center bg-[#b5935e] px-[1.5rem] py-[0.875rem] text-[0.875rem] font-bold tracking-[0.04rem] text-white uppercase shadow-[0_0.25rem_0.75rem_rgba(181,147,94,0.35)] transition-colors duration-300 hover:bg-[#a4834f]'
              >
                {t('retry')}
              </button>
              <Link
                href={ROUTES.home}
                className='inline-flex cursor-pointer items-center gap-[0.35rem] text-[0.875rem] font-bold tracking-[0.04rem] text-[#b5935e] uppercase transition-opacity duration-300 hover:opacity-80'
              >
                {t('backHome')}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
