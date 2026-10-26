type ContactItemProps = {
  icon?: string
  label: string
  value: string
  href: string
}

const ContactItem = ({ icon, label, value, href }: ContactItemProps) => (
  <li>
    <a
      href={href}
      className='group/item flex items-center gap-[0.875rem]'
    >
      <span className='flex size-[2.5rem] items-center justify-center rounded-full border border-[#DFBA73]/50 transition-colors duration-300 group-hover/item:border-[#DFBA73] group-hover/item:bg-[#DFBA73]'>
        {icon ? (
          <span
            aria-hidden
            className='size-[1rem] bg-[#DFBA73] transition-colors duration-300 group-hover/item:bg-[#0F1C33]'
            style={{
              maskImage: `url(${icon})`,
              WebkitMaskImage: `url(${icon})`,
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
            }}
          />
        ) : null}
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
