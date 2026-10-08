'use client'

import LocaleSwitcher from '@/layouts/header/components/locale-switcher'
import Logo from '@/layouts/header/components/logo'
import NavLink from '@/layouts/header/components/nav-link'
import { LEFT_NAV, RIGHT_NAV } from '@/layouts/header/data'
export default function DesktopNav() {
  return (
    <nav
      aria-label='Primary'
      className='w-full xsm:hidden'
    >
      <div className='grid w-full grid-cols-[1fr_auto_1fr] items-center'>
        <ul className='flex items-center justify-between'>
          {LEFT_NAV.map((item) => (
            <li key={item.key}>
              <NavLink item={item} />
            </li>
          ))}
        </ul>

        <Logo className='mx-[4rem]' />

        <ul className='flex items-center justify-between'>
          {RIGHT_NAV.map((item) => (
            <li key={item.key}>
              <NavLink item={item} />
            </li>
          ))}
          <li>
            <LocaleSwitcher />
          </li>
        </ul>
      </div>
    </nav>
  )
}
