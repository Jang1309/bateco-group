'use client'

import { SWRConfig } from 'swr'

async function swrFetcher(api: string) {
  const res = await fetch(`/api/cms?api=${encodeURIComponent(api)}`)
  if (!res.ok) {
    throw new Error(`SWR fetch failed: ${res.status}`)
  }
  return res.json()
}

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
