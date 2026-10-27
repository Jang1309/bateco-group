export const PRELOADER_STORAGE_KEY = 'bateco-preloader-seen'
export const PRELOADER_BG = '#eaf4fb'

/**
 * Parallelogram clips from Figma frame 1280×820 (node 904:986).
 * box = bounding box of the clip; focus = object-position on the subject (ảnh trắng ở giữa, chủ thể ở mép).
 */
export const PRELOADER_PANELS = [
  {
    id: 'industrial-services',
    box: { left: '0%', width: '25.78125%' },
    focus: '88% 50%',
    image: '/preloader/bg/industrial-services.png',
    icon: '/preloader/icons/industrial-services.svg',
    clipPath: 'polygon(0% 0%, 25.78125% 0%, 19.53125% 100%, 0% 100%)',
    contentX: '11.4%',
    mobile: {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 15.5%, 0% 20.5%)',
      box: { top: '0%', height: '20.5%' },
      contentY: '9%',
    },
  },
  {
    id: 'real-estate',
    box: { left: '19.53125%', width: '25.390625%' },
    focus: '86% 50%',
    image: '/preloader/bg/real-estate.png',
    icon: '/preloader/icons/real-estate.svg',
    clipPath: 'polygon(25.78125% 0%, 44.921875% 0%, 38.671875% 100%, 19.53125% 100%)',
    contentX: '32.2%',
    mobile: {
      clipPath: 'polygon(0% 20.5%, 100% 15.5%, 100% 33.5%, 0% 38.5%)',
      box: { top: '15.5%', height: '23%' },
      contentY: '27%',
    },
  },
  {
    id: 'defense',
    box: { left: '38.671875%', width: '25.390625%' },
    focus: '10% 50%',
    image: '/preloader/bg/defense.png',
    icon: '/preloader/icons/defense.svg',
    clipPath: 'polygon(44.921875% 0%, 64.0625% 0%, 57.8125% 100%, 38.671875% 100%)',
    contentX: '51.4%',
    mobile: {
      clipPath: 'polygon(0% 38.5%, 100% 33.5%, 100% 51.5%, 0% 56.5%)',
      box: { top: '33.5%', height: '23%' },
      contentY: '45%',
    },
  },
  {
    id: 'green-economy',
    box: { left: '57.8125%', width: '25.390625%' },
    focus: '18% 50%',
    image: '/preloader/bg/green-economy.png',
    icon: '/preloader/icons/green-economy.svg',
    clipPath: 'polygon(64.0625% 0%, 83.203125% 0%, 76.953125% 100%, 57.8125% 100%)',
    contentX: '70.5%',
    mobile: {
      clipPath: 'polygon(0% 56.5%, 100% 51.5%, 100% 69.5%, 0% 74.5%)',
      box: { top: '51.5%', height: '23%' },
      contentY: '63%',
    },
  },
  {
    id: 'materials',
    box: { left: '76.953125%', width: '23.046875%' },
    focus: '24% 50%',
    image: '/preloader/bg/materials.png',
    icon: '/preloader/icons/materials.svg',
    clipPath: 'polygon(83.203125% 0%, 100% 0%, 100% 100%, 76.953125% 100%)',
    contentX: '90%',
    mobile: {
      clipPath: 'polygon(0% 74.5%, 100% 69.5%, 100% 100%, 0% 100%)',
      box: { top: '69.5%', height: '30.5%' },
      contentY: '81%',
    },
  },
] as const

/**
 * Seam centers along each panel join (top → bottom), % of frame.
 * y1/y2: mobile seams (left → right) — panel thành dải ngang chéo.
 * Figma: 330→250, 575→495, 820→740, 1065→985.
 */
export const PRELOADER_DIVIDERS = [
  { id: 'seam-1', x1: '25.78125%', x2: '19.53125%', y1: '20.5%', y2: '15.5%' },
  { id: 'seam-2', x1: '44.921875%', x2: '38.671875%', y1: '38.5%', y2: '33.5%' },
  { id: 'seam-3', x1: '64.0625%', x2: '57.8125%', y1: '56.5%', y2: '51.5%' },
  { id: 'seam-4', x1: '83.203125%', x2: '76.953125%', y1: '74.5%', y2: '69.5%' },
] as const

export type PreloaderPanel = (typeof PRELOADER_PANELS)[number]
