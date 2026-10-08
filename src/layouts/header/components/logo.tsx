'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  imageClassName?: string
}

export default function Logo({ className, imageClassName }: LogoProps) {
  const t = useTranslations('Header')

  return (
    <Link
      href={ROUTES.home}
      className={cn('shrink-0', className)}
      aria-label={t('logoAlt')}
    >
      <Image
        src='/header/d-logo.png'
        alt={t('logoAlt')}
        width={280}
        height={84}
        priority
        className={cn('h-[3rem] w-auto object-contain xsm:h-[3rem]', imageClassName)}
      />
    </Link>
  )
}
