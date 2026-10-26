import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import careersService from '@/services/careers'
import CareersView from '@/views/careers'

export const metadata: Metadata = {
  title: 'Cơ hội nghề nghiệp | Bateco Group',
  description:
    'Khám phá cơ hội nghề nghiệp tại Bateco Group — môi trường chuyên nghiệp, lộ trình phát triển rõ ràng và chế độ đãi ngộ hấp dẫn.',
}

type Props = {
  params: Promise<{ locale: string }>
}

const CareersPage = async ({ params }: Props) => {
  const { locale } = await params
  setRequestLocale(locale)

  const [pageResponse, departmentsResponse, locationsResponse] = await Promise.all([
    careersService.getCareersPage(locale).catch(() => null),
    careersService.getDepartments(locale).catch(() => null),
    careersService.getLocations(locale).catch(() => null),
  ])

  return (
    <CareersView
      locale={locale}
      content={pageResponse?.acf}
      departments={departmentsResponse?.data ?? []}
      locations={locationsResponse?.data ?? []}
    />
  )
}

export default CareersPage
