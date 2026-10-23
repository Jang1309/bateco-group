export const BRAND_FRAME = 'M0 226.5H331.717L445.5 82.8172L408.5 0H0V226.5Z'
export const BRAND_FRAME_FLIP = 'M0 0H331.717L445.5 143.6828L408.5 226.5H0V0Z'

type BrandFrameProps = {
  src: string
  alt: string
  id: string
  d: string
}

const BrandFrame = ({ src, alt, id, d }: BrandFrameProps) => {
  const clipId = `${id}-clip`
  const maskId = `${id}-stroke`

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 446 227'
      className='block h-auto w-full'
      role='img'
      aria-label={alt}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={d} />
        </clipPath>
        <mask
          id={maskId}
          fill='white'
        >
          <path d={d} />
        </mask>
      </defs>
      <image
        href={src}
        width='446'
        height='227'
        preserveAspectRatio='xMidYMid slice'
        clipPath={`url(#${clipId})`}
      />
      <path
        d={d}
        fill='none'
        stroke='#F4B700'
        strokeWidth='2'
        mask={`url(#${maskId})`}
      />
    </svg>
  )
}

export default BrandFrame
