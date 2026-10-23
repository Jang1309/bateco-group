'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

type LogoProps = {
  logo?: string
  logoWhite?: string
  className?: string
  imageClassName?: string
  onClick?: () => void
}

export default function Logo({ logo, logoWhite, className, imageClassName, onClick }: LogoProps) {
  const t = useTranslations('Header')
  const src = logo || '/header/d-logo.png'
  const srcWhite = logoWhite || '/header/d-logo-white.png'

  return (
    <Link
      href={ROUTES.home}
      onClick={onClick}
      className={cn('shrink-0', className)}
      aria-label={t('logoAlt')}
    >
      <span className='relative block'>
        <Image
          src={src}
          alt={t('logoAlt')}
          width={280}
          height={84}
          priority
          unoptimized
          className={cn(
            'header-logo-default h-[3rem] w-auto object-contain transition-opacity duration-300 xsm:h-[3rem]',
            imageClassName,
          )}
        />
        <Image
          src={srcWhite}
          alt=''
          width={280}
          height={84}
          aria-hidden
          unoptimized
          className={cn(
            'header-logo-white pointer-events-none absolute top-0 left-0 h-[3rem] w-auto object-contain opacity-0 transition-opacity duration-300 xsm:h-[3rem]',
            imageClassName,
          )}
        />
      </span>
    </Link>
  )
}
