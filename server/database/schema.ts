import { boolean, integer, pgEnum, pgTable, text } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { id, timestamps } from '../utils/dbFields'
import { Subscription } from '../../types/types'

export const subscriptionEnum = pgEnum('subscription', Subscription)

export const users = pgTable('users', {
  id,
  username: text('username').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  githubId: text('github_id').unique(),
  githubToken: text('github_token'),
  googleId: text('google_id').unique(),
  googleToken: text('google_token'),
  description: text('description').default(''),
  avatar: text('avatar').default(''),
  private: boolean('private').default(false),
  language: text('language').default('en-EN'),
  location: text('location').default('unknown'),
  subscription: subscriptionEnum('subscription').default('free'),
  ...timestamps,
})

export const pages = pgTable('pages', {
  id,
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  ...timestamps,
})

export const categories = pgTable('categories', {
  id,
  name: text('name').default(''),
  nameVisible: boolean('name_visible').default(true),
  icon: text('icon').default('i-ph:circle-wavy-question-duotone'),
  color: text('color').default('gray'),
  pageId: integer('page_id')
    .notNull()
    .references(() => pages.id, { onDelete: 'cascade' }),
  ...timestamps,
})

export const tabs = pgTable('tabs', {
  id,
  name: text('name').default(''),
  nameVisible: boolean('name_visible').default(true),
  icon: text('icon').default('i-ph:circle-wavy-question-duotone'),
  color: text('color').default('gray'),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  ...timestamps,
})

export const usersRelations = relations(users, ({ one }) => ({
  page: one(pages, {
    fields: [users.id],
    references: [pages.userId],
  }),
}))

export const pagesRelations = relations(pages, ({ many }) => ({
  categories: many(categories),
}))

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  page: one(pages, {
    fields: [categories.pageId],
    references: [pages.id],
  }),
  tabs: many(tabs),
}))
