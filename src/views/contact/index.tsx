import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'

import BannerTopOverlay from '@/components/shared/banner-top-overlay'
import type { ContactConnectItem, ContactPageResponse } from '@/interfaces/contact.interface'
import MapEmbed from '@/views/contact/components/map-embed'

const FALLBACK_BANNER = '/home/d-banner.png'

const ContactRows = ({ office }: { office: ContactConnectItem }) => (
  <ul className='space-y-[0.75rem]'>
    {office.address?.title ? (
      <li className='flex gap-[0.625rem] text-[0.875rem] leading-[1.55] text-[#475569]'>
        <MapPin
          className='mt-[0.15rem] size-[1.0625rem] shrink-0 text-[#3B82A8]'
          strokeWidth={1.6}
        />
        {office.address.url ? (
          <a
            href={office.address.url}
            target={office.address.target || '_blank'}
            rel='noopener noreferrer'
            className='hover:text-[#1A2B48]'
          >
            {office.address.title}
          </a>
        ) : (
          <span>{office.address.title}</span>
        )}
      </li>
    ) : null}
    {office.phone?.title ? (
      <li className='flex items-center gap-[0.625rem] text-[0.875rem] text-[#475569]'>
        <Phone
          className='size-[1.0625rem] shrink-0 text-[#3B82A8]'
          strokeWidth={1.6}
        />
        <a
          href={office.phone.url || `tel:${office.phone.title.replace(/[^\d+]/g, '')}`}
          className='hover:text-[#1A2B48]'
        >
          {office.phone.title}
        </a>
      </li>
    ) : null}
    {office.mail?.title ? (
      <li className='flex items-center gap-[0.625rem] text-[0.875rem] text-[#475569]'>
        <Mail
          className='size-[1.0625rem] shrink-0 text-[#3B82A8]'
          strokeWidth={1.6}
        />
        <a
          href={office.mail.url || `mailto:${office.mail.title}`}
          className='hover:text-[#1A2B48]'
        >
          {office.mail.title}
        </a>
      </li>
    ) : null}
  </ul>
)

type ContactViewProps = {
  content?: ContactPageResponse
}

