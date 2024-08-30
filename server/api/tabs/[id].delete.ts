export default defineEventHandler(async (event) => {
  try {
    const { id } = await getRouterParams(event)
    await useDrizzle()
      .delete(tables.tabs)
      .where(
        and(
          eq(tables.tabs.id, id),
        ),
      )
    return { statusCode: 200 }
  }
  catch (err) {
    return { err }
  }
})
