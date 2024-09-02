export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn, user } = await useUserSession()

  if (loggedIn.value) {
    return navigateTo(`/${user.value.username.toLowerCase()}`)
  }
})
