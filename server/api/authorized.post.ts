import { useValidatedBody, z } from 'h3-zod'

export default defineEventHandler(async (event) => {
  const users = await useDB().select().from(tables.users).all()
  const { email } = await useValidatedBody(event, {
    email: z.string(),
  })
  const user = users.find(user => user.email === email)
  return !!user
})
