# Bateco Group

Website tập đoàn Bateco. Next.js 16, App Router, hai ngôn ngữ `vi` (mặc định, không prefix) và `en` (`/en/...`).

Package manager: **pnpm**. Alias `@/*` trỏ vào `src/*`.

---

## 1. Chạy dự án

```bash
pnpm install
pnpm dev
```

| Script | Việc làm |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` | `lint:fix`, format toàn repo, rồi `next build` |
| `pnpm start` | Chạy bản standalone sau khi build |
| `pnpm lint` / `pnpm lint:fix` | ESLint |
| `pnpm format` / `pnpm format:check` | Prettier |

Xem kích thước bundle (Next 16 không in cột Size / First Load JS trong log build):

```bash
ANALYZE=true pnpm build
```

Biến môi trường (`src/configs/env.ts`):

| Biến | Dùng cho |
| --- | --- |
| `NEXT_PUBLIC_DOMAIN` | Domain public |
| `NEXT_PUBLIC_CMS` | Origin CMS |
| `NEXT_PUBLIC_API` | Prefix API |

Build dùng `output: 'standalone'`.

---

## 2. Stack

| Nhóm | Công nghệ |
| --- | --- |
| Core | Next.js 16 (App Router), React 19, TypeScript |
| Style | Tailwind CSS 4, shadcn/ui, font Arimo |
| i18n | next-intl |
| Data | TanStack Query, nuqs |
| Motion | Lenis, AOS, GSAP, Motion |
| Forms | react-hook-form + zod |
| Ảnh | `next/image`, format webp |

---

## 3. Cấu trúc

```text
src/
  app/                         # Route, layout, metadata
    layout.tsx                 # Font, Query, nuqs, Lenis, AOS
    [locale]/
      layout.tsx               # Header + page + Footer
      page.tsx                 # Trang chủ
      (vi)/linh-vuc-kinh-doanh/
        page.tsx               # Danh sách lĩnh vực
        [slug]/page.tsx        # Chi tiết một lĩnh vực
      [...rest]/page.tsx       # Route lạ → notFound()
  views/                       # UI theo trang, không chứa routing
    homepage/                  # Mỗi section một folder
    business/
    business-detail/
  layouts/                     # Header, footer dùng mọi trang
  components/
    ui/                        # shadcn
    shared/                    # Banner, slider dùng lại giữa các trang
    providers/                 # Query, Lenis, AOS, Drawer, Sheet
  configs/                     # env, endpoints, ROUTES
  fetches/                     # HTTP CMS, Rank Math, CF7
  services/                    # Bọc domain (vd. tour)
  i18n/                        # routing, request, navigation
  hooks/
  lib/                         # cn()
  styles/globals.css
  proxy.ts                     # next-intl middleware (Next 16)
messages/
  vi.json
  en.json
public/                        # Ảnh, logo, svg
```

`(vi)` là route group: **không** xuất hiện trên URL. Trang lĩnh vực vẫn là `/linh-vuc-kinh-doanh`, bản tiếng Anh là `/en/business-sectors`.

Page chỉ làm routing và metadata. Phần nhìn thấy nằm trong `src/views`.

---

## 4. Luồng request

```text
Request
  → src/proxy.ts                    # locale + pathname
  → src/app/layout.tsx              # Query → nuqs → Lenis → AOS
  → src/app/[locale]/layout.tsx     # setRequestLocale, Header, Footer
  → page.tsx                        # render view
