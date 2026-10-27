/**
 * Bottom curve — Figma 904:1074 (1280×140).
 * Paths composed into one viewBox so strokes stay locked to the fill.
 */
export function PreloaderWaveDecor() {
  return (
    <svg
      viewBox='0 0 1280 140'
      preserveAspectRatio='none'
      className='absolute inset-0 size-full'
      aria-hidden
    >
      <defs>
        <linearGradient
          id='preloader-wave-fill'
          x1='640'
          y1='38'
          x2='640'
          y2='140'
          gradientUnits='userSpaceOnUse'
        >
          <stop
            stopColor='#081B33'
            stopOpacity='0.98'
          />
          <stop
            offset='1'
            stopColor='#030B14'
          />
        </linearGradient>
        <linearGradient
          id='preloader-wave-gold'
          x1='0'
          y1='40'
          x2='1280'
          y2='40'
          gradientUnits='userSpaceOnUse'
        >
          <stop
            stopColor='#C29828'
            stopOpacity='0.95'
          />
          <stop
            offset='0.2'
            stopColor='#FFF2A3'
          />
          <stop
            offset='0.45'
            stopColor='#E5A93C'
          />
          <stop
            offset='0.7'
            stopColor='#FFF7C7'
          />
          <stop
            offset='1'
            stopColor='#B8860B'
            stopOpacity='0.95'
          />
        </linearGradient>
      </defs>

      {/* Fill — local path shifted +38 (top inset 27.14% of 140) */}
      <path
        d='M0 86C306.667 138 960 140 1280 38V140H0V86Z'
        fill='url(#preloader-wave-fill)'
      />

      {/* Gold strokes — same shift as Figma layer tops 38 / 49 / 60 */}
      <path
        d='M0.35 87.98C307.02 139.98 960.35 141.98 1280.35 39.98'
        fill='none'
        stroke='url(#preloader-wave-gold)'
        strokeWidth='4.17'
        strokeLinecap='round'
      />
      <path
        d='M0.13 96.79C313.47 146.79 966.8 148.79 1280.13 49.79'
        fill='none'
        stroke='url(#preloader-wave-gold)'
        strokeWidth='1.67'
        strokeLinecap='round'
        opacity='0.8'
      />
      <path
        d='M0.07 106.48C320.07 154.48 973.41 156.48 1280.07 60.48'
        fill='none'
        stroke='url(#preloader-wave-gold)'
        strokeWidth='1'
        strokeLinecap='round'
        opacity='0.55'
      />
    </svg>
  )
}
