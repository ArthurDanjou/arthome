export default defineEventHandler(async (event) => {
  const user = await requireUserSession(event)
  return useDrizzle().query.users.findFirst({
    where: eq(tables.users.id, user.user.id),
    with: {
      categories: {
        with: {
          tabs: true,
        },
      },
    },
  })
})
