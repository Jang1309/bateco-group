import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react'

import DetailHero from '@/components/shared/detail-hero'
import SectionHeading from '@/components/shared/section-heading'
import { Link } from '@/i18n/navigation'
import ShareActions from '@/views/news/detail/share-actions'
import { getSectorLabel, PROJECTS, type ProjectDetail } from '@/views/projects/data'
import ProjectGallery from '@/views/projects/detail/gallery'
import ProjectCard from '@/views/projects/listing/components/project-card'

type ProjectDetailViewProps = {
  project: ProjectDetail
}

const ProjectDetailView = ({ project }: ProjectDetailViewProps) => {
  const sectorLabel = getSectorLabel(project.sector)
  // Ưu tiên dự án cùng lĩnh vực, thiếu thì bù bằng dự án khác
  const others = PROJECTS.filter((item) => item.id !== project.id)
    .sort((a, b) => Number(b.sector === project.sector) - Number(a.sector === project.sector))
    .slice(0, 3)

  return (
    <main>
      <DetailHero
        image={project.image}
        eyebrow={sectorLabel}
        title={project.title}
        description={project.summary}
        meta={
          <span className='inline-flex items-center gap-[0.375rem] font-medium text-[#475569]'>
            <MapPin
              className='size-[0.875rem] text-[#B5935E]'
              strokeWidth={1.75}
            />
            {project.location}
          </span>
        }
      />

      <article className='bg-white pt-[4.5rem] pb-[5rem] xsm:pt-[2rem] xsm:pb-[3rem]'>
        <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
          <div className='grid grid-cols-[minmax(0,54rem)_24rem] justify-between gap-[5rem] xlg:grid-cols-1 xlg:gap-[3rem]'>
            <div className='xlg:order-2'>
              {/* content là HTML từ CMS nội bộ (nguồn tin cậy) */}
              <div
                className='news-content [&>h2:first-child]:mt-0'
                dangerouslySetInnerHTML={{ __html: project.content }}
              />

              <div className='mt-[3.5rem] flex items-center justify-between gap-[1rem] border-t border-[#E2E8F0] pt-[1.5rem] xsm:flex-col xsm:items-start xsm:gap-[1.25rem]'>
                <Link
                  href='/projects'
                  className='group inline-flex items-center gap-[0.5rem] text-[0.875rem] font-bold text-[#1A2B48] transition-colors duration-300 hover:text-[#B5935E]'
                >
                  <ArrowLeft className='size-[1rem] transition-transform duration-300 group-hover:-translate-x-[0.1875rem]' />
                  Quay lại Dự án
                </Link>
                <ShareActions />
              </div>
            </div>

            <aside className='self-start lg:sticky lg:top-[7rem] xlg:order-1'>
              <div className='overflow-hidden rounded-[1rem] bg-[#0F1C33] p-[2rem] text-white shadow-[0_1.5rem_3rem_rgba(15,28,51,0.18)] xsm:rounded-[0.75rem] xsm:p-[1.5rem]'>
                <p className='text-[0.75rem] font-bold tracking-[0.16em] text-[#DFBA73] uppercase'>
                  Thông tin dự án
                </p>
                <dl className='mt-[1.25rem]'>
                  {project.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className='flex items-baseline justify-between gap-[1rem] border-b border-white/10 py-[0.875rem] last:border-b-0'
                    >
                      <dt className='shrink-0 text-[0.8125rem] text-white/60'>{spec.label}</dt>
                      <dd className='text-right text-[0.9375rem] font-semibold'>{spec.value}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href='/contact'
                  className='group mt-[1.5rem] flex items-center justify-center gap-[0.625rem] rounded-full bg-[linear-gradient(93deg,#C9A468_0%,#B5935E_55%,#9E7C48_100%)] px-[1.5rem] py-[0.875rem] text-[0.8125rem] font-bold tracking-[0.06em] text-white uppercase transition-[transform,box-shadow] duration-300 hover:-translate-y-[0.125rem] hover:shadow-[0_0.75rem_1.5rem_rgba(181,147,94,0.45)]'
                >
                  Liên hệ tư vấn
                  <ArrowRight className='size-[1rem] transition-transform duration-300 group-hover:translate-x-[0.25rem]' />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {project.gallery.length > 0 ? (
        <section className='bg-white pb-[5rem] xsm:pb-[3rem]'>
          <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
            <SectionHeading title='Hình ảnh dự án' />
            <ProjectGallery
              title={project.title}
              images={project.gallery}
            />
          </div>
        </section>
      ) : null}

      {others.length > 0 ? (
        <section className='border-t border-[#EEF1F5] bg-[#FAFBFC] py-[5rem] xsm:py-[3rem]'>
          <div className='mx-auto max-w-[95rem] px-[3.75rem] xsm:px-[1.25rem]'>
            <SectionHeading title='Dự án khác' />
            <ul className='mt-[2.5rem] grid grid-cols-3 gap-[1.75rem] xsm:mt-[1.5rem] xsm:grid-cols-1 xsm:gap-[1rem]'>
              {others.map((item, index) => (
                <li
                  key={item.id}
                  data-aos='business-rise'
                  data-aos-duration='800'
                  data-aos-delay={index * 100}
                >
                  <ProjectCard
                    project={item}
                    number={index + 1}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </main>
  )
}

export default ProjectDetailView
