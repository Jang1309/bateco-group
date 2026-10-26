import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ComponentProps } from 'react'

import { Link } from '@/i18n/navigation'

type BlockHeaderProps = {
  title: string
  /** Link "Xem tất cả"; bỏ trống thì không hiển thị */
  href?: ComponentProps<typeof Link>['href']
}

const BlockHeader = ({ title, href }: BlockHeaderProps) => {
  const t = useTranslations('News')

  return (
    <div className='relative flex items-end justify-between gap-[1rem] border-b border-[#E2E8F0] pb-[1rem]'>
      <h3 className='text-[1.5rem] leading-[1.25] font-bold tracking-[-0.01em] text-[#1A2B48] xsm:text-[1.25rem]'>
        {title}
      </h3>
      <span
        aria-hidden
        className='absolute -bottom-px left-0 h-[0.1875rem] w-[3rem] bg-[#B5935E]'
      />
      {href ? (
        <Link
          href={href}
          className='group inline-flex shrink-0 items-center gap-[0.375rem] rounded-[0.25rem] text-[0.8125rem] font-bold text-[#B5935E] transition-colors duration-300 hover:text-[#1A2B48] outline-none focus-visible:ring-2 focus-visible:ring-[#B5935E] focus-visible:ring-offset-2'
        >
          {t('viewAll')}
          <ArrowRight className='size-[0.875rem] transition-transform duration-300 group-hover:translate-x-[0.1875rem]' />
        </Link>
      ) : null}
    </div>
  )
}

export default BlockHeader
