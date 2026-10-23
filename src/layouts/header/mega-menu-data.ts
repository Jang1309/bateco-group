/** Accent cycle for CMS mega columns */
export const MEGA_ACCENTS = [
  { bar: 'bg-[#0B7A4B]', bullet: 'bg-[#0B7A4B]', soft: 'bg-[#E9FBF2]', text: 'text-[#0B7A4B]' },
  { bar: 'bg-[#1A2B48]', bullet: 'bg-[#1A2B48]', soft: 'bg-[#EEF2F8]', text: 'text-[#1A2B48]' },
  { bar: 'bg-[#D4A017]', bullet: 'bg-[#D4A017]', soft: 'bg-[#FDF6E3]', text: 'text-[#A67C00]' },
] as const

export type MegaAccent = (typeof MEGA_ACCENTS)[number]
