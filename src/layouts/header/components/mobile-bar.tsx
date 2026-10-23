'use client'

import type { Header } from '@/interfaces/siteSetting.interface'

import Logo from './logo'
import MobileMenu from './mobile-menu'

export default function MobileBar({ header }: { header?: Header }) {
  return (
    <div className='hidden w-full items-center justify-between px-[1.25rem] xsm:flex'>
      <Logo
        logo={header?.logo}
        logoWhite={header?.logo_white}
        imageClassName='xsm:h-[2.5rem]'
      />
      <MobileMenu header={header} />
    </div>
  )
}
