type ScrollCueProps = {
  label: string
}

const ScrollCue = ({ label }: ScrollCueProps) => (
  <div
    aria-hidden
    className='pointer-events-none absolute top-[16.77rem] right-[3.125rem] z-[2] flex flex-col items-center gap-[0.9375rem] xsm:hidden'
  >
    <span className='relative h-[6.25rem] w-[0.117rem] overflow-hidden bg-[rgba(182,141,76,0.2)]'>
      <span className='about-scroll-line absolute inset-0 bg-[rgba(182,141,76,0.8)]' />
    </span>
    <span className='rotate-180 text-[0.78125rem] leading-[1.17rem] font-bold tracking-[0.234rem] text-[#B68D4C] uppercase [writing-mode:vertical-rl]'>
      {label}
    </span>
    <span className='h-[3.75rem] w-[0.117rem] bg-[rgba(182,141,76,0.4)]' />
  </div>
)

export default ScrollCue
