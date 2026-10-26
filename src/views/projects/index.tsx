import { useTranslations } from 'next-intl'
import { Suspense } from 'react'

import { sectionId } from '@/configs/section-ids'
import type {
  ProjectListItem,
  ProjectsPageResponse,
  SectorItem,
} from '@/interfaces/projects.interface'
import FeaturedProjects from '@/views/projects/featured'
import ProjectsHero from '@/views/projects/hero'
import ProjectListing from '@/views/projects/listing'

type ProjectsViewProps = {
  locale: string
  content?: ProjectsPageResponse
  sectors?: SectorItem[]
  featured?: ProjectListItem[]
}

const ListingFallback = ({ locale }: { locale: string }) => {
  const t = useTranslations('Projects')

  return (
    <section
      id={sectionId('projectsListing', locale)}
      className='scroll-mt-[6rem] border-t border-[#EEF1F5] bg-[#FAFBFC] pt-[5rem] pb-[6rem] xsm:pt-[3rem] xsm:pb-[3.5rem]'
    >
      <p className='mx-auto max-w-[95rem] px-[3.75rem] py-[3rem] text-center text-[0.9375rem] text-[#64748B] xsm:px-[1.25rem]'>
        {t('loading')}
      </p>
    </section>
  )
}

const ProjectsView = ({ locale, content, sectors = [], featured = [] }: ProjectsViewProps) => {
  return (
    <main>
      <ProjectsHero data={content?.banner} />
      <FeaturedProjects projects={featured} />
      <Suspense fallback={<ListingFallback locale={locale} />}>
        <ProjectListing
          locale={locale}
          sectors={sectors}
        />
      </Suspense>
    </main>
  )
}

export default ProjectsView
