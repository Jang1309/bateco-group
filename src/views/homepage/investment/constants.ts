export const FAN_OFFSET = [0, 2.5, 4.25]
export const HOVER_DELAY_MS = 180

export const IDLE_BG =
  'linear-gradient(180deg, rgba(47, 91, 160, 0.95) 0%, rgba(5, 11, 20, 0.95) 100%), linear-gradient(180deg, rgba(47, 91, 160, 0.95) 0%, rgba(126, 134, 145, 0.95) 100%), #15171A'

export const ACTIVE_BG =
  'linear-gradient(180deg, #DFBA73 0%, #FCD99D 27.49%, #996E27 100%), linear-gradient(73deg, rgba(182, 141, 76, 0.40) 34.75%, rgba(193, 151, 82, 0.70) 47.32%, #CCA057 59.9%)'

export const SHIMMER_BORDER = {
  padding: '0.125rem',
  background:
    'linear-gradient(100deg, #7A5518 0%, #996E27 15%, #FFF6DC 25%, #FFFFFF 27%, #FFF6DC 29%, #996E27 40%, #7A5518 50%, #996E27 65%, #FFF6DC 75%, #FFFFFF 77%, #FFF6DC 79%, #996E27 90%, #7A5518 100%) 0% 0% / 200% 100%',
  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
  mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
} as const

export const SWEEP_TRANSITION = { duration: 0.5, ease: [0.22, 1, 0.36, 1] } as const

export const IMAGE_TRANSITION = { duration: 0.8, ease: [0.65, 0, 0.35, 1] } as const

export const CONTENT_VARIANTS = {
  shown: {
    visibility: 'visible',
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
  hidden: {
    transitionEnd: { visibility: 'hidden' },
    transition: { duration: 0.25 },
  },
} as const

export const ITEM_VARIANTS = {
  shown: { opacity: 1, y: 0, filter: 'blur(0px)', transition: SWEEP_TRANSITION },
  hidden: { opacity: 0, y: -8, filter: 'blur(4px)', transition: { duration: 0.2 } },
} as const

export const LINE_VARIANTS = {
  shown: { scaleX: 1, transition: SWEEP_TRANSITION },
  hidden: { scaleX: 0, transition: { duration: 0.2 } },
} as const
