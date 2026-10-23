export type LabelSide = 'top' | 'bottom' | 'left' | 'right'

export type MapPoint = {
  name: string
  lat: number
  lon: number
  label?: LabelSide
  curve?: number
}

/** Khung nhìn của public/vn.svg (khớp viewBox trong file) */
export const VIEWBOX = { x: 270, y: 30, width: 840, height: 1010 } as const

/** Phép chiếu Mercator của public/vn.svg */
const PROJECTION = { a: -5728.1583, b: 58.866601, c: 1460.68508, d: 3372.63151 } as const

const round = (value: number) => Math.round(value * 100) / 100

export function project({ lat, lon }: Pick<MapPoint, 'lat' | 'lon'>) {
  const { a, b, c, d } = PROJECTION
  return {
    x: round(a + b * lon),
    y: round(c - d * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))),
  }
}