```

Locale không có trong `routing.locales` thì `notFound()`. Route chưa có page rơi vào `[...rest]` rồi cũng `notFound()`.

---

## 5. Trang

### Đang có UI

| Việc | URL vi | URL en | View |
| --- | --- | --- | --- |
| Trang chủ | `/` | `/en` | `views/homepage` |
| Lĩnh vực kinh doanh | `/linh-vuc-kinh-doanh` | `/en/business-sectors` | `views/business` |
| Chi tiết lĩnh vực | `/linh-vuc-kinh-doanh/[slug]` | `/en/business-sectors/[slug]` | `views/business-detail` |

Slug chi tiết lấy từ `SECTOR_DETAILS` trong `views/business-detail/data.ts`. `dynamicParams = false`: slug lạ trả 404. Năm slug hiện tại:

- `dich-vu-cong-nghiep`
- `bat-dong-san-ha-tang-cong-nghiep`
- `an-ninh-quoc-phong`
- `kinh-te-xanh-phat-trien-ben-vung`
- `san-xuat-vat-lieu-moi`

### Đã khai báo route, chưa có page

Menu và `ROUTES` đã trỏ tới các path này. Vào link sẽ 404 cho đến khi có `page.tsx`:

| Key | Internal pathname | URL en |
| --- | --- | --- |
| `about` | `/gioi-thieu` | `/en/about` |
| `investor` | `/quan-he-nha-dau-tu` | `/en/investor-relations` |
| `projects` | `/du-an` | `/en/projects` |
| `news` | `/tin-tuc` | `/en/news` |
| `careers` | `/co-hoi-nghe-nghiep` | `/en/careers` |
| `contact` | `/lien-he` | `/en/contact` |

### Trang chủ

`views/homepage/index.tsx` ghép lần lượt:

1. `banner` — hero, dùng shared `Banner`
2. `news`
3. `brand`
4. `journey` — timeline
5. `vision`
6. `investment`
7. `footprint` — bản đồ
8. `partners`
9. `projects`

### Lĩnh vực kinh doanh

`views/business`: `hero` rồi `sectors`. Mỗi hàng ngành là `sectors/components/row.tsx`, link sang trang chi tiết bằng slug.

### Chi tiết lĩnh vực

`views/business-detail` nhận `sector` và ghép: `hero`, `intro`, `projects`, `ecosystem`, `cta`. Tiêu đề section dùng chung nằm ở `components/section-heading.tsx`.

---

## 6. Cách tách view

Làm giống trang chủ: một section một folder, `index.tsx` là khung, mảnh bên trong để trong `components/`.

```text
src/views/business/
  index.tsx
  data.ts
  hero/
    index.tsx
    components/content.tsx
  sectors/
    index.tsx
    components/row.tsx
```

`index.tsx` của trang chỉ import các section, không nhét markup vào page.

```tsx
import BusinessHero from '@/views/business/hero'
import BusinessSectors from '@/views/business/sectors'

const BusinessView = () => (
  <main>
    <BusinessHero />
    <BusinessSectors />
  </main>
)
```

Data tĩnh (danh sách ngành, dự án, copy chưa qua CMS) để cạnh view, file `data.ts`.

---

## 7. Banner dùng chung

`src/components/shared/banner`. Trang chủ bọc nó ở `views/homepage/banner` để lấy bản dịch.

`showButton` mặc định `false`. Bật nút thì truyền thêm `primary` và/hoặc `secondary`.

```tsx
import Banner from '@/components/shared/banner'
import ROUTES from '@/configs/routes'

<Banner
  imageSrc='/home/d-banner.png'
  eyebrow='BATECO GROUP'
  titleLine1='KHÁM PHÁ'
  titleLine2='ĐỂ DẪN ĐẦU'
  description='...'
  showButton
  primary={{ href: ROUTES.about, label: 'KHÁM PHÁ BATECO' }}
  secondary={{ href: '#ecosystem', label: 'HỆ SINH THÁI ĐẦU TƯ' }}
/>
```

`primary.href` là pathname nội bộ (qua `Link` của next-intl). `secondary.href` là URL thường, kể cả anchor `#...`.

`srTitle` là `h1` chỉ cho screen reader. Không truyền thì banner không thêm `h1` — trang khác nên có `h1` riêng.

---

## 8. Header và footer

Header: `src/layouts/header`. Footer: `src/layouts/footer`. Cả hai gắn trong `[locale]/layout.tsx`.

Menu: `layouts/header/data.ts` (`LEFT_NAV`, `RIGHT_NAV`). Copy nằm ở namespace `Header` trong `messages/*.json`.

Hai kiểu header:

