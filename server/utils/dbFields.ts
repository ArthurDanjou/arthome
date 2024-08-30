import { serial, timestamp } from 'drizzle-orm/pg-core'
/**
 * A centralized list of standardized Drizzle ORM schema field definitions to prevent duplication errors
 */

export const createdAt = timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow()
export const updatedAt = timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date())
export const id = serial('id').primaryKey()

export const timestamps = {
  createdAt,
  updatedAt,
}
