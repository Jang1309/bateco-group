import Image from 'next/image'

import type { SectorDetail } from '@/views/business-detail/data'

import HeroContent from './components/content'

const SectorHero = ({ sector }: { sector: SectorDetail }) => {
  return (
    <section className='relative h-[70vh] overflow-hidden bg-[#0F1C33]'>
      <Image
        src={sector.hero.image}
        alt=''
        fill
        priority
        sizes='100vw'
        className='object-cover object-center'
      />
      <div
        aria-hidden
        className='absolute inset-0 bg-[linear-gradient(90deg,rgba(10,22,44,0.92)_0%,rgba(10,22,44,0.75)_45%,rgba(10,22,44,0.25)_100%)] xsm:bg-[rgba(10,22,44,0.78)]'
      />
      <HeroContent sector={sector} />
    </section>
  )
}

export default SectorHero
