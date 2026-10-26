import { Newspaper } from 'lucide-react'
import { useTranslations } from 'next-intl'

type EmptyStateProps = {
  categoryTitle?: string
  onBrowseAll?: () => void
}

const EmptyState = ({ categoryTitle, onBrowseAll }: EmptyStateProps) => {
  const t = useTranslations('News')
  const tc = useTranslations('Common')

  return (
    <div
      role='status'
      className='mt-[2.5rem] flex flex-col items-center rounded-[1rem] border border-dashed border-[#E2E8F0] bg-white px-[2rem] py-[4.5rem] text-center xsm:mt-[1.5rem] xsm:px-[1.25rem] xsm:py-[3rem]'
    >
      <span className='flex size-[3.5rem] items-center justify-center rounded-full bg-[#F7F4EC] text-[#B5935E] ring-1 ring-[#EADFC8]'>
        <Newspaper
          className='size-[1.5rem]'
          strokeWidth={1.75}
          aria-hidden
        />
      </span>

      <p className='mt-[1.5rem] text-[0.6875rem] font-bold tracking-[0.14em] text-[#B5935E] uppercase'>
        {t('emptyTitle')}
      </p>

      <h3 className='mt-[0.625rem] max-w-[28rem] text-[1.375rem] leading-[1.35] font-bold tracking-[-0.01em] text-balance text-[#1A2B48] xsm:text-[1.125rem]'>
        {categoryTitle || tc('contentUpdating')}
      </h3>

      <p className='mt-[0.75rem] max-w-[26rem] text-[0.9375rem] leading-[1.6] text-pretty text-[#64748B] xsm:text-[0.875rem]'>
        {t('emptyDesc')}
      </p>

      {onBrowseAll ? (
        <button
          type='button'
          onClick={onBrowseAll}
          className='mt-[1.75rem] inline-flex cursor-pointer items-center justify-center rounded-full border border-[#1A2B48] bg-[#1A2B48] px-[1.5rem] py-[0.75rem] text-[0.8125rem] font-bold tracking-[0.04em] text-white uppercase transition-[background-color,border-color,transform] duration-300 hover:-translate-y-[0.0625rem] hover:border-[#B5935E] hover:bg-[#B5935E] outline-none focus-visible:ring-2 focus-visible:ring-[#B5935E] focus-visible:ring-offset-2'
        >
          {t('emptyCta')}
        </button>
      ) : null}
    </div>
  )
}

export default EmptyState
