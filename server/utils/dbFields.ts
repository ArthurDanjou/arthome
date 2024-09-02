import { serial, timestamp } from 'drizzle-orm/pg-core'
/**
 * A centralized list of standardized Drizzle ORM schema field definitions to prevent duplication errors
 */

export const createdAt = timestamp('created_at', { mode: 'string', withTimezone: true, precision: 0 }).defaultNow()
export const updatedAt = timestamp('updated_at', { mode: 'string', withTimezone: true, precision: 0 }).defaultNow().$onUpdateFn(() => sql`(current_timestamp)`)
export const id = serial('id').primaryKey()

export const timestamps = {
  createdAt,
  updatedAt,
}
