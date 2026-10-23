import Image from 'next/image'
import Link from 'next/link'

export default function RootNotFound() {
  return (
    <main className='relative flex min-h-dvh flex-col overflow-hidden bg-[#FDFBF7] text-[#1a2b48]'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40rem_28rem_at_85%_20%,rgba(181,147,94,0.12),transparent_70%)]'
      />

      <div className='relative z-[1] mx-auto flex w-full max-w-[95rem] flex-1 flex-col px-[2.5rem] py-[2.5rem]'>
        <Link
          href='/'
          aria-label='Bateco Group'
          className='w-fit cursor-pointer'
        >
          <Image
            src='/logo.png'
            alt='Bateco Group'
            width={200}
            height={54}
            priority
            className='h-[2.75rem] w-auto'
          />
        </Link>

        <div className='grid flex-1 grid-cols-2 items-center gap-[4rem]'>
          <div className='border-l-[0.1875rem] border-[#b5935e] pl-[3.125rem]'>
            <p className='bg-[linear-gradient(135deg,#dfba73_0%,#b5935e_55%,#8c6d3f_100%)] bg-clip-text text-[8rem] leading-[0.9] font-bold tracking-[-0.2rem] text-transparent'>
              404
            </p>
            <h1 className='mt-[1.5rem] text-[2.5rem] leading-[1.25] font-bold uppercase'>
              Page not found
            </h1>
            <p className='mt-[1rem] max-w-[28rem] text-[1.0625rem] leading-[1.6] font-medium text-[#475569]'>
              The page you are looking for does not exist or has been moved.
            </p>
            <Link
              href='/'
              className='mt-[2.25rem] inline-flex cursor-pointer items-center justify-center bg-[#b5935e] px-[1.5rem] py-[0.875rem] text-[0.875rem] font-bold tracking-[0.04rem] text-white uppercase shadow-[0_0.25rem_0.75rem_rgba(181,147,94,0.35)] transition-colors hover:bg-[#a4834f]'
            >
              Back to home
            </Link>
          </div>

          <div className='relative mx-auto w-full max-w-[32rem]'>
            <div className='overflow-hidden rounded-[1.25rem] bg-white shadow-[0_1.5rem_3.5rem_rgba(26,43,72,0.12)] ring-1 ring-[#b5935e]/20'>
              <Image
                src='/404.gif'
                alt=''
                width={800}
                height={600}
                unoptimized
                priority
                className='h-auto w-full object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
