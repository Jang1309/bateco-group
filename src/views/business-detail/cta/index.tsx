import { ArrowRight, Mail, Phone } from 'lucide-react'
import Image from 'next/image'

import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'

import ContactItem from './components/contact-item'

// shortcut: hardcoded until site-setting wired into this CTA
const HEAD_OFFICE = {
  hotline: '097 380 8808',
  email: 'info@batecogroup.vn',
}

const SectorCta = () => {
  return (
    <section className='bg-[#FAFBFC] px-[3.75rem] py-[5.5rem] xsm:px-[1.5rem] xsm:py-[3.5rem]'>
      <div
        data-aos='business-rise'
        data-aos-duration='800'
        className='group relative mx-auto max-w-[95rem] overflow-hidden bg-[#0F1C33] shadow-[0_1.5rem_3.5rem_rgba(15,28,51,0.22)]'
      >
        <div className='absolute inset-y-0 right-0 w-[55%] overflow-hidden xsm:inset-x-0 xsm:top-0 xsm:bottom-auto xsm:h-[14rem] xsm:w-full'>
          <Image
            src='/home/vision/d-img-1.jpg'
            alt='Bateco Group'
            fill
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

        <div className='relative max-w-[48rem] px-[4.5rem] py-[4.5rem] xsm:max-w-none xsm:px-[1.5rem] xsm:pt-[11rem] xsm:pb-[2.5rem]'>
          <p className='flex items-center gap-[0.75rem] text-[0.75rem] font-bold tracking-[0.2em] text-[#DFBA73] uppercase'>
            <span className='h-px w-[2rem] bg-[#DFBA73]' />
            Hợp tác đầu tư
          </p>
          <h2 className='mt-[1.25rem] text-[2.5rem] leading-[1.25] font-bold text-white xsm:text-[1.625rem]'>
            Đồng hành cùng Bateco trong những{' '}
            <span
              style={{
                background: 'linear-gradient(93deg, #DFBA73 0%, #FCD99D 45%, #BA8A38 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              cơ hội đầu tư mới
            </span>
          </h2>
          <p className='mt-[1.25rem] max-w-[34rem] text-[1rem] leading-[1.75] text-white/70 xsm:text-[0.9375rem]'>
            Hãy kết nối với chúng tôi để cùng kiến tạo những dự án mang lại giá trị bền vững cho
            doanh nghiệp và cộng đồng.
          </p>

          <div className='mt-[2.25rem] flex flex-wrap items-center gap-[1rem]'>
            <Link
              href={ROUTES.contact}
              className='group/btn inline-flex items-center gap-[0.75rem] bg-[#C39A5A] py-[0.5rem] pr-[0.5rem] pl-[1.5rem] text-[0.8125rem] font-bold tracking-[0.06em] text-white uppercase transition-[background-color,box-shadow] duration-300 hover:bg-[#B08447] hover:shadow-[0_0.5rem_1.5rem_rgba(195,154,90,0.4)]'
            >
              Kết nối với chúng tôi
              <span className='flex size-[2.25rem] items-center justify-center bg-white/15 transition-colors duration-300 group-hover/btn:bg-white group-hover/btn:text-[#B08447]'>
                <ArrowRight className='size-[1rem] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-[0.125rem]' />
              </span>
            </Link>
          </div>

          <ul className='mt-[2.5rem] flex flex-wrap gap-x-[2.5rem] gap-y-[1rem] border-t border-white/10 pt-[1.75rem]'>
            <ContactItem
              icon={Phone}
              label='Hotline'
              value={HEAD_OFFICE.hotline}
              href={`tel:${HEAD_OFFICE.hotline.replace(/\s/g, '')}`}
            />
            <ContactItem
              icon={Mail}
              label='Email'
              value={HEAD_OFFICE.email}
              href={`mailto:${HEAD_OFFICE.email}`}
            />
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SectorCta
