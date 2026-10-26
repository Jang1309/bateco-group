import { Headset, Mail, Phone } from 'lucide-react'

type ContactItemProps = {
  /** Giữ prop từ CMS; icon UI dùng Lucide theo loại link (ổn định trên IIS). */
  icon?: string
  label: string
  value: string
  href: string
}

const iconClassName = 'size-[1rem]'

const ContactGlyph = ({ href, label }: { href: string; label: string }) => {
  const lower = label.toLowerCase()
  if (href.startsWith('mailto:') || lower.includes('mail') || lower.includes('email')) {
    return (
      <Mail
        aria-hidden
        className={iconClassName}
        strokeWidth={1.75}
      />
    )
  }
  if (href.startsWith('tel:') || lower.includes('hotline') || lower.includes('phone')) {
    return (
      <Phone
        aria-hidden
        className={iconClassName}
        strokeWidth={1.75}
      />
    )
  }
  return (
    <Headset
      aria-hidden
      className={iconClassName}
      strokeWidth={1.75}
    />
  )
}

const ContactItem = ({ label, value, href }: ContactItemProps) => (
  <li>
    <a
      href={href}
      className='group/item flex items-center gap-[0.875rem]'
    >
      <span className='flex size-[2.5rem] items-center justify-center rounded-full border border-[#DFBA73]/50 text-[#DFBA73] transition-colors duration-300 group-hover/item:border-[#DFBA73] group-hover/item:bg-[#DFBA73] group-hover/item:text-[#0F1C33]'>
        <ContactGlyph
          href={href}
          label={label}
        />
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
