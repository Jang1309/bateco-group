import { MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'

import DetailHero from '@/components/shared/detail-hero'

const formatDate = (value?: string) => {
  if (!value) return ''
  const [y, m, d] = value.split('-')
  if (!y || !m || !d) return value
  return `${d}/${m}/${y}`
}

type ProjectDetailHeroProps = {
  image: string
  sectorLabel?: string
  title: string
  date?: string
  location?: string
  summary?: string
}

/** Banner chi tiết dự án — dùng DetailHero (chữ trái / ảnh phải) như bản đầu */
const ProjectDetailHero = ({
  image,
  sectorLabel,
  title,
  date,
  location,
  summary,
}: ProjectDetailHeroProps) => {
  const t = useTranslations('Projects')

  return (
    <DetailHero
      image={image}
      eyebrow={sectorLabel || t('eyebrow')}
      title={title}
      // Tên dự án thường viết hoa toàn bộ → cỡ nhỏ hơn mặc định để không bị nặng
      titleClassName='business-hero-rise mt-[1rem] text-[2.125rem] leading-[1.25] font-bold tracking-[-0.01em] text-balance text-[#1A2B48] xsm:text-[1.5rem] xsm:leading-[1.3]'
      description={summary || undefined}
      meta={
        location ? (
          <span className='inline-flex items-center gap-[0.375rem] font-medium text-[#475569]'>
            <MapPin
              className='size-[0.875rem] text-[#B5935E]'
              strokeWidth={1.75}
            />
            {location}
          </span>
        ) : date ? (
          <time className='font-medium text-[#475569] tabular-nums'>{formatDate(date)}</time>
        ) : undefined
      }
    />
  )
}

export default ProjectDetailHero
