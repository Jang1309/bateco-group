import { getTranslations } from 'next-intl/server'

import Banner from '@/components/shared/banner'
import type { AboutHero as AboutHeroData } from '@/views/about/data'
import ScrollCue from '@/views/about/hero/components/scroll-cue'

type AboutHeroProps = {
  hero: AboutHeroData
}

const AboutHero = async ({ hero }: AboutHeroProps) => {
  const t = await getTranslations('AboutPage')

  return (
    <div className='relative'>
      <Banner
        imageSrc={hero.image.src}
        imageAlt={hero.image.alt}
        srTitle={hero.srTitle}
        eyebrow={hero.eyebrow}
        titleLine1={hero.titleLine1}
        titleLine2={hero.titleLine2}
        description={hero.description}
        animated
        className='h-[50rem] xsm:h-[38rem]'
        imageClassName='absolute inset-x-0 top-0 h-[46.875rem] object-cover object-[59%_0] xsm:h-full xsm:object-[72%_0]'
      />
      <ScrollCue label={t('scrollCue')} />
    </div>
  )
}

export default AboutHero
