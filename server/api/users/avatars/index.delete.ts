export default defineEventHandler(async (event) => {
  const { user, session } = await requireUserSession(event)

  if (!user.avatar) {
    return sendNoContent(event, 204)
  }

  await deleteProfilePicture(user.avatar)

  const updatedUser = {
    ...user,
    avatar: null,
  }
  await updateUser(user.id, { avatar: updatedUser.avatar })
  await replaceUserSession(event, {
    id: user.id,
    user: updatedUser,
  })

  return {
    statusCode: 204,
    message: 'Avatar deleted',
  }
})
