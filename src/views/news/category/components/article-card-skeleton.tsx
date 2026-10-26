import { Skeleton } from '@/components/ui/skeleton'

const ArticleCardSkeleton = () => (
  <div className='overflow-hidden rounded-[1rem] bg-white ring-1 ring-[#1A2B48]/[0.06]'>
    <Skeleton className='aspect-[16/10] w-full rounded-none bg-[#E2E8F0]' />
    <div className='space-y-[0.75rem] p-[1.75rem] xsm:p-[1.25rem]'>
      <Skeleton className='h-[0.75rem] w-[40%] bg-[#EEF1F5]' />
      <Skeleton className='h-[1.375rem] w-[90%] bg-[#EEF1F5]' />
      <Skeleton className='h-[1.375rem] w-[65%] bg-[#EEF1F5]' />
      <Skeleton className='h-[2.5rem] w-full bg-[#EEF1F5]' />
    </div>
  </div>
)

type ArticleListSkeletonProps = {
  count?: number
}

export const ArticleListSkeleton = ({ count = 6 }: ArticleListSkeletonProps) => (
  <ul
    aria-hidden
    className='mt-[2.25rem] grid grid-cols-3 gap-[2rem] xsm:mt-[1.5rem] xsm:grid-cols-1 xsm:gap-[1.25rem]'
  >
    {Array.from({ length: count }, (_, index) => (
      <li key={index}>
        <ArticleCardSkeleton />
      </li>
    ))}
  </ul>
)

export default ArticleCardSkeleton
