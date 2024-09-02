import { useValidatedBody } from 'h3-zod'
import { UpdateUserSchema } from '~~/types/types'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const body = await useValidatedBody(event, UpdateUserSchema)

  const updatedUser = {
    ...user,
    ...body,
  }

  await updateUser(user.id, updatedUser)
  await replaceUserSession(event, updatedUser)

  return sendNoContent(event, 204)
})
