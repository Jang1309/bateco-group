import { getTranslations } from 'next-intl/server'

import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'

export default async function BannerContent() {
  const t = await getTranslations('Banner')

  return (
    <div className='absolute inset-0 z-[1] flex items-center'>
      <div className='mx-auto w-full max-w-[95rem] px-[2.5rem] xsm:px-[1.5rem]'>
        <div className='relative border-l-[0.1875rem] border-[#b5935e] pl-[3.125rem] xsm:max-w-full xsm:pl-[1.25rem]'>
          <p className='text-[0.875rem] font-bold uppercase tracking-[0.08rem] text-[#1a2b48]'>
            {t('eyebrow')}
          </p>

          <h2 className='mt-[1.25rem] text-[3rem] font-bold uppercase leading-[1.35] xsm:mt-[1rem] xsm:text-[2.25rem]'>
            <span className='block text-[#b5935e]'>{t('titleLine1')}</span>
            <span className='block text-[#1a2b48]'>{t('titleLine2')}</span>
          </h2>

          <p className='mt-[1.5rem] max-w-[28rem] text-[1.0625rem] font-medium leading-[1.55] text-[#1a2b48] xsm:mt-[1rem] xsm:text-[0.9375rem]'>
            {t('description')}
          </p>

          <div className='mt-[2.25rem] flex flex-wrap items-center gap-[1.75rem] xsm:mt-[1.5rem] xsm:gap-[1.25rem]'>
            <Link
              href={ROUTES.about}
              className='inline-flex items-center justify-center bg-[#b5935e] px-[1.5rem] py-[0.875rem] text-[0.875rem] font-bold uppercase tracking-[0.04rem] text-white shadow-[0_0.25rem_0.75rem_rgba(181,147,94,0.35)] transition-colors hover:bg-[#a4834f]'
            >
              {t('ctaPrimary')}
            </Link>

            <a
              href='#ecosystem'
              className='inline-flex items-center gap-[0.35rem] text-[0.875rem] font-bold uppercase tracking-[0.04rem] text-[#b5935e] transition-opacity hover:opacity-80'
            >
              {t('ctaSecondary')}
              <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
