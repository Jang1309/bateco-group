import { CACHE_TAGS, cacheNext } from '@/configs/cache'
import ENV from '@/configs/env'
import parseRankMathHead from '@/utils/parseRankMathHead'

async function parseSeoHeadResponse(res: Response) {
  if (!res.ok) return null
  const data = await res.json()
  if (!data?.success || !data?.head) return null
  return parseRankMathHead(data.head)
}

/** RankMath head by CMS page URL path, e.g. `/linh-vuc-kinh-doanh`. */
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
    return parseSeoHeadResponse(res)
  } catch {
    return null
  }
}

/** SEO head from custom CMS API path, e.g. `api/v1/seo/head-term/{slug}?lang=vi`. */
export async function getMetaDataSeoApi(api: string) {
  try {
    const res = await fetch(`${ENV.CMS ?? ''}${ENV.API ?? ''}${api}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: cacheNext(CACHE_TAGS.rankmath),
    })
    return parseSeoHeadResponse(res)
  } catch {
    return null
  }
}
