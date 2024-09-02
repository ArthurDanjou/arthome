import { useValidatedBody } from 'h3-zod'
import { CreateTabSchema } from '~~/types/types'

export default defineEventHandler(async (event) => {
  try {
    const body = await useValidatedBody(event, CreateTabSchema)
    await useDrizzle().insert(tables.tabs).values(body)
    return { statusCode: 200 }
  }
  catch (err) {
    return { err }
  }
})
