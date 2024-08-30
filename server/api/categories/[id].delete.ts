export default defineEventHandler(async (event) => {
  try {
    const user = await getUserSession(event)
    const { id } = await getRouterParams(event)
    await useDrizzle()
      .delete(tables.categories)
      .where(
        and(
          eq(tables.categories.id, id),
          eq(tables.categories.userId, user.id),
        ),
      )
    return { statusCode: 200 }
  }
  catch (err) {
    return { err }
  }
})
