import { useTranslations } from 'next-intl'

import type { AdministrativeDocumentListItem } from '@/interfaces/administrativeDocument.interface'

const formatDate = (value?: string) => {
  if (!value) return ''
  const [y, m, d] = value.split('-')
  if (!y || !m || !d) return value
  return `${d}/${m}/${y}`
}

const stripHtml = (value?: string) =>
  value
    ?.replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || ''

const getFileUrl = (document: AdministrativeDocumentListItem) => {
  const file = document.acf?.file
  return typeof file === 'string' && file.length > 0 ? file : null
}

type DocumentItemProps = {
  document: AdministrativeDocumentListItem
}

const itemClassName =
  'group grid grid-cols-[8.5rem_1fr] items-center gap-[1.5rem] px-[0.5rem] py-[1.5rem] transition-colors duration-300 xsm:grid-cols-1 xsm:gap-[0.5rem] xsm:px-0 xsm:py-[1.25rem]'

const DocumentItem = ({ document }: DocumentItemProps) => {
  const t = useTranslations('Investor')
  const fileUrl = getFileUrl(document)
  const description = stripHtml(document.post_excerpt || document.excerpt)

  const content = (
    <>
      <time className='text-[0.9375rem] font-bold text-[#1A2B48] xsm:text-[0.8125rem] xsm:text-[#64748B]'>
        {formatDate(document.published)}
      </time>
      <div>
        <h3 className='text-[1.125rem] leading-[1.4] font-bold text-[#0F5A3C] transition-colors duration-300 group-hover:text-[#B5935E] xsm:text-[1rem]'>
          {document.title}
        </h3>
        {description ? (
          <p className='mt-[0.375rem] text-[0.8125rem] leading-[1.5] text-[#64748B]'>
            {description}
          </p>
        ) : null}
        <span
          aria-hidden
          className='mt-[0.5rem] block h-[0.125rem] w-0 bg-[#B5935E] transition-[width] duration-500 ease-out group-hover:w-[2.5rem]'
        />
      </div>
    </>
  )

  return (
    <li className='border-b border-[#EEF1F5] last:border-b-0'>
      {fileUrl ? (
        <a
          href={fileUrl}
          target='_blank'
          rel='noopener noreferrer'
          className={`${itemClassName} hover:bg-[#FAFBFC]`}
        >
          {content}
        </a>
      ) : (
        <div
          className={`${itemClassName} cursor-not-allowed opacity-60`}
          title={t('noAttachment')}
        >
          {content}
        </div>
      )}
    </li>
  )
}

export default DocumentItem
