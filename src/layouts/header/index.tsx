'use client'

import { useRef } from 'react'

import DesktopNav from '@/components/layouts/header/components/desktop-nav'
import { useScrollHeader } from '@/hooks/use-scroll-header'
import { usePathname } from '@/i18n/navigation'
import MobileBar from '@/layouts/header/components/mobile-bar'
import { isSolidHeaderRoute } from '@/layouts/header/solid-routes'
import { cn } from '@/lib/utils'

const Header = () => {
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const solid = isSolidHeaderRoute(pathname)

  useScrollHeader(headerRef, { solid })

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ease-in-out',
          solid && 'bg-white shadow-[0_1px_0_#e8edf5]',
        )}
      >
        <div className='mx-auto flex h-[5.5rem] max-w-[95rem] items-center xsm:h-[6.5rem]'>
          <MobileBar />
          <DesktopNav />
        </div>
      </header>
      {solid ? (
        <div
          aria-hidden
          className='h-[5.5rem] xsm:h-[6.5rem]'
        />
      ) : null}
    </>
  )
}

export default Header
