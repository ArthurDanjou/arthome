export async function isAuthorized() {
  const { user } = useUserSession()
  const { data: authorized } = await useFetch('/api/authorized', {
    method: 'POST',
    body: {
      email: user.value?.email ?? 'test@nuxt.com',
    },
  })
  return authorized.value
}
