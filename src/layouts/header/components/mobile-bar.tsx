'use client'

import Logo from './logo'
import MobileMenu from './mobile-menu'

export default function MobileBar() {
  return (
    <div className='hidden w-full items-center justify-between xsm:flex'>
      <Logo />
      <MobileMenu />
    </div>
  )
}
