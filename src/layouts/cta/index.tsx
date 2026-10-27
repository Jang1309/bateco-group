'use client'

import gsap from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const BTN =
  'relative flex size-10 shrink-0 items-center justify-center overflow-visible rounded-full xsm:size-8'

/** Nền kính mờ phía sau icon */
const GLASS =
  'absolute inset-0 z-0 rounded-full border border-white/60 bg-white/60 shadow-[0_4px_16px_-4px_rgba(26,43,72,0.18)] backdrop-blur-md'

const ScrollToTopIcon = ({
  circleRef,
}: {
  circleRef: React.RefObject<SVGCircleElement | null>
}) => (
  <svg
    viewBox='0 0 40 40'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='size-full'
    aria-hidden
  >
    <circle
      cx='20'
      cy='20'
      r='18'
      stroke='rgba(197,155,39,0.28)'
      strokeWidth='1.5'
    />
    <circle
      ref={circleRef}
      cx='20'
      cy='20'
      r='18'
      stroke='#C59B27'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <path
      d='M20 25.5V14.5M20 14.5L16 18.5M20 14.5L24 18.5'
      stroke='#1A2B48'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const CTA = ({ data }: { data: { icon: string; link: string }[] }) => {
  const circleRef = useRef<SVGCircleElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isVisibleRef = useRef(false)

  useEffect(() => {
    const circle = circleRef.current
    if (!circle) return

    const radius = circle.r.baseVal.value
    const circumference = 2 * Math.PI * radius

    circle.style.strokeDasharray = `${circumference} ${circumference}`
    circle.style.strokeDashoffset = `${circumference}`
    circle.style.transform = 'rotate(-90deg)'
    circle.style.transformOrigin = '50% 50%'

    let rafId: number | null = null
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = height > 0 ? Math.min(Math.max(scrollTop / height, 0), 1) : 0
      circle.style.strokeDashoffset = `${circumference - progress * circumference}`
      rafId = null
    }

    const throttledUpdate = () => {
      if (rafId === null) rafId = requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', throttledUpdate, { passive: true })
    window.addEventListener('resize', throttledUpdate)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', throttledUpdate)
      window.removeEventListener('resize', throttledUpdate)
    }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.set(el, { x: 40, autoAlpha: 0, pointerEvents: 'none' })
    }, el)

    let rafId: number | null = null

    const setVisible = (nextVisible: boolean) => {
      if (isVisibleRef.current === nextVisible) return
      isVisibleRef.current = nextVisible
      gsap.killTweensOf(el)

      if (nextVisible) {
        gsap.to(el, {
          x: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: true,
          onStart: () => {
            el.style.pointerEvents = 'auto'
          },
        })
      } else {
        gsap.to(el, {
          x: 40,
          autoAlpha: 0,
          duration: 0.35,
          ease: 'power2.in',
          overwrite: true,
          onComplete: () => {
            el.style.pointerEvents = 'none'
          },
        })
      }
    }

    const update = () => {
      setVisible((window.scrollY || document.documentElement.scrollTop) > 200)
      rafId = null
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      ctx.revert()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className='fixed right-8 bottom-16 z-40 flex flex-col items-center gap-4 will-change-transform xsm:right-4 xsm:bottom-20 xsm:gap-3'
    >
      {data.map((item, index) => (
        <Link
          key={item.link}
          href={item.link}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`CTA ${index + 1}`}
          className={`${BTN} transition-transform duration-300 hover:scale-105`}
        >
          <span
            className='ripple_video'
            aria-hidden
          />
          <span
            className={GLASS}
            aria-hidden
          />
          <span className='relative z-[1] block size-[1.25rem] xsm:size-[0.875rem]'>
            <Image
              src={item.icon}
              alt=''
              fill
              unoptimized
              sizes='24px'
              className='object-contain'
            />
          </span>
        </Link>
      ))}

      <button
        type='button'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label='Scroll to top'
        className={`${BTN} cursor-pointer transition-transform duration-300 hover:scale-105`}
      >
        <span
          className={GLASS}
          aria-hidden
        />
        <span className='relative z-[1] flex size-full items-center justify-center'>
          <ScrollToTopIcon circleRef={circleRef} />
        </span>
      </button>
    </div>
  )
}

export default CTA
