import { useTranslations } from 'next-intl'
import { Suspense } from 'react'

import type { CareersPageResponse, CareersTaxonomyItem } from '@/interfaces/careers.interface'
import CareersHero from '@/views/careers/hero'
import CareersJobs from '@/views/careers/jobs'
import CareersProcess from '@/views/careers/process'
import CareersWhy from '@/views/careers/why'

type CareersViewProps = {
  locale: string
  content?: CareersPageResponse
  departments?: CareersTaxonomyItem[]
  locations?: CareersTaxonomyItem[]
}

const JobsFallback = () => {
  const t = useTranslations('Careers')

  return (
    <section className='bg-[#FAFBFC] py-[5rem] xsm:py-[3rem]'>
      <p className='mx-auto max-w-[95rem] px-[3.75rem] text-center text-[0.9375rem] text-[#64748B] xsm:px-[1.25rem]'>
        {t('loading')}
      </p>
    </section>
  )
}

const CareersView = ({ locale, content, departments = [], locations = [] }: CareersViewProps) => {
  return (
    <main>
      <CareersHero data={content?.banner} />
      <CareersWhy data={content?.careers_why} />
      <Suspense fallback={<JobsFallback />}>
        <CareersJobs
          locale={locale}
          departments={departments}
          locations={locations}
        />
      </Suspense>
      <CareersProcess data={content?.process} />
    </main>
  )
}

export default CareersView