| Trang | Lúc ở đầu | Khi cuộn quá 80px |
| --- | --- | --- |
| Trang chủ | Trong suốt, đè lên banner | Nền xanh `rgba(31, 56, 100, 0.9)`, chữ và logo trắng, có blur. Kéo xuống thì header trượt lên, kéo lên thì hiện lại |
| Route trong `SOLID_HEADER_ROUTES` | Nền trắng, banner bắt đầu bên dưới header | Cùng kiểu xanh như trang chủ |

Thêm trang header trắng: sửa `src/layouts/header/solid-routes.ts`.

```ts
export const SOLID_HEADER_ROUTES = [ROUTES.business, ROUTES.about] as const
```

Dùng pathname nội bộ (`/linh-vuc-kinh-doanh`), không viết URL tiếng Anh. `usePathname` của next-intl trả pathname nội bộ, nên `/en/business-sectors` vẫn khớp. Route con (`/linh-vuc-kinh-doanh/[slug]`) cũng được tính.

---

## 9. i18n

Cấu hình: `src/i18n/routing.ts`.

| | |
| --- | --- |
| Locales | `vi`, `en` |
| Mặc định | `vi` |
| Prefix | `as-needed` — `/` là tiếng Việt, `/en` là tiếng Anh |
| Detect | tắt (`localeDetection: false`) |

Link nội bộ luôn lấy từ `@/i18n/navigation`, không dùng `next/link`.

```tsx
import { Link } from '@/i18n/navigation'
import ROUTES from '@/configs/routes'

<Link href={ROUTES.business}>Lĩnh vực</Link>

<Link
  href={{ pathname: '/linh-vuc-kinh-doanh/[slug]', params: { slug: 'dich-vu-cong-nghiep' } }}
>
  Xem thêm
</Link>
```

`ROUTES` và key trong `pathnames` là pathname nội bộ. next-intl tự đổi sang URL public theo locale.

Đổi ngôn ngữ: `LocaleSwitcher` gọi `router.replace(pathname, { locale })`.

### Messages

- `messages/vi.json`, `messages/en.json`
- Load ở `src/i18n/request.ts`
- Server: `getTranslations('Banner')` hoặc `useTranslations` trong client
- Namespace đang dùng gồm `Header`, `Banner`, `HomeNews`, phần footer

Không viết `{tên}` trong chuỗi dịch nếu không truyền biến. next-intl coi đó là placeholder ICU và sẽ lỗi.

---

## 10. Thêm một trang

1. Khai báo pathname trong `src/i18n/routing.ts` nếu URL hai ngôn ngữ khác nhau.
2. Thêm key vào `src/configs/routes.ts`.
3. Thêm mục menu trong `src/layouts/header/data.ts` nếu cần hiện trên header.
4. Tạo view:

```text
src/views/ten-trang/index.tsx
src/views/ten-trang/hero/index.tsx
src/views/ten-trang/hero/components/content.tsx
```

5. Tạo page. Page server đọc `params` bằng `await`, gọi `setRequestLocale` trước khi dùng next-intl.

```tsx
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import ExampleView from '@/views/example'

export const metadata: Metadata = {
  title: 'Tiêu đề | Bateco Group',
}

type Props = {
  params: Promise<{ locale: string }>
}

const ExamplePage = async ({ params }: Props) => {
  const { locale } = await params
  setRequestLocale(locale)
  return <ExampleView />
}

export default ExamplePage
```

Đặt file tại `src/app/[locale]/ten-trang/page.tsx`. Route group chỉ dùng khi cần chung layout mà không muốn thêm đoạn URL.

6. Copy mới thì thêm cả `vi.json` và `en.json`.
7. Trang không muốn header đè banner: thêm `ROUTES` tương ứng vào `SOLID_HEADER_ROUTES`.

---

## 11. Data

```text
configs/  →  fetches/  →  services/  →  page hoặc view
```

