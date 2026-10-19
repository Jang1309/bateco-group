'use client'

import Logo from './logo'
import MobileMenu from './mobile-menu'

export default function MobileBar() {
  return (
    <div className='hidden w-full items-center justify-between px-[1.25rem] xsm:flex'>
      <Logo imageClassName='xsm:h-[2.5rem]' />
      <MobileMenu />
    </div>
  )
}
