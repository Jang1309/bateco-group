import { Skeleton } from '@/components/ui/skeleton'

const ProjectCardSkeleton = () => (
  <div className='relative aspect-[3/4] overflow-hidden rounded-[0.75rem] bg-[#EEF1F5] shadow-[0_0.75rem_2rem_rgba(15,28,51,0.06)] xsm:aspect-[4/5] xsm:rounded-[0.5rem]'>
    <Skeleton className='absolute inset-0 rounded-none bg-[#E2E8F0]' />
    <div className='absolute inset-x-0 bottom-0 space-y-[0.75rem] p-[1.75rem] xsm:p-[1.25rem]'>
      <Skeleton className='h-[2.5rem] w-[4rem] bg-white/50' />
      <Skeleton className='h-[0.75rem] w-[40%] bg-white/40' />
      <Skeleton className='h-[1.5rem] w-[85%] bg-white/55' />
      <Skeleton className='h-[1.5rem] w-[60%] bg-white/45' />
      <Skeleton className='mt-[0.25rem] h-[0.125rem] w-[2rem] bg-white/50' />
    </div>
  </div>
)

type ProjectListSkeletonProps = {
  count?: number
}

export const ProjectListSkeleton = ({ count = 6 }: ProjectListSkeletonProps) => (
  <ul
    aria-hidden
    className='mt-[2.5rem] grid grid-cols-3 gap-[1.75rem] xsm:mt-[1.5rem] xsm:grid-cols-1 xsm:gap-[1rem]'
  >
    {Array.from({ length: count }, (_, index) => (
      <li key={index}>
        <ProjectCardSkeleton />
      </li>
    ))}
  </ul>
)

export default ProjectCardSkeleton
