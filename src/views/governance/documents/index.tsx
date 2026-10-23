import type { GovernanceBasePath } from '@/views/governance/base-path'
import {
  type GovernanceCategory,
  type GovernanceMenuItem,
  getGovernanceGroup,
  GOVERNANCE_MENU,
} from '@/views/governance/data'

import CompanyProfile from './components/company-profile'
import DocumentList from './components/document-list'
import ReportList from './components/report-list'
import GovernanceSidebar from './components/sidebar'

type GovernanceDocumentsProps = {
  category: GovernanceCategory
  page: number
  menu?: GovernanceMenuItem[]
  basePath?: GovernanceBasePath
}

const GovernanceDocuments = ({
  category,
  page,
  menu = GOVERNANCE_MENU,
  basePath = '/quan-he-nha-dau-tu',
}: GovernanceDocumentsProps) => {
  return (
    <section
      id='van-ban'
      className='bg-[#FAFBFC] pt-[1.5rem] pb-[6rem] xsm:pb-[3.5rem]'
    >
      <div className='mx-auto grid max-w-[95rem] grid-cols-[20rem_1fr] items-start gap-[2rem] px-[3.75rem] xsm:grid-cols-1 xsm:gap-[1rem] xsm:px-[1.25rem]'>
        <div
          data-aos='business-rise'
          data-aos-duration='800'
          className='self-stretch xsm:self-auto'
        >
          <GovernanceSidebar
            active={category}
            menu={menu}
            basePath={basePath}
          />
        </div>

        <div
          data-aos='business-rise'
          data-aos-duration='800'
          data-aos-delay='100'
          className='rounded-[0.75rem] border border-[#EEF1F5] bg-white px-[2rem] py-[2.25rem] shadow-[0_0.5rem_1.5rem_rgba(15,28,51,0.05)] xsm:px-[1rem] xsm:py-[1.5rem]'
        >
          {category.type === 'profile' ? (
            <CompanyProfile
              key={category.id}
              category={category}
            />
          ) : category.type === 'reports' ? (
            <ReportList
              category={category}
              heading={getGovernanceGroup(category.id)?.title ?? category.title}
              page={page}
              basePath={basePath}
            />
          ) : (
            <DocumentList
              category={category}
              page={page}
              basePath={basePath}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default GovernanceDocuments
