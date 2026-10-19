import { ArrowRight } from 'lucide-react'

type BlockHeaderProps = {
  title: string
  /** Link "Xem tất cả"; bỏ trống thì không hiển thị */
  href?: string
}

const BlockHeader = ({ title, href }: BlockHeaderProps) => {
  return (
    <div className='flex items-center justify-between gap-[1rem] border-b border-[#EEF1F5] pb-[1rem]'>
      <h3 className='border-l-[0.1875rem] border-[#B5935E] pl-[0.875rem] text-[1.375rem] leading-[1.3] font-bold text-[#1A2B48] xsm:text-[1.125rem]'>
        {title}
      </h3>
      {href ? (
        <a
          href={href}
          className='group inline-flex shrink-0 items-center gap-[0.375rem] text-[0.8125rem] font-bold text-[#B5935E] transition-colors duration-300 hover:text-[#1A2B48]'
        >
          Xem tất cả
          <ArrowRight className='size-[0.875rem] transition-transform duration-300 group-hover:translate-x-[0.1875rem]' />
        </a>
      ) : null}
    </div>
  )
}

export default BlockHeader
