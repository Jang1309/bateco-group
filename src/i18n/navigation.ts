import { createNavigation } from 'next-intl/navigation'
import type { ComponentProps } from 'react'

import { routing } from '@/i18n/routing'

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)

/** Typed href for next-intl Link; CMS URLs are runtime strings outside the static path union. */
export type AppHref = ComponentProps<typeof Link>['href']

export const toAppHref = (url: string): AppHref => url as AppHref
