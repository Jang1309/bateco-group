'use client'

import { SWRConfig } from 'swr'

import fetchData from '@/fetches/fetchData'

const swrFetcher = (api: string) => fetchData({ api })

export function SwrProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: swrFetcher,
        revalidateOnFocus: false,
        keepPreviousData: true,
        dedupingInterval: 2000,
      }}
    >
      {children}
    </SWRConfig>
  )
}
