import { useTranslations } from 'next-intl'
import { Suspense } from 'react'

import { sectionId } from '@/configs/section-ids'
import type {
  AdministrativeDocumentCategoryItem,
  AdministrativeDocumentResponse,
} from '@/interfaces/administrativeDocument.interface'
import AboutGovernanceDocuments from '@/views/about-governance/documents'
import GovernanceHero from '@/views/governance/hero'

type AboutGovernanceViewProps = {
  locale: string
  content?: AdministrativeDocumentResponse
  categories: AdministrativeDocumentCategoryItem[]
}

const DocumentsFallback = ({ locale }: { locale: string }) => {
  const t = useTranslations('AboutGovernance')

  return (
    <section
      id={sectionId('documents', locale)}
      className='bg-[#FAFBFC] pt-[1.5rem] pb-[6rem] xsm:pb-[3.5rem]'
    >
      <p className='mx-auto max-w-[95rem] px-[3.75rem] py-[3rem] text-center text-[0.9375rem] text-[#64748B] xsm:px-[1.25rem]'>
        {t('loading')}
      </p>
    </section>
  )
}

const AboutGovernanceView = ({ locale, content, categories }: AboutGovernanceViewProps) => {
  return (
    <main>
      <GovernanceHero data={content?.banner} />
      <Suspense fallback={<DocumentsFallback locale={locale} />}>
        <AboutGovernanceDocuments
          locale={locale}
          categories={categories}
        />
      </Suspense>
    </main>
  )
}

export default AboutGovernanceView
