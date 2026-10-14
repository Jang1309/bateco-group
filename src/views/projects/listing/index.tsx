import SectionHeading from '@/components/shared/section-heading'
import { filterProjects, PROJECTS_PER_PAGE } from '@/views/projects/data'

import FilterTabs from './components/filter-tabs'
import ProjectPagination from './components/pagination'
import ProjectCard from './components/project-card'
import SearchSort from './components/search-sort'
import type { ProjectQuery } from './query'

type ProjectListingProps = {
  query: ProjectQuery
}

const ProjectListing = ({ query }: ProjectListingProps) => {
  const projects = filterProjects({
    sector: query.sector,
    query: query.q,
    sort: query.sort ?? 'moi-nhat',
  })
  const totalPages = Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE))
  const currentPage = Math.min(Math.max(1, query.page ?? 1), totalPages)
  const offset = (currentPage - 1) * PROJECTS_PER_PAGE
  const visible = projects.slice(offset, offset + PROJECTS_PER_PAGE)

  return (
    <section
      id='du-an-khac'
      className='scroll-mt-[6rem] border-t border-[#EEF1F5] bg-[#FAFBFC] pt-[5rem] pb-[6rem] xsm:pt-[3rem] xsm:pb-[3.5rem]'
    >
      <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
        <SectionHeading title='Dự án khác' />

        <div
          data-aos='business-rise'
          data-aos-duration='800'
          className='mt-[2.5rem] flex flex-col gap-[1.25rem] xsm:mt-[1.5rem] xsm:gap-[1rem]'
        >
          <FilterTabs current={query} />
          <SearchSort current={query} />
        </div>

        {visible.length > 0 ? (
          <ul
            key={JSON.stringify(query)}
            className='mt-[2.5rem] grid grid-cols-3 gap-[1.75rem] xsm:mt-[1.5rem] xsm:grid-cols-1 xsm:gap-[1rem]'
          >
            {visible.map((project, index) => (
              <li
                key={project.id}
                className='business-hero-rise'
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <ProjectCard
                  project={project}
                  number={offset + index + 1}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className='mt-[2.5rem] rounded-[0.75rem] border border-dashed border-[#E2E8F0] bg-white py-[4rem] text-center text-[0.9375rem] text-[#64748B]'>
            Không tìm thấy dự án phù hợp.
          </p>
        )}

        <ProjectPagination
          current={query}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </section>
  )
}

export default ProjectListing
