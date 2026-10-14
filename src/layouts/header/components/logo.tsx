'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  imageClassName?: string
  onClick?: () => void
}

export default function Logo({ className, imageClassName, onClick }: LogoProps) {
  const t = useTranslations('Header')

  return (
    <Link
      href={ROUTES.home}
      onClick={onClick}
      className={cn('shrink-0', className)}
      aria-label={t('logoAlt')}
    >
      <span className='relative block'>
        <Image
          src='/header/d-logo.png'
          alt={t('logoAlt')}
          width={280}
          height={84}
          priority
          className={cn(
            'header-logo-default h-[3rem] w-auto object-contain transition-opacity duration-300 xsm:h-[3rem]',
            imageClassName,
          )}
        />
        <Image
          src='/header/d-logo-white.png'
          alt=''
          width={280}
          height={84}
          aria-hidden
          className={cn(
            'header-logo-white pointer-events-none absolute top-0 left-0 h-[3rem] w-auto object-contain opacity-0 transition-opacity duration-300 xsm:h-[3rem]',
            imageClassName,
          )}
        />
      </span>
    </Link>
  )
}
