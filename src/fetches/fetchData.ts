/* eslint-disable @typescript-eslint/no-explicit-any */

import { CACHE_REVALIDATE } from '@/configs/cache'
import ENV from '@/configs/env'

export type RequestPostGuest = {
  api: string
  headers?: any
  option?: any
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'
  notJson?: boolean
}

export default async function fetchData(request: RequestPostGuest) {
  const method = request.method || 'GET'
  const { next, ...restOption } = request.option ?? {}

  try {
    const res = await fetch(`${ENV.CMS}${ENV.API!}${request.api}`, {
      method,
      headers: {
        ...(!request.notJson && { 'Content-Type': 'application/json' }),
        ...request.headers,
      },
      ...restOption,
      // GET: Data Cache opt-in (Next 16). Default TTL; override via option.next
      ...(method === 'GET' && {
        next: {
          revalidate: CACHE_REVALIDATE,
          ...next,
        },
      }),
    })

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    return res.json()
  } catch (error: unknown) {
    // Convert the error to a string or handle based on its type
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`${ENV.CMS}${ENV.API!}${request.api}: ${errorMessage}`)
  }
}
