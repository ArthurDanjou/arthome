import { integer } from 'drizzle-orm/sqlite-core'

export const id = integer('id').primaryKey()

export const createdAt
  = integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())

export const updatedAt
  = integer('updated_at', { mode: 'timestamp' })
    .$onUpdateFn(() => new Date())
    .$defaultFn(() => new Date())

export const timestamps = {
  createdAt,
  updatedAt,
}
