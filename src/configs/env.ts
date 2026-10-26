import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const env = createEnv({
  server: {
    /** Shared secret for POST /api/revalidate (CMS webhook). Optional in local/dev. */
    REVALIDATE_SECRET: z.string().min(16).optional(),
  },
  client: {
    NEXT_PUBLIC_DOMAIN: z.url(),
    NEXT_PUBLIC_CMS: z.url().optional(),
    NEXT_PUBLIC_API: z.string().min(1).optional(),
    NEXT_PUBLIC_API_CF7: z.url().optional(),
  },
  runtimeEnv: {
    REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_CMS: process.env.NEXT_PUBLIC_CMS,
    NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
    NEXT_PUBLIC_API_CF7: process.env.NEXT_PUBLIC_API_CF7,
  },
  emptyStringAsUndefined: true,
  skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
})

const ENV = {
  DOMAIN: env.NEXT_PUBLIC_DOMAIN,
  CMS: env.NEXT_PUBLIC_CMS,
  API: env.NEXT_PUBLIC_API,
  API_CF7: env.NEXT_PUBLIC_API_CF7,
  REVALIDATE_SECRET: env.REVALIDATE_SECRET,
}

export default ENV
