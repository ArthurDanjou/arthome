export default defineEventHandler(async (event) => {
  const user = await getUserSession(event)
  console.log('session', user)
  return useDrizzle().query.categories.findMany({
    where: eq(tables.users.id, user.id),
  })
})
