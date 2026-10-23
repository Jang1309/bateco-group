type SectionHeadingProps = {
  eyebrow: string
  title: string
  className?: string
}

const SectionHeading = ({ eyebrow, title, className }: SectionHeadingProps) => (
  <div
    data-aos='business-rise'
    data-aos-duration='800'
    className={className}
  >
    <p className='flex items-center gap-[0.75rem] text-[0.75rem] font-bold tracking-[0.2em] text-[#B88E4F] uppercase'>
      <span className='h-px w-[2rem] bg-[#C6A15B]' />
      {eyebrow}
    </p>
    <h2 className='mt-[1rem] max-w-[36rem] text-[2.5rem] leading-[1.25] font-bold text-[#1A2B48] xsm:text-[1.625rem]'>
      {title}
    </h2>
  </div>
)

export default SectionHeading
