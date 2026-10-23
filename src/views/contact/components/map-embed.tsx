import { getMapsEmbedUrl, getMapsLink } from '@/views/contact/data'

type MapEmbedProps = {
  query: string
  city: string
  /** Map chiếm phần còn lại của card (HQ) */
  fill?: boolean
}

const MapEmbed = ({ query, city, fill = false }: MapEmbedProps) => {
  return (
    <div
      className={
        fill
          ? 'flex min-h-[16rem] flex-1 flex-col overflow-hidden rounded-[0.75rem] bg-[#E8EEF5] xsm:min-h-[13rem]'
          : 'flex flex-col overflow-hidden rounded-[0.75rem] bg-[#E8EEF5]'
      }
    >
      <div className={fill ? 'relative min-h-0 flex-1' : 'relative h-[10.5rem]'}>
        <iframe
          title={`Bản đồ ${city}`}
          src={getMapsEmbedUrl(query)}
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          allowFullScreen
          className='absolute inset-0 size-full border-0'
        />
      </div>
      <div className='flex shrink-0 items-center justify-between gap-[0.75rem] bg-white px-[1rem] py-[0.75rem]'>
        <span className='text-[0.8125rem] font-semibold text-[#1A2B48]'>{city}</span>
        <a
          href={getMapsLink(query)}
          target='_blank'
          rel='noopener noreferrer'
          className='text-[0.8125rem] font-bold text-[#E07A3D] transition-colors duration-300 hover:text-[#1A2B48]'
        >
          Xem bản đồ →
        </a>
      </div>
    </div>
  )
}

export default MapEmbed
