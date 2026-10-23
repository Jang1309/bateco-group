import { Clock, Mail, MapPin, Phone, Shield } from 'lucide-react'
import Image from 'next/image'

import BannerTopOverlay from '@/components/shared/banner-top-overlay'
import MapEmbed from '@/views/contact/components/map-embed'
import { CONTACT_OFFICES, type ContactOffice } from '@/views/contact/data'

const ContactRows = ({ office }: { office: ContactOffice }) => (
  <ul className='space-y-[0.75rem]'>
    <li className='flex gap-[0.625rem] text-[0.875rem] leading-[1.55] text-[#475569]'>
      <MapPin
        className='mt-[0.15rem] size-[1.0625rem] shrink-0 text-[#3B82A8]'
        strokeWidth={1.6}
      />
      <span>{office.address}</span>
    </li>
    <li className='flex items-center gap-[0.625rem] text-[0.875rem] text-[#475569]'>
      <Phone
        className='size-[1.0625rem] shrink-0 text-[#3B82A8]'
        strokeWidth={1.6}
      />
      <a
        href={`tel:${office.phone.replace(/[^\d+]/g, '')}`}
        className='hover:text-[#1A2B48]'
      >
        {office.phone}
      </a>
    </li>
    <li className='flex items-center gap-[0.625rem] text-[0.875rem] text-[#475569]'>
      <Mail
        className='size-[1.0625rem] shrink-0 text-[#3B82A8]'
        strokeWidth={1.6}
      />
      <a
        href={`mailto:${office.email}`}
        className='hover:text-[#1A2B48]'
      >
        {office.email}
      </a>
    </li>
  </ul>
)

const ContactView = () => {
  const [hq, ...branches] = CONTACT_OFFICES

  return (
    <main>
      <section className='relative isolate overflow-hidden bg-[#0B1B33] pt-[10rem] pb-[6.5rem] xsm:pt-[7.5rem] xsm:pb-[4rem]'>
        <Image
          src='/home/d-banner.png'
          alt=''
          fill
          priority
          sizes='100vw'
          className='-z-10 object-cover object-center'
        />
        <div
          aria-hidden
          className='absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.55)_40%,rgba(255,255,255,0.08)_68%,rgba(11,27,51,0.25)_100%)] xsm:bg-[linear-gradient(180deg,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.35)_50%,rgba(11,27,51,0.4)_100%)]'
        />
        <BannerTopOverlay />

        <div className='relative z-[1] mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
          <div className='max-w-[34rem]'>
            <p className='business-hero-rise inline-flex rounded-full border border-[#1A2B48]/12 bg-white/65 px-[0.875rem] py-[0.375rem] text-[0.6875rem] font-bold tracking-[0.12em] text-[#1A2B48] uppercase backdrop-blur-[0.25rem]'>
              Kết nối cùng Bateco
            </p>
            <h1
              className='business-hero-fade mt-[1.125rem] text-[3rem] leading-[1.15] font-bold tracking-[-0.02em] text-[#1A2B48] xsm:text-[2rem]'
              style={{ animationDelay: '100ms' }}
            >
              Liên hệ với chúng tôi
            </h1>

            <div
              className='business-hero-rise mt-[1.75rem] flex flex-wrap gap-[0.75rem]'
              style={{ animationDelay: '200ms' }}
            >
              <span className='inline-flex items-center gap-[0.5rem] rounded-[0.625rem] border border-white/50 bg-white/70 px-[1rem] py-[0.7rem] text-[0.875rem] font-semibold text-[#1A2B48] backdrop-blur-[0.35rem]'>
                <Clock
                  className='size-[1.0625rem] text-[#3B82A8]'
                  strokeWidth={1.6}
                />
                Phản hồi nhanh
              </span>
              <span className='inline-flex items-center gap-[0.5rem] rounded-[0.625rem] border border-white/50 bg-white/70 px-[1rem] py-[0.7rem] text-[0.875rem] font-semibold text-[#1A2B48] backdrop-blur-[0.35rem]'>
                <Shield
                  className='size-[1.0625rem] text-[#3B82A8]'
                  strokeWidth={1.6}
                />
                Bảo mật thông tin
              </span>
            </div>
          </div>
        </div>

        <span
          aria-hidden
          className='pointer-events-none absolute top-1/2 right-[1.5rem] hidden -translate-y-1/2 text-[0.625rem] font-bold tracking-[0.28em] text-white/50 uppercase [writing-mode:vertical-rl] lg:block'
        >
          Scroll to Bateco
        </span>
      </section>

      <section className='bg-white pt-[4.5rem] pb-[6rem] xsm:pt-[3rem] xsm:pb-[3.5rem]'>
        <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
          <p className='inline-flex items-center gap-[0.5rem] rounded-full bg-[#EEF1F5] px-[0.875rem] py-[0.375rem] text-[0.6875rem] font-bold tracking-[0.1em] text-[#64748B] uppercase'>
            <span className='size-[0.375rem] rounded-full bg-[#E07A3D]' />
            Hệ thống văn phòng
          </p>
          <h2 className='mt-[0.875rem] max-w-[28rem] text-[2rem] leading-[1.25] font-bold tracking-[-0.015em] text-[#1A2B48] xsm:text-[1.5rem]'>
            Kết nối với đội ngũ Bateco
          </h2>

          {/* Cột trái HQ (~58%) | cột phải 2 chi nhánh chia đều chiều cao */}
          <div className='mt-[2.5rem] grid grid-cols-[1.35fr_1fr] items-stretch gap-[1.5rem] xlg:grid-cols-1 xsm:mt-[1.75rem] xsm:gap-[1.125rem]'>
            {hq ? (
              <article className='flex min-h-[32rem] flex-col rounded-[1.125rem] bg-[#F3F5F8] p-[1.75rem] xsm:min-h-0 xsm:p-[1.25rem]'>
                <h3 className='text-[1.25rem] font-bold text-[#1A2B48]'>{hq.title}</h3>
                <div className='mt-[1.25rem]'>
                  <ContactRows office={hq} />
                </div>
                <div className='mt-[1.5rem] flex min-h-0 flex-1 flex-col'>
                  <MapEmbed
                    query={hq.mapQuery}
                    city={hq.city}
                    fill
                  />
                </div>
              </article>
            ) : null}

            <div className='flex min-h-0 flex-col gap-[1.5rem] xsm:gap-[1.125rem]'>
              {branches.map((office) => (
                <article
                  key={office.id}
                  className='flex flex-1 flex-col rounded-[1.125rem] bg-[#F3F5F8] p-[1.375rem] xsm:p-[1.25rem]'
                >
                  <h3 className='text-[1.0625rem] font-bold text-[#1A2B48]'>{office.title}</h3>
                  <div className='mt-[1rem]'>
                    <ContactRows office={office} />
                  </div>
                  <div className='mt-[1.125rem]'>
                    <MapEmbed
                      query={office.mapQuery}
                      city={office.city}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ContactView
