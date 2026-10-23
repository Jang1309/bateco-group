'use client'

import { useId } from 'react'

import type { Header, HeaderMenuItem } from '@/interfaces/siteSetting.interface'
import LocaleSwitcher from '@/layouts/header/components/locale-switcher'
import Logo from '@/layouts/header/components/logo'
import NavLink from '@/layouts/header/components/nav-link'
import { MegaLayer, MegaTrigger, useMegaMenu } from '@/layouts/header/components/nav-mega'

const itemKey = (item: HeaderMenuItem, index: number) => item.link?.url || String(index)

const hasMega = (item: HeaderMenuItem) =>
  Boolean(
    item.has_submenu && Array.isArray(item.submenu?.navigation) && item.submenu.navigation.length,
  )

export default function DesktopNav({ header }: { header?: Header }) {
  const panelId = useId()
  const { openKey, show, keep, hideSoon, close } = useMegaMenu()
  const left = header?.menu_left?.main_navigation
  const right = header?.menu_right?.main_navigation

  const renderItem = (item: HeaderMenuItem, index: number) => {
    const key = itemKey(item, index)

    return (
      <li key={key}>
        {hasMega(item) ? (
          <MegaTrigger
            item={item}
            open={openKey === key}
            panelId={panelId}
            onShow={() => show(key)}
            onHide={hideSoon}
          />
        ) : (
          <NavLink link={item.link} />
        )}
      </li>
    )
  }

  return (
    <nav
      aria-label='Primary'
      className='w-full xsm:hidden'
    >
      <div className='grid w-full grid-cols-[1fr_auto_1fr] items-center'>
        <ul className='flex items-center justify-between'>{left?.map(renderItem)}</ul>

        <Logo
          className='mx-[4rem]'
          logo={header?.logo}
          logoWhite={header?.logo_white}
        />

        <ul className='flex items-center justify-between'>
          {right?.map(renderItem)}
          <li>
            <LocaleSwitcher />
          </li>
        </ul>
      </div>

      <MegaLayer
        items={[...(left ?? []), ...(right ?? [])]}
        openKey={openKey}
        panelId={panelId}
        onKeep={keep}
        onHide={hideSoon}
        onClose={close}
      />
    </nav>
  )
}
