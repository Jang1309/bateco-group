/**
 * Logo BATECO dạng SVG — dựng từ glyph Montserrat Bold, căn theo /header/d-logo.png (523×143).
 * Bản file tĩnh: /header/d-logo.svg. Mỗi chữ một path để preloader vẽ nét lần lượt (DrawSVG).
 */
export const LOGO_NAVY = '#1F3864'
export const LOGO_GOLD = '#CBA62F'

const LETTERS = [
  {
    id: 'B',
    d: 'M85 62.26Q85 72.25 77.54 77.63Q70.08 83 55.78 83H18V7H53.69Q67.05 7 74.2 12.32Q81.35 17.64 81.35 26.76Q81.35 32.3 78.79 36.64Q76.23 40.98 71.64 43.48Q77.9 45.54 81.45 50.37Q85 55.21 85 62.26ZM34.8 20.25V38.16H51.6Q57.87 38.16 61.1 35.88Q64.34 33.6 64.34 29.15Q64.34 24.7 61.1 22.47Q57.87 20.25 51.6 20.25ZM67.99 60.42Q67.99 50.97 54.53 50.97H34.8V69.75H54.53Q61.21 69.75 64.6 67.47Q67.99 65.19 67.99 60.42Z',
  },
  {
    id: 'A',
    d: 'M146.65 66.71H113.95L107.71 83H91L122.4 7H138.5L170 83H152.89ZM141.52 53.36 130.35 24.26 119.18 53.36Z',
  },
  { id: 'T', d: 'M187.97 21.33H163V7H231V21.33H206.03V83H187.97Z' },
  { id: 'E', d: 'M298 68.89V83H241V7H296.63V21.11H257.93V37.62H292.11V51.3H257.93V68.89Z' },
  {
    id: 'C',
    d: 'M309 45Q309 33.71 314.26 24.75Q319.52 15.79 328.72 10.75Q337.91 5.7 349.39 5.7Q359.06 5.7 366.87 9.17Q374.69 12.65 380 19.16L368.95 29.58Q361.4 20.68 350.24 20.68Q343.33 20.68 337.91 23.77Q332.49 26.87 329.46 32.41Q326.43 37.94 326.43 45Q326.43 52.06 329.46 57.59Q332.49 63.13 337.91 66.23Q343.33 69.32 350.24 69.32Q361.4 69.32 368.95 60.31L380 70.73Q374.69 77.35 366.82 80.83Q358.96 84.3 349.28 84.3Q337.91 84.3 328.72 79.25Q319.52 74.21 314.26 65.25Q309 56.29 309 45Z',
  },
  {
    id: 'O',
    d: 'M386 45Q386 33.82 391.3 24.86Q396.6 15.9 405.96 10.8Q415.33 5.7 427 5.7Q438.67 5.7 447.98 10.8Q457.3 15.9 462.65 24.86Q468 33.82 468 45Q468 56.18 462.65 65.14Q457.3 74.1 447.98 79.2Q438.67 84.3 427 84.3Q415.33 84.3 405.96 79.2Q396.6 74.1 391.3 65.14Q386 56.18 386 45ZM450.44 45Q450.44 37.94 447.39 32.41Q444.34 26.87 438.99 23.77Q433.64 20.68 427 20.68Q420.36 20.68 415.01 23.77Q409.66 26.87 406.61 32.41Q403.56 37.94 403.56 45Q403.56 52.06 406.61 57.59Q409.66 63.13 415.01 66.23Q420.36 69.32 427 69.32Q433.64 69.32 438.99 66.23Q444.34 63.13 447.39 57.59Q450.44 52.06 450.44 45Z',
  },
] as const

// Vạch dưới chữ; index 2 là vạch vàng nhô lên
const BARS = [
  { x: 3, y: 124, fill: LOGO_NAVY },
  { x: 101, y: 124, fill: LOGO_NAVY },
  { x: 199, y: 117, fill: LOGO_GOLD },
  { x: 297, y: 124, fill: LOGO_NAVY },
  { x: 394, y: 124, fill: LOGO_NAVY },
] as const

export function PreloaderLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 523 143'
      fill='none'
      role='img'
      aria-label='Bateco'
      className={className}
    >
      {/* Nét cuối 0.8 cho đậm bằng PNG gốc; preloader tween stroke dày → 0.8 khi đổ màu */}
      {LETTERS.map((letter) => (
        <path
          key={letter.id}
          data-preloader-logo-letter
          fill={LOGO_NAVY}
          stroke={LOGO_NAVY}
          strokeWidth='0.8'
          strokeLinejoin='round'
          d={letter.d}
        />
      ))}
      <circle
        data-preloader-logo-reg
        cx='509.25'
        cy='20.5'
        r='8.75'
        stroke={LOGO_NAVY}
        strokeWidth='1.6'
      />
      <path
        data-preloader-logo-reg
        fill={LOGO_NAVY}
        d='M510.95 25 509.21 22.49H509.11H507.3V25H505.21V16H509.11Q510.31 16 511.19 16.4Q512.07 16.8 512.54 17.53Q513.02 18.26 513.02 19.27Q513.02 20.27 512.54 20.99Q512.05 21.72 511.17 22.11L513.19 25ZM508.99 17.7H507.3V20.83H508.99Q509.93 20.83 510.42 20.42Q510.91 20.01 510.91 19.27Q510.91 18.51 510.42 18.1Q509.93 17.7 508.99 17.7Z'
      />
      {/* Clip tại đáy vạch để vạch được đẩy từ dưới lên như trồi khỏi mặt nền */}
      <clipPath id='preloader-logo-bars-clip'>
        <rect
          width='523'
          height='138'
        />
      </clipPath>
      <g clipPath='url(#preloader-logo-bars-clip)'>
        {BARS.map((bar) => (
          <rect
            key={bar.x}
            data-preloader-logo-bar
            x={bar.x}
            y={bar.y}
            width='90'
            height='14'
            fill={bar.fill}
          />
        ))}
      </g>
    </svg>
  )
}
