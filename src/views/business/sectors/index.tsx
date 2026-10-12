import Logo from '@/layouts/header/components/logo'
import { SECTORS } from '@/views/business/data'

import SectorRow from './components/row'

const BusinessSectors = () => {
  return (
    <section className='relative bg-[#FAFBFC] pt-[1.875rem] pb-[6rem] xsm:pb-[3.5rem]'>
      <div
        data-aos='business-rise'
        data-aos-duration='800'
        className='mx-auto flex max-w-[95rem] items-center gap-[1.25rem] px-[3.75rem] xsm:px-[1.5rem]'
      >
        <span className='h-[0.0875rem] flex-1 bg-[linear-gradient(90deg,transparent,#C8A462)]' />
        <Logo imageClassName='h-[2.5rem] xsm:h-[2.25rem]' />
        <span className='h-[0.0875rem] flex-1 bg-[linear-gradient(90deg,#C8A462,transparent)]' />
      </div>

      <ol className='mx-auto mt-[4rem] max-w-[95rem] px-[3.75rem] xsm:mt-[2.5rem] xsm:px-[1.5rem]'>
        {SECTORS.map((sector, index) => (
          <SectorRow
            key={sector.id}
            sector={sector}
            index={index}
          />
        ))}
      </ol>
    </section>
  )
}

export default BusinessSectors
