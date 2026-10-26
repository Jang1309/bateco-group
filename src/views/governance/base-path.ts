import { PATHS } from '@/configs/routes'

/** Internal pathname of pages that reuse governance sidebar/pagination */
export type GovernanceBasePath =
  | (typeof PATHS.investor)['vi']
  | (typeof PATHS.investor)['en']
  | (typeof PATHS.aboutGovernance)['vi']
  | (typeof PATHS.aboutGovernance)['en']
