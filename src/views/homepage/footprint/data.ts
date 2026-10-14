export type LabelSide = 'top' | 'bottom' | 'left' | 'right'

export type MapPoint = {
  name: string
  lat: number
  lon: number
  /** Vị trí nhãn so với chấm, mặc định 'bottom' */
  label?: LabelSide
  /** Độ cong của đường nối (âm để cong ngược chiều), mặc định 0.22 */
  curve?: number
}

// Điểm gốc: mọi đường nối đều xuất phát từ đây
export const ORIGIN: MapPoint = { name: 'Hà Nội', lat: 21.0285, lon: 105.8542, label: 'left' }

// Thêm điểm mới chỉ cần thêm 1 dòng kinh/vĩ độ, đường nối + chấm sẽ tự vẽ
export const POINTS: MapPoint[] = [
  { name: 'Lai Châu', lat: 22.3964, lon: 103.4582 },
  { name: 'Quảng Ninh', lat: 21.25, lon: 107.55, label: 'right' },
  { name: 'TP. Hồ Chí Minh', lat: 10.7769, lon: 106.7009 },
  { name: 'Đà Nẵng', lat: 16.0678, lon: 108.2205 },
]

// Khung nhìn của public/vn.svg (phải khớp thuộc tính viewBox trong file)
export const VIEWBOX = { x: 270, y: 30, width: 840, height: 1010 } as const

// Phép chiếu Mercator của public/vn.svg, suy ra từ 3 điểm tham chiếu trong file
const PROJECTION = { a: -5728.1583, b: 58.866601, c: 1460.68508, d: 3372.63151 } as const

export function project({ lat, lon }: Pick<MapPoint, 'lat' | 'lon'>) {
  const { a, b, c, d } = PROJECTION
  // Làm tròn để kết quả giống hệt nhau giữa server và client (tránh lệch hydrate)
  return {
    x: round(a + b * lon),
    y: round(c - d * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))),
  }
}

const round = (value: number) => Math.round(value * 100) / 100
