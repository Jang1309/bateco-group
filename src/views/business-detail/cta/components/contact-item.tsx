import type { LucideIcon } from 'lucide-react'

type ContactItemProps = {
  icon: LucideIcon
  label: string
  value: string
  href: string
}

const ContactItem = ({ icon: Icon, label, value, href }: ContactItemProps) => (
  <li>
    <a
      href={href}
      className='group/item flex items-center gap-[0.875rem]'
    >
      <span className='flex size-[2.5rem] items-center justify-center rounded-full border border-[#DFBA73]/50 text-[#DFBA73] transition-colors duration-300 group-hover/item:bg-[#DFBA73] group-hover/item:text-[#0F1C33]'>
        <Icon className='size-[1rem]' />
      </span>
      <span>
        <span className='block text-[0.6875rem] font-bold tracking-[0.16em] text-white/50 uppercase'>
          {label}
        </span>
        <span className='block text-[0.9375rem] font-semibold text-white transition-colors duration-300 group-hover/item:text-[#DFBA73]'>
          {value}
        </span>
      </span>
    </a>
  </li>
)

export default ContactItem
