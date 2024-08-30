import { useValidatedBody } from 'h3-zod'
import { CreateCategorySchema } from '~~/types/types'

export default defineEventHandler(async (event) => {
  try {
    const user = await getUserSession(event)
    const body = await useValidatedBody(event, CreateCategorySchema)
    await useDrizzle().insert(tables.categories).values({
      name: body.name,
      icon: body.icon,
      color: body.color,
      nameVisible: body.nameVisible,
      userId: user.id,
    })
    return { statusCode: 200 }
  }
  catch (err) {
    return { err }
  }
})
