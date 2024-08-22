export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn } = useUserSession()
  const authorized = await isAuthorized()

  if (!loggedIn.value || !authorized) {
    return navigateTo('/')
  }
})
