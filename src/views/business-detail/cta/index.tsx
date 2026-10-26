import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import type { ComponentProps } from 'react'

import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import type { Contact } from '@/interfaces/siteSetting.interface'

import ContactItem from './components/contact-item'

const FALLBACK_IMAGE = '/home/vision/d-img-1.jpg'

type SectorCtaProps = {
  data?: Contact
}

const SectorCta = ({ data }: SectorCtaProps) => {
  if (!data) return null

  const image = typeof data.image === 'string' && data.image ? data.image : FALLBACK_IMAGE
  const buttonHref = (data.button?.url || ROUTES.contact) as ComponentProps<typeof Link>['href']
  const buttonLabel = data.button?.title || 'Kết nối với chúng tôi'
  const contacts = data.contacts?.filter((item) => item.link?.title || item.link?.url) ?? []

  return (
    <section className='bg-[#FAFBFC] px-[3.75rem] py-[5.5rem] xsm:px-[1.25rem] xsm:py-[3rem]'>
      <div
        data-aos='business-rise'
        data-aos-duration='800'
        className='group relative mx-auto max-w-[95rem] overflow-hidden bg-[#0F1C33] shadow-[0_1.5rem_3.5rem_rgba(15,28,51,0.22)]'
      >
        <div className='absolute inset-y-0 right-0 w-[55%] overflow-hidden xsm:inset-x-0 xsm:top-0 xsm:bottom-auto xsm:h-[11rem] xsm:w-full'>
          <Image
            src={image}
            alt='Bateco Group'
            fill
            unoptimized={image.startsWith('http')}
            sizes='(max-width: 639px) 92vw, 50vw'
            className='object-cover transition-[scale] duration-[1.6s] ease-out will-change-[scale] group-hover:scale-[1.04]'
          />
          <div
            aria-hidden
            className='absolute inset-0 bg-[linear-gradient(90deg,#0F1C33_0%,rgba(15,28,51,0.85)_25%,rgba(15,28,51,0.2)_70%,rgba(15,28,51,0.05)_100%)] xsm:bg-[linear-gradient(180deg,rgba(15,28,51,0.1)_0%,rgba(15,28,51,0.6)_60%,#0F1C33_100%)]'
          />
        </div>

        <div
          aria-hidden
          className='pointer-events-none absolute -top-[10rem] -left-[8rem] size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(223,186,115,0.22)_0%,transparent_65%)]'
        />
        <span
          aria-hidden
          className='pointer-events-none absolute top-[1.5rem] left-[1.5rem] size-[3rem] border-t border-l border-[#DFBA73]/60 xsm:hidden'
        />
        <span
          aria-hidden
          className='pointer-events-none absolute right-[1.5rem] bottom-[1.5rem] size-[3rem] border-r border-b border-[#DFBA73]/60 xsm:hidden'
        />

        <div className='relative max-w-[48rem] px-[4.5rem] py-[4.5rem] xsm:max-w-none xsm:px-[1.25rem] xsm:pt-[9rem] xsm:pb-[2rem]'>
          {data.eyebrow ? (
            <p className='flex items-center gap-[0.75rem] text-[0.75rem] font-bold tracking-[0.2em] text-[#DFBA73] uppercase xsm:text-[0.6875rem]'>
              <span className='h-px w-[2rem] bg-[#DFBA73]' />
              {data.eyebrow}
            </p>
          ) : null}

          {data.title ? (
            <div
              className='mt-[1.25rem] text-[2.5rem] leading-[1.25] font-bold text-white xsm:mt-[0.875rem] xsm:text-[1.375rem] xsm:leading-[1.3] xsm:[&_br]:hidden [&_br]:block [&_p]:m-0 [&_strong]:bg-[linear-gradient(93deg,#DFBA73_0%,#FCD99D_45%,#BA8A38_100%)] [&_strong]:bg-clip-text [&_strong]:font-bold [&_strong]:text-transparent'
              dangerouslySetInnerHTML={{ __html: data.title }}
            />
          ) : null}

          {data.desc ? (
            <p className='mt-[1.25rem] max-w-[34rem] text-[1rem] leading-[1.75] text-white/70 xsm:mt-[0.875rem] xsm:text-[0.875rem] xsm:leading-[1.6]'>
              {data.desc}
            </p>
          ) : null}

          <div className='mt-[2.25rem] flex flex-wrap items-center gap-[1rem] xsm:mt-[1.5rem]'>
            <Link
              href={buttonHref}
              className='group/btn inline-flex items-center gap-[0.75rem] bg-[#C39A5A] py-[0.5rem] pr-[0.5rem] pl-[1.5rem] text-[0.8125rem] font-bold tracking-[0.06em] text-white uppercase transition-[background-color,box-shadow] duration-300 hover:bg-[#B08447] hover:shadow-[0_0.5rem_1.5rem_rgba(195,154,90,0.4)] xsm:w-full xsm:justify-between'
            >
              {buttonLabel}
              <span className='flex size-[2.25rem] items-center justify-center bg-white/15 transition-colors duration-300 group-hover/btn:bg-white group-hover/btn:text-[#B08447]'>
                <ArrowRight className='size-[1rem] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-[0.125rem]' />
              </span>
            </Link>
          </div>

          {contacts.length > 0 ? (
            <ul className='mt-[2.5rem] flex flex-wrap gap-x-[2.5rem] gap-y-[1rem] border-t border-white/10 pt-[1.75rem]'>
              {contacts.map((item, index) => (
                <ContactItem
                  key={item.link?.url || item.link?.title || index}
                  icon={item.icon}
                  label={item.link?.url?.startsWith('mailto:') ? 'Email' : 'Hotline'}
                  value={item.link?.title || ''}
                  href={item.link?.url || '#'}
                />
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default SectorCta
