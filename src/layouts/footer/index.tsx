import { Headset, Mail, Phone, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import type { ILink } from '@/interfaces/link.interface'
import { Footer as FooterData, FooterOffice } from '@/interfaces/siteSetting.interface'

import NewsletterForm from './newsletter-form'

const HEADING =
  'text-[1.125rem] font-bold tracking-[0.04em] text-[#B88E4F] uppercase xsm:text-[1rem]'

const Footer = async ({ footer }: { footer?: FooterData }) => {
  const t = await getTranslations('Header')
  const logo = footer?.logo || '/header/d-logo.png'
  const background = footer?.background || '/footer/bg.svg'
  const offices = footer?.office
  const nav = footer?.navigation
  const newsletter = footer?.newsletter

  return (
    // Footer cao đúng theo tỉ lệ ảnh nền (1280×583) nên ảnh hiện trọn vẹn, không bị cắt.
    // html font-size = 1vw nên nội dung (đơn vị rem) co giãn cùng tỉ lệ với ảnh.
    <footer className='relative flex aspect-[1280/583] flex-col overflow-hidden bg-white px-[3.125rem] xsm:aspect-auto xsm:px-[1.5rem]'>
      {/* Hình vẽ thành phố mờ làm nền (đã có sẵn viền trên và dải sóng ở đáy) */}
      <Image
        src={background}
        alt=''
        fill
        sizes='100vw'
        className='pointer-events-none object-cover object-bottom'
      />

      <div className='relative mx-auto flex w-full max-w-[95rem] flex-1 flex-col'>
        <div
          data-aos='fade-down'
          className='flex justify-center border-b border-[#EADFC8] py-[2rem]'
        >
          <Link
            href={ROUTES.home}
            aria-label={t('logoAlt')}
          >
            <Image
              src={logo}
              alt={t('logoAlt')}
              width={523}
              height={140}
              className='h-[2.5rem] w-auto'
            />
          </Link>
        </div>

        {offices?.length ? (
          <div className='grid grid-cols-2 border-b border-[#EADFC8] xsm:grid-cols-1'>
            {offices.map((office, index) => (
              <OfficeBlock
                key={office.title || String(index)}
                office={office}
                delay={index * 150}
                className={
                  index === 0
                    ? 'pr-[3rem] xsm:pr-0'
                    : 'border-l border-[#EADFC8] pl-[3rem] xsm:border-t xsm:border-l-0 xsm:pl-0'
                }
              />
            ))}
          </div>
        ) : null}

        <div
          data-aos='fade-up'
          className='flex items-center gap-[3rem] py-[2.5rem] xsm:flex-col xsm:items-stretch xsm:gap-[2rem]'
        >
          {nav?.length ? (
            <div className='flex-1'>
              <h2 className={HEADING}>Điều hướng</h2>
              <nav className='mt-[0.875rem] flex flex-wrap items-center gap-y-[0.5rem] text-[0.875rem] text-[#374151]'>
                {nav.map((item, index) => {
                  const href = item.link?.url
                  const title = item.link?.title
                  if (!href || !title) return null

                  return (
                    <Link
                      key={`${href}-${index}`}
                      href={href}
                      target={item.link?.target}
                      className='border-l border-[#D9C08A] px-[0.875rem] leading-none transition-colors first:border-l-0 first:pl-0 hover:text-[#B88E4F]'
                    >
                      {title}
                    </Link>
                  )
                })}
              </nav>
            </div>
          ) : null}

          <div className='flex flex-[1.6] items-center gap-[2rem] border-l border-[#D9C08A] pl-[3rem] xsm:flex-col xsm:items-stretch xsm:gap-[1rem] xsm:border-l-0 xsm:pl-0'>
            <div className='shrink-0'>
              {newsletter?.heading ? <h2 className={HEADING}>{newsletter.heading}</h2> : null}
              {newsletter?.description ? (
                <p className='mt-[0.5rem] max-w-[16rem] text-[0.8125rem] leading-[1.5] text-[#6B7280]'>
                  {newsletter.description}
                </p>
              ) : null}
            </div>
            <div className='flex flex-1 justify-end'>
              <NewsletterForm
                placeholder={newsletter?.placeholder}
                submitAriaLabel={newsletter?.submit_aria_label}
              />
            </div>
          </div>
        </div>

        {/* Đặt bản quyền nằm gọn trong dải sóng ở đáy ảnh nền */}
        {newsletter?.copyright ? (
          <p className='mt-auto flex h-[3.25rem] items-center justify-center text-[0.75rem] text-[#9CA3AF] xsm:h-auto xsm:py-[1.25rem]'>
            {newsletter.copyright}
          </p>
        ) : null}
      </div>
    </footer>
  )
}

type ContactRow = {
  icon: LucideIcon
  label: string
  value: string
  href: string
  target?: string
}

const contactFromLink = (
  link: ILink | undefined,
  icon: LucideIcon,
  fallbackLabel: string,
): ContactRow | null => {
  const value = link?.title
  if (!value) return null

  return {
    icon,
    label: fallbackLabel,
    value,
    href: link?.url || '#',
    target: link?.target,
  }
}

type OfficeBlockProps = { office: FooterOffice; className: string; delay: number }

const OfficeBlock = ({ office, className, delay }: OfficeBlockProps) => {
  const contacts = [
    contactFromLink(office.phone, Phone, 'Điện thoại'),
    contactFromLink(office.hotline, Headset, 'Hotline'),
    contactFromLink(office.mail, Mail, 'Email'),
  ].filter((row): row is ContactRow => Boolean(row))

  const addressTitle = office.address?.title
  const addressUrl = office.address?.url

  return (
    <div
      data-aos='fade-up'
      data-aos-delay={delay}
      className={`py-[2.5rem] xsm:py-[2rem] ${className}`}
    >
      {office.title ? <h2 className={HEADING}>{office.title}</h2> : null}
      {addressTitle ? (
        addressUrl ? (
          <a
            href={addressUrl}
            target={office.address?.target}
            className='mt-[1rem] block max-w-[34rem] text-[0.875rem] leading-[1.65] text-[#4B5563] transition-colors hover:text-[#B88E4F]'
          >
            {addressTitle}
          </a>
        ) : (
          <p className='mt-[1rem] max-w-[34rem] text-[0.875rem] leading-[1.65] text-[#4B5563]'>
            {addressTitle}
          </p>
        )
      ) : null}

      {contacts.length ? (
        <ul className='mt-[1.75rem] flex flex-col gap-[0.875rem]'>
          {contacts.map(({ icon: Icon, label, value, href, target }) => (
            <li
              key={label}
              className='flex items-center text-[0.875rem]'
            >
              <span className='flex size-[1.75rem] shrink-0 items-center justify-center rounded-full border border-[#D9C08A] text-[#B88E4F]'>
                <Icon className='size-[0.85rem]' />
              </span>
              <span className='ml-[0.75rem] w-[6rem] shrink-0 text-[#4B5563]'>{label}</span>
              <a
                href={href}
                target={target}
                className='font-semibold text-[#1F2A37] transition-colors hover:text-[#B88E4F]'
              >
                {value}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default Footer
