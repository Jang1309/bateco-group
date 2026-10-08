'use client'

import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'

const LOCALE_META = {
  vi: { flag: '/header/flag-vn.svg', labelKey: 'localeVi' as const },
  en: { flag: '/header/flag-en.svg', labelKey: 'localeEn' as const },
} as const

type Locale = (typeof routing.locales)[number]

function Flag({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt='flag'
      width={22}
      height={15}
      className='h-[1.0625rem] w-[1.5625rem] rounded-[0.125rem] object-cover'
    />
  )
}

export default function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations('Header')
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const current = LOCALE_META[locale] ?? LOCALE_META.vi

  const switchLocale = (next: Locale) => {
    if (next === locale) return
    router.replace(pathname, { locale: next })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t('localeLabel')}
        className={cn(
          'flex-y-center gap-[0.5rem] rounded-sm text-[0.75rem] font-medium text-[#2a2a2a] outline-none transition-colors hover:text-[#1e3a6e] focus-visible:ring-2 focus-visible:ring-[#1e3a6e]/50',
          className,
        )}
      >
        <Flag src={current.flag} />
        <span>{t(current.labelKey)}</span>
        <ChevronDown
          aria-hidden
          className='size-[1rem] opacity-70'
          strokeWidth={1.75}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='min-w-[7.5rem]'
      >
        {routing.locales.map((code) => {
          const meta = LOCALE_META[code]
          return (
            <DropdownMenuItem
              key={code}
              onClick={() => switchLocale(code)}
              className={cn(
                'flex-y-center gap-[0.5rem] text-[1.0625rem]',
                code === locale && 'bg-accent',
              )}
            >
              <Flag src={meta.flag} />
              {t(meta.labelKey)}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
