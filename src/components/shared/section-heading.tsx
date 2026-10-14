type SectionHeadingProps = {
  title: string
}

const SectionHeading = ({ title }: SectionHeadingProps) => {
  return (
    <h2
      data-aos='business-rise'
      data-aos-duration='800'
      className='flex items-center gap-[1.5rem] text-[1.75rem] leading-none font-bold tracking-[0.04em] text-[#1A2B48] uppercase xsm:gap-[1rem] xsm:text-[1.375rem]'
    >
      <span
        aria-hidden
        className='h-[0.125rem] w-[4rem] bg-[linear-gradient(90deg,rgba(198,161,91,0),#C6A15B)] xsm:w-[2.5rem]'
      />
      {title}
    </h2>
  )
}

export default SectionHeading
