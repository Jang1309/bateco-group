'use client'

import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import LocaleSwitcher from '@/layouts/header/components/locale-switcher'
import { ALL_NAV } from '@/layouts/header/data'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export default function MobileMenu() {
  const t = useTranslations('Header')
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='size-[2.5rem] text-[#2a2a2a]'
          aria-label={t('openMenu')}
        >
          <Menu className='size-[1.25rem]' />
        </Button>
      </SheetTrigger>
      <SheetContent
        side='right'
        className='w-[min(20rem,88vw)] gap-0 border-l border-[#e8e8e8] bg-white p-0'
        showCloseButton={false}
      >
        <SheetHeader className='flex-row items-center justify-between border-b border-[#e8e8e8] px-[1.25rem] py-[1rem]'>
          <SheetTitle className='text-[1rem] font-semibold text-[#1e3a6e]'>
            {t('logoAlt')}
          </SheetTitle>
          <SheetClose asChild>
            <Button
              variant='ghost'
              size='icon'
              className='size-[2.25rem]'
              aria-label={t('closeMenu')}
            >
              <X className='size-[1.125rem]' />
            </Button>
          </SheetClose>
        </SheetHeader>
        <nav
          aria-label='Mobile'
          className='flex flex-1 flex-col gap-[0.25rem] px-[0.75rem] py-[1rem]'
        >
          {ALL_NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-md px-[0.75rem] py-[0.75rem] text-[0.9375rem] font-medium transition-colors',
                  active
                    ? 'bg-[#eef2f8] text-[#3b6db5]'
                    : 'text-[#2a2a2a] hover:bg-[#f5f5f5] hover:text-[#1e3a6e]',
                )}
              >
                {t(item.key)}
              </Link>
            )
          })}
        </nav>
        <div className='border-t border-[#e8e8e8] px-[1.25rem] py-[1rem]'>
          <LocaleSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  )
}
