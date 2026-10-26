import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/shared/json-ld'
import endpoints from '@/configs/endpoints'
import ENV from '@/configs/env'
import { hrefFor, localePathsFor } from '@/configs/routes'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import { assertPageLocale } from '@/i18n/assert-locale'
import { collectionPageGraph } from '@/lib/schema'
import projectsService from '@/services/projects'
import metadataValues from '@/utils/metadataValues'
import ProjectsView from '@/views/projects'

export function generateStaticParams() {
  return [{ locale: 'vi' as const }]
}
type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    endpoints.projects.rank_math[locale as keyof typeof endpoints.projects.rank_math],
  )
  const t = await getTranslations({ locale, namespace: 'Meta' })
  return metadataValues(res, {
    locale,
    description: t('projectsDesc'),
    ...localePathsFor('projects', locale),
  })
}

const ProjectsPage = async ({ params }: Props) => {
  const { locale } = await params
  assertPageLocale(locale, 'vi')
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const path = hrefFor('projects', locale)

  const [pageResponse, sectorsResponse, featuredResponse] = await Promise.all([
    projectsService.getProjectsPage(locale),
    projectsService.getProjectsCategories(locale),
    projectsService.getProjectsList({
      lang: locale,
      limit: 3,
      paged: 1,
      order: 'DESC',
    }),
  ])

  return (
    <>
      <JsonLd
        data={collectionPageGraph({
          domain: ENV.DOMAIN,
          locale: 'vi',
          path,
          name: t('projectsTitle'),
          description: t('projectsDesc'),
          crumbName: t('projectsTitle').split('|')[0]!.trim(),
        })}
      />
      <ProjectsView
        locale={locale}
        content={pageResponse?.acf}
        sectors={sectorsResponse?.data ?? []}
        featured={featuredResponse?.data ?? []}
      />
    </>
  )
}

export default ProjectsPage
