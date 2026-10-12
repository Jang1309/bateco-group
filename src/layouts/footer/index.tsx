import { Headset, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'

import { FOOTER_NAV, type Office, OFFICES } from './data'
import NewsletterForm from './newsletter-form'

const HEADING =
  'text-[1.125rem] font-bold tracking-[0.04em] text-[#B88E4F] uppercase xsm:text-[1rem]'

const Footer = () => {
  const t = useTranslations('Header')

  return (
    // Footer cao đúng theo tỉ lệ ảnh nền (1280×583) nên ảnh hiện trọn vẹn, không bị cắt.
    // html font-size = 1vw nên nội dung (đơn vị rem) co giãn cùng tỉ lệ với ảnh.
    <footer className='relative flex aspect-[1280/583] flex-col overflow-hidden bg-white px-[3.125rem] xsm:aspect-auto xsm:px-[1.5rem]'>
      {/* Hình vẽ thành phố mờ làm nền (đã có sẵn viền trên và dải sóng ở đáy) */}
      <Image
        src='/footer/bg.svg'
        alt=''
        fill
        unoptimized
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
              src='/header/d-logo.png'
              alt={t('logoAlt')}
              width={523}
              height={140}
              className='h-[2.5rem] w-auto'
            />
          </Link>
        </div>

        <div className='grid grid-cols-2 border-b border-[#EADFC8] xsm:grid-cols-1'>
          {OFFICES.map((office, index) => (
            <OfficeBlock
              key={office.title}
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

        <div
          data-aos='fade-up'
          className='flex items-center gap-[3rem] py-[2.5rem] xsm:flex-col xsm:items-stretch xsm:gap-[2rem]'
        >
          <div className='flex-1'>
            <h2 className={HEADING}>Điều hướng</h2>
            <nav className='mt-[0.875rem] flex flex-wrap items-center gap-y-[0.5rem] text-[0.875rem] text-[#374151]'>
              {FOOTER_NAV.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className='border-l border-[#D9C08A] px-[0.875rem] leading-none transition-colors first:border-l-0 first:pl-0 hover:text-[#B88E4F]'
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
          </div>

          <div className='flex flex-[1.6] items-center gap-[2rem] border-l border-[#D9C08A] pl-[3rem] xsm:flex-col xsm:items-stretch xsm:gap-[1rem] xsm:border-l-0 xsm:pl-0'>
            <div className='shrink-0'>
              <h2 className={HEADING}>Đăng ký nhận tin</h2>
              <p className='mt-[0.5rem] max-w-[16rem] text-[0.8125rem] leading-[1.5] text-[#6B7280]'>
                Cập nhật những thông tin mới nhất từ Bateco Group.
              </p>
            </div>
            <div className='flex flex-1 justify-end'>
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Đặt bản quyền nằm gọn trong dải sóng ở đáy ảnh nền */}
        <p className='mt-auto flex h-[3.25rem] items-center justify-center text-[0.75rem] text-[#9CA3AF] xsm:h-auto xsm:py-[1.25rem]'>
          © {new Date().getFullYear()} Bateco Group. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

type OfficeBlockProps = { office: Office; className: string; delay: number }

const OfficeBlock = ({ office, className, delay }: OfficeBlockProps) => {
  const contacts = [
    {
      icon: Phone,
      label: 'Điện thoại',
      value: office.phone,
      href: `tel:${office.phone.replace(/\s/g, '')}`,
    },
    {
      icon: Headset,
      label: 'Hotline',
      value: office.hotline,
      href: `tel:${office.hotline.replace(/\s/g, '')}`,
    },
    { icon: Mail, label: 'Email', value: office.email, href: `mailto:${office.email}` },
  ]

  return (
    <div
      data-aos='fade-up'
      data-aos-delay={delay}
      className={`py-[2.5rem] xsm:py-[2rem] ${className}`}
    >
      <h2 className={HEADING}>{office.title}</h2>
      <p className='mt-[1rem] max-w-[34rem] text-[0.875rem] leading-[1.65] text-[#4B5563]'>
        {office.address}
      </p>

      <ul className='mt-[1.75rem] flex flex-col gap-[0.875rem]'>
        {contacts.map(({ icon: Icon, label, value, href }) => (
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
              className='font-semibold text-[#1F2A37] transition-colors hover:text-[#B88E4F]'
            >
              {value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Footer
