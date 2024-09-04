import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { id, timestamps } from '../utils/dbFields'
import { Subscription } from '../../types/types'

export const users = sqliteTable('users', {
  id,
  username: text('username').notNull().unique(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  githubId: text('github_id').unique(),
  githubToken: text('github_token'),
  googleId: text('google_id').unique(),
  googleToken: text('google_token'),
  description: text('description').default(''),
  avatar: text('avatar').default(''),
  private: integer('private', { mode: 'boolean' }).default(false),
  language: text('language').default('en-EN'),
  location: text('location').default('unknown'),
  weatherTab: integer('weather_tab', { mode: 'boolean' }).default(0),
  subscription: text('subscription', { enum: Subscription }).default('free'),
  ...timestamps,
})

export const categories = sqliteTable('categories', {
  id,
  name: text('name').default(''),
  nameVisible: integer('name_visible', { mode: 'boolean' }).default(true),
  icon: text('icon').default('i-ph:circle-wavy-question-duotone'),
  color: text('color').default('gray'),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  ...timestamps,
})

export const tabs = sqliteTable('tabs', {
  id,
  name: text('name').default(''),
  primary: integer('primary', { mode: 'boolean' }).default(false),
  icon: text('icon').default('i-ph:circle-wavy-question-duotone'),
  color: text('color').default('gray'),
  link: text('link').default(''),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  ...timestamps,
})

export const usersRelations = relations(users, ({ many }) => ({
  categories: many(categories),
}))

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  user: one(users, {
    fields: [categories.userId],
    references: [users.id],
  }),
  tabs: many(tabs),
}))

export const tabsRelations = relations(tabs, ({ one }) => ({
  category: one(categories, {
    fields: [tabs.categoryId],
    references: [categories.id],
  }),
}))
