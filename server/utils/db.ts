import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../database/schema'

export { and, asc, desc, eq, isNull, or, sql, sum } from 'drizzle-orm'

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}

export type UserInsert = typeof schema.users.$inferInsert
