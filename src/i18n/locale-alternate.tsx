'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import type { AppLocale } from '@/configs/routes'

type LocalePaths = Partial<Record<AppLocale, string>>

type LocaleAlternateContextValue = {
  paths: LocalePaths | null
  setPaths: (paths: LocalePaths | null) => void
}

const LocaleAlternateContext = createContext<LocaleAlternateContextValue | null>(null)

export function LocaleAlternateProvider({ children }: { children: ReactNode }) {
  const [paths, setPathsState] = useState<LocalePaths | null>(null)

  const setPaths = useCallback((next: LocalePaths | null) => {
    setPathsState(next)
  }, [])

  const value = useMemo(() => ({ paths, setPaths }), [paths, setPaths])

  return <LocaleAlternateContext.Provider value={value}>{children}</LocaleAlternateContext.Provider>
}

export function useLocaleAlternate() {
  const ctx = useContext(LocaleAlternateContext)
  if (!ctx) {
    return {
      paths: null as LocalePaths | null,
      setPaths: (_paths: LocalePaths | null) => {},
    }
  }
  return ctx
}

/** Register translated detail paths for the locale switcher (clears on unmount). */
export function LocaleAlternateSync({ paths }: { paths: LocalePaths }) {
  const { setPaths } = useLocaleAlternate()
  const key = `${paths.vi ?? ''}|${paths.en ?? ''}`

  useEffect(() => {
    setPaths(paths)
    return () => setPaths(null)
  }, [key, paths, setPaths])

  return null
}
