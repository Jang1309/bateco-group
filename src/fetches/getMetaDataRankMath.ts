import { CACHE_TAGS, cacheNext } from '@/configs/cache'
import ENV from '@/configs/env'
import parseRankMathHead from '@/utils/parseRankMathHead'

export default async function getMetaDataRankMath(slug: string) {
  try {
    const res = await fetch(
      `${ENV.CMS ?? ''}${ENV.API ?? ''}rankmath/v1/getHead?url=${ENV.CMS ?? ''}${slug}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: cacheNext(CACHE_TAGS.rankmath),
      },
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!data?.success || !data?.head) return null
    return parseRankMathHead(data.head)
  } catch {
    return null
  }
}
