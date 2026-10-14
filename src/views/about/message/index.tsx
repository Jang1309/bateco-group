import Image from 'next/image'

import Reveal from '@/views/about/components/reveal'
import type { AboutMessage as AboutMessageData } from '@/views/about/data'

type AboutMessageProps = {
  message: AboutMessageData
}

const AboutMessage = ({ message }: AboutMessageProps) => {
  return (
    <section className='bg-white px-[5rem] pt-[7.5rem] xsm:px-[1.5rem] xsm:pt-[3.5rem] xsm:pb-[3rem]'>
      <div className='grid grid-cols-12 gap-[5rem] xsm:grid-cols-1 xsm:gap-[2.5rem]'>
        <div className='col-span-4 flex min-h-[44.375rem] flex-col items-center xsm:col-span-1 xsm:min-h-0'>
          <Reveal
            variant='up'
            className='w-full max-w-[30.5rem] drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)] xsm:max-w-[18rem]'
          >
            <div className='relative aspect-[341/426] w-full bg-[#F5EDE1] [clip-path:polygon(0_0,100%_0,100%_100%,5.86rem_100%,0_calc(100%-5.86rem))] xsm:[clip-path:polygon(0_0,100%_0,100%_100%,3.5rem_100%,0_calc(100%-3.5rem))]'>
              <Reveal
                variant='wipe'
                delay={0.1}
                className='absolute inset-0'
              >
                <Image
                  src={message.image.src}
                  alt={message.image.alt}
                  fill
                  sizes='(max-width: 639px) 80vw, 27vw'
                  className='object-cover object-top'
                />
              </Reveal>
            </div>
          </Reveal>

          <Reveal
            variant='up'
            delay={0.2}
            className='flex flex-col items-center gap-[0.47rem] pt-[2.5rem] text-center xsm:pt-[1.5rem]'
          >
            <h2 className='text-[2.5rem] leading-[1.19] font-bold text-balance text-[#182433] uppercase xsm:text-[1.5rem]'>
              {message.name}
            </h2>
            <p className='text-[1.17rem] leading-[1.25rem] font-bold text-[#A78044] uppercase xsm:text-[0.8125rem]'>
              {message.title}
            </p>
          </Reveal>
        </div>

        <div className='col-span-8 flex flex-col justify-center pt-[1.25rem] xsm:col-span-1 xsm:pt-0'>
          <div className='pb-[5rem] xsm:pb-0'>
            <blockquote className='relative pl-[3.28rem] xsm:pl-[1.25rem]'>
              <Reveal
                variant='grow-y'
                className='absolute inset-y-0 left-0 w-[0.156rem] origin-top bg-[#C29B53] xsm:w-[0.125rem]'
              />
              <Reveal
                variant='unveil'
                delay={0.15}
              >
                <p className='text-[1.5625rem] leading-[2.34rem] text-[#1B2533] xsm:text-[1rem] xsm:leading-[1.65]'>
                  &ldquo;{message.quote}&rdquo;
                </p>
              </Reveal>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMessage
