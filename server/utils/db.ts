import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from '../database/schema'

export { sql, eq, and, or, asc, desc, sum, isNull } from 'drizzle-orm'

export const tables = schema

export function useDrizzle() {
  const config = useRuntimeConfig()
  return drizzle(postgres(config.postgres.url, { prepare: false }), { schema })
}
