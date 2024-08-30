export default defineEventHandler(async (event) => {
  const user = await requireUserSession(event)
  return useDrizzle()
    .select()
    .from(tables.categories)
    .where(
      eq(tables.categories.userId, user.user.id),
    )
    .orderBy(tables.categories.id, 'desc')
})
