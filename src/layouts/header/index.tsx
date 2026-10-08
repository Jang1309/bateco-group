'use client'

import { useRef } from 'react'

import DesktopNav from '@/components/layouts/header/components/desktop-nav'
import { useScrollHeader } from '@/hooks/use-scroll-header'
import MobileBar from '@/layouts/header/components/mobile-bar'

const Header = () => {
  const headerRef = useRef<HTMLElement>(null)

  useScrollHeader(headerRef as React.RefObject<HTMLElement>)
  return (
    <header
      ref={headerRef}
      className='fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ease-in-out '
    >
      <div className='mx-auto flex h-[5.5rem] max-w-[95rem] items-center xsm:h-[6.5rem]'>
        <MobileBar />
        <DesktopNav />
      </div>
    </header>
  )
}

export default Header
