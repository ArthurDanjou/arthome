import { useValidatedBody } from 'h3-zod'
import { UpdateTabSchema } from '~~/types/types'

export default defineEventHandler(async (event) => {
  try {
    const { id } = await getRouterParams(event)
    const body = await useValidatedBody(event, UpdateTabSchema)
    await useDrizzle()
      .update(tables.tabs)
      .set(body)
      .where(
        and(
          eq(tables.tabs.id, id),
          eq(tables.tabs.categoryId, body.categoryId),
        ),
      )
    return { statusCode: 200 }
  }
  catch (err) {
    return { err }
  }
})
