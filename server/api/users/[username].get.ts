export default defineEventHandler(async (event) => {
  const { username } = await getRouterParams(event)
  const user = await useDrizzle()
    .query
    .users
    .findFirst({
      where: eq(tables.users.username, username.toLowerCase()),
      with: {
        categories: {
          with: {
            tabs: true,
          },
        },
      },
    })
  return user || {
    message: 'User not found',
  }
})
