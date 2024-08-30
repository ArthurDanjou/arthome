export default defineEventHandler(async () => {
  return useDrizzle()
    .select()
    .from(tables.tabs)
    .orderBy(tables.tabs.id, 'desc')
})
