'use client'

import { useRef } from 'react'

import { useScrollHeader } from '@/hooks/use-scroll-header'
import type { Header as HeaderData } from '@/interfaces/siteSetting.interface'
import DesktopNav from '@/layouts/header/components/desktop-nav'
import MobileBar from '@/layouts/header/components/mobile-bar'

const Header = ({ header }: { header?: HeaderData }) => {
  const headerRef = useRef<HTMLElement>(null)

  useScrollHeader(headerRef)

  return (
    <header
      ref={headerRef}
      className='fixed inset-x-0 top-0 z-50 w-full bg-transparent transition-all duration-300 ease-in-out'
    >
      <div className='mx-auto flex h-[5.5rem] max-w-[95rem] items-center xsm:h-[4.5rem]'>
        <MobileBar header={header} />
        <DesktopNav header={header} />
      </div>
    </header>
  )
}

export default Header
