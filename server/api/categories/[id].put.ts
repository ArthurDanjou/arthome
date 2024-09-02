import { useValidatedBody } from 'h3-zod'
import { UpdateCategorySchema } from '~~/types/types'

export default defineEventHandler(async (event) => {
  try {
    const user = await getUserSession(event)
    const { id } = await getRouterParams(event)
    const body = await useValidatedBody(event, UpdateCategorySchema)
    await useDrizzle()
      .update(tables.categories)
      .set(body)
      .where(
        and(
          eq(tables.categories.id, id),
          eq(tables.categories.userId, user.user.id),
        ),
      )
    return { statusCode: 200 }
  }
  catch (err) {
    return { err }
  }
})