const ContactView = ({ content }: ContactViewProps) => {
  const banner = content?.banner
  const desktop = banner?.desktop || FALLBACK_BANNER
  const mobile = typeof banner?.mobile === 'string' && banner.mobile ? banner.mobile : desktop
  const offices = (content?.connect ?? []).filter((item) => item.title)
  const [hq, ...branches] = offices

  return (
    <main>
      {/* Desktop: ảnh banner CMS full-width (đã có vùng trắng trái), không crop / không đè gradient thêm */}
      <section className='relative isolate overflow-hidden bg-white xsm:hidden'>
        <div className='relative w-full'>
          <Image
            src={desktop}
            alt=''
            width={2172}
            height={724}
            priority
            unoptimized
            sizes='100vw'
            className='h-auto w-full'
          />
          <BannerTopOverlay />
          <div className='absolute inset-0 flex items-center'>
            <div className='mx-auto w-full max-w-[95rem] px-[3.75rem] pt-[4.5rem]'>
              <div className='max-w-[34rem]'>
                {banner?.subtitle ? (
                  <p className='business-hero-rise inline-flex rounded-full border border-[#1A2B48]/12 bg-white/70 px-[0.875rem] py-[0.375rem] text-[0.6875rem] font-bold tracking-[0.12em] text-[#1A2B48] uppercase backdrop-blur-[0.25rem]'>
                    {banner.subtitle}
                  </p>
                ) : null}
                {banner?.title ? (
                  <h1
                    className='business-hero-fade mt-[1.125rem] text-[3rem] leading-[1.15] font-bold tracking-[-0.02em] text-[#1A2B48]'
                    style={{ animationDelay: '100ms' }}
                  >
                    {banner.title}
                  </h1>
                ) : null}
              </div>
            </div>
          </div>
          <span
            aria-hidden
            className='pointer-events-none absolute top-1/2 right-[1.5rem] hidden -translate-y-1/2 text-[0.625rem] font-bold tracking-[0.28em] text-white/55 uppercase [writing-mode:vertical-rl] lg:block'
          >
            Scroll to Bateco
          </span>
        </div>
      </section>

      {/* Mobile: stacked — ảnh riêng + chữ phía dưới */}
      <section className='relative hidden overflow-hidden bg-white xsm:block'>
        <div className='relative h-[19.5rem] w-full overflow-hidden'>
          <Image
            src={mobile}
            alt=''
            fill
            priority
            unoptimized
            sizes='100vw'
            className='object-cover object-center'
          />
          <div
            aria-hidden
            className='pointer-events-none absolute inset-x-0 top-0 h-[4.25rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.2)_50%,transparent_100%)]'
          />
          <div
            aria-hidden
            className='pointer-events-none absolute inset-x-0 bottom-0 h-[1.5rem] bg-[linear-gradient(180deg,transparent_0%,#fff_100%)]'
          />
        </div>
        <div className='px-[1.25rem] pt-[1.25rem] pb-[2.75rem]'>
          {banner?.subtitle ? (
            <p className='business-hero-rise inline-flex rounded-full border border-[#1A2B48]/12 bg-[#F8FAFC] px-[0.875rem] py-[0.375rem] text-[0.6875rem] font-bold tracking-[0.12em] text-[#1A2B48] uppercase'>
              {banner.subtitle}
            </p>
          ) : null}
          {banner?.title ? (
            <h1
              className='business-hero-fade mt-[0.875rem] text-[2rem] leading-[1.2] font-bold tracking-[-0.02em] text-[#1A2B48]'
              style={{ animationDelay: '100ms' }}
            >
              {banner.title}
            </h1>
          ) : null}
        </div>
      </section>

      {offices.length > 0 ? (
        <section className='bg-white pt-[4.5rem] pb-[6rem] xsm:pt-[3rem] xsm:pb-[3.5rem]'>
          <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
            <h2 className='max-w-[28rem] text-[2rem] leading-[1.25] font-bold tracking-[-0.015em] text-[#1A2B48] xsm:text-[1.5rem]'>
              Kết nối với đội ngũ Bateco
            </h2>

            <div className='mt-[2.5rem] grid grid-cols-[1.35fr_1fr] items-stretch gap-[1.5rem] xlg:grid-cols-1 xsm:mt-[1.75rem] xsm:gap-[1.125rem]'>
              {hq ? (
                <article className='flex min-h-[32rem] flex-col rounded-[1.125rem] bg-[#F3F5F8] p-[1.75rem] xsm:min-h-0 xsm:p-[1.25rem]'>
                  <h3 className='text-[1.25rem] font-bold text-[#1A2B48]'>{hq.title}</h3>
                  <div className='mt-[1.25rem]'>
                    <ContactRows office={hq} />
                  </div>
                  {hq.map?.url ? (
                    <div className='mt-[1.5rem] flex min-h-0 flex-1 flex-col'>
                      <MapEmbed
                        embedUrl={hq.map.url}
                        mapsUrl={hq.address?.url || hq.map.url}
                        city={hq.map.title || hq.title || ''}
                        fill
                      />
                    </div>
                  ) : null}
                </article>
              ) : null}

              {branches.length > 0 ? (
                <div className='flex min-h-0 flex-col gap-[1.5rem] xsm:gap-[1.125rem]'>
                  {branches.map((office, index) => (
                    <article
                      key={office.title || index}
                      className='flex flex-1 flex-col rounded-[1.125rem] bg-[#F3F5F8] p-[1.375rem] xsm:p-[1.25rem]'
                    >
                      <h3 className='text-[1.0625rem] font-bold text-[#1A2B48]'>{office.title}</h3>
                      <div className='mt-[1rem]'>
                        <ContactRows office={office} />
                      </div>
                      {office.map?.url ? (
                        <div className='mt-[1.125rem]'>
                          <MapEmbed
                            embedUrl={office.map.url}
                            mapsUrl={office.address?.url || office.map.url}
                            city={office.map.title || office.title || ''}
                          />
                        </div>
                      ) : null}
                    </article>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  )
}

export default ContactView
