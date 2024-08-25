import * as pg from 'drizzle-orm/pg-core'

/**
 * A centralized list of standardized Drizzle ORM schema field definitions to prevent duplication errors
 */

export const createdAt = pg
  .timestamp('created_at', { mode: 'date', precision: 3 })
  .defaultNow()

export const updatedAt = pg
  .timestamp('updated_at', { mode: 'date', precision: 3 })
  .$onUpdate(() => new Date())

export const id = pg.integer('id').primaryKey({ autoIncrement: true })

export const timestamps = {
  createdAt,
  updatedAt,
}
