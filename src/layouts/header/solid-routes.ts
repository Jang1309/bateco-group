import ROUTES from '@/configs/routes'

/**
 * Trang dùng header nền trắng khi ở đầu trang, nằm trên banner (không đè ảnh).
 * Cuộn xuống vẫn chuyển sang nền xanh như header trang chủ.
 * Thêm route vào mảng này khi cần cùng kiểu header.
 */
export const SOLID_HEADER_ROUTES = [ROUTES.business] as const

export function isSolidHeaderRoute(pathname: string) {
  return SOLID_HEADER_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))
}