| Tầng | Vai trò |
| --- | --- |
| `configs/env.ts` | `DOMAIN`, `CMS`, `API` |
| `configs/endpoints.ts` | Path API |
| `fetches/fetchData.ts` | `fetch` tới CMS |
| `services/*` | Hàm theo domain, vd. `tourService.getTours()` |

Nội dung đang hiển thị (ngành, tin, dự án, đối tác) là data tĩnh trong `views/**/data.ts`, chưa lấy từ CMS.

Server Component:

```tsx
import tourService from '@/services/tour'

const tours = await tourService.getTours()
```

Client, TanStack Query:

```tsx
'use client'
import { useQuery } from '@tanstack/react-query'
import tourService from '@/services/tour'

const { data } = useQuery({
  queryKey: ['tours'],
  queryFn: () => tourService.getTours(),
})
```

`QueryProvider` gắn ở root. URL state dùng nuqs, `NuqsAdapter` cũng ở root:

```tsx
'use client'
import { useQueryState } from 'nuqs'

const [q, setQ] = useQueryState('q')
```

---

## 12. Provider

| Provider | File | Gắn ở |
| --- | --- | --- |
| TanStack Query | `components/providers/query-provider.tsx` | root layout |
| nuqs | `nuqs/adapters/next/app` | root layout |
| Lenis | `components/providers/lenis-provider.tsx` | root layout |
| AOS | `components/providers/aos-provider.tsx` | root layout |
| Drawer / Sheet | `drawer-provider.tsx`, `sheet-provider.tsx` | khi cần |

AOS khởi tạo một lần: 900ms, `ease-out-cubic`, `once: true`. `prefers-reduced-motion: reduce` thì tắt animation. Đổi route thì `refreshHard()` để bắt phần tử mới.

Animation riêng của trang lĩnh vực là `business-rise` trong `globals.css` (lên khoảng `1.25rem`). Hero trang đó không dùng AOS vì `transform` làm vỡ chữ gradient; dùng class `business-hero-rise` và `business-hero-fade`.

Lenis:

```tsx
'use client'
import { useLenis } from 'lenis/react'

const lenis = useLenis()
```

---

## 13. UI

- Primitive: `src/components/ui/*`, thêm bằng CLI shadcn (`components.json`)
- Dùng lại giữa các trang: `src/components/shared/*`
- Class: `import { cn } from '@/lib/utils'`
- Ảnh tĩnh để trong `public/`, dẫn bằng path tuyệt đối (`/home/d-banner.png`, `/header/d-logo.png`)

---

## 14. SEO và form CMS

| File | Việc |
| --- | --- |
| `fetches/getMetaDataRankMath.ts` | Lấy head Rank Math |
| `utils/parseRankMathHead.ts` | Parse HTML head |
| `utils/metadataValues.ts` | Map sang metadata Next |
| `fetches/cf7Request.ts` | Gửi Contact Form 7 |
| `app/robots.ts` | robots.txt |

Metadata từng trang export từ `page.tsx` (`title`, `description`, hoặc `generateMetadata` khi phụ thuộc slug).

---

## 15. Lỗi và 404

| File | Khi nào |
| --- | --- |
| `[locale]/not-found.tsx` | `notFound()` trong locale |
| `app/not-found.tsx` | 404 ngoài cây locale |
| `[locale]/error.tsx` | Lỗi runtime trong locale |
| `app/global-error.tsx` | Lỗi root, tự render `html` / `body` |

---

## 16. Quy ước

1. Page nằm trong `app/[locale]/…`. View nằm trong `views/`. Không viết UI dài trong `page.tsx`.
2. Server Component gọi `setRequestLocale(locale)` trước next-intl.
3. Điều hướng bằng `@/i18n/navigation` và pathname nội bộ.
4. Không để `{biến}` trong JSON nếu không truyền giá trị.
5. Gọi CMS qua `services` → `fetches`. Không gắn URL CMS trong page.
6. Client-only (Lenis, Query, nuqs, AOS hook) thì `'use client'`.
7. Section mới: folder + `index.tsx` + `components/` cho phần con.
8. Header trắng, không đè banner: thêm route vào `SOLID_HEADER_ROUTES`.
