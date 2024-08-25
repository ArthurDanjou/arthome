import type { Config } from 'drizzle-kit'
import { config } from 'dotenv'

config()

export default {
  dialect: 'postgresql',
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  dbCredentials: {
    url: process.env.NUXT_POSTGRES_URL,
  },
} satisfies Config
