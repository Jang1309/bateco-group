import { cn } from '@/lib/utils'
import type { AboutMilestone } from '@/views/about/data'

const TAG_COLORS = ['text-[#34D399]', 'text-[#3B82F6]', 'text-[#C59B27]', 'text-[#047857]']

type MilestoneCardProps = {
  milestone: AboutMilestone
  index: number
  active?: boolean
}

const MilestoneCard = ({ milestone, index, active }: MilestoneCardProps) => (
  <article
    data-active={active}
    className='about-pulse group relative flex flex-col gap-[0.47rem] rounded-[0.9375rem] border border-[rgba(232,223,208,0.7)] bg-[rgba(255,255,255,0.9)] p-[1.64rem] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-[border-color,box-shadow] duration-300 hover:border-[#C59B27] hover:shadow-[0_1px_2px_0_rgba(0,0,0,0.05),0_0_0_0.3125rem_rgba(197,155,39,0.2),0_1.5625rem_1.95rem_-0.39rem_rgba(0,0,0,0.1),0_0.625rem_0.78rem_-0.47rem_rgba(0,0,0,0.1),inset_0_0_0_1px_#C59B27] data-[active=true]:border-[#C59B27] data-[active=true]:shadow-[0_1px_2px_0_rgba(0,0,0,0.05),0_0_0_0.3125rem_rgba(197,155,39,0.2),0_0_0_0_transparent,0_0_0_0_transparent,inset_0_0_0_1px_#C59B27] xsm:p-[1.25rem]'
  >
    <span
      aria-hidden
      className='pointer-events-none absolute inset-0 rounded-[calc(0.9375rem-1px)] bg-[linear-gradient(180deg,#0B1B2B,#07121E)] opacity-0 transition-opacity duration-300 group-hover:opacity-100'
    />
    <p className='relative bg-[linear-gradient(90deg,#FDE68A,#C59B27_50%,#FEF9C3)] bg-clip-text text-[2.8125rem] leading-[3.125rem] font-bold tracking-[-0.07rem] text-[#0B1B2B] transition-colors duration-300 group-hover:text-transparent xsm:text-[2rem] xsm:leading-[1.2]'>
      {milestone.year}
    </p>
    <p
      className={cn(
        'relative text-[0.78rem] leading-[1.17rem] font-bold tracking-[0.039rem] uppercase transition-colors duration-300 group-hover:text-[#FCD34D] xsm:text-[0.6875rem]',
        TAG_COLORS[index % TAG_COLORS.length],
      )}
    >
      {milestone.tag}
    </p>
    <h3 className='relative pt-[0.5rem] text-[1.09rem] leading-[1.5rem] font-bold text-[#1E293B] transition-colors duration-300 group-hover:text-white xsm:text-[1rem]'>
      {milestone.title}
    </h3>
    <p className='relative text-[0.9375rem] leading-[1.52rem] text-[#475569] transition-colors duration-300 group-hover:text-[#CBD5E1] xsm:text-[0.875rem] xsm:leading-[1.55]'>
      {milestone.description}
    </p>
  </article>
)

export default MilestoneCard
