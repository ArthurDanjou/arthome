export async function useUser() {
  const { fetch, user } = useUserSession()

  async function toggleWeatherTab() {
    const weatherTab = !user.value.weatherTab
    try {
      await $fetch('/api/users/me', {
        method: 'PATCH',
        body: JSON.stringify({
          weatherTab,
        }),
      })
      await fetch()
      useSuccessToast(weatherTab ? 'Weather tab enabled!' : 'Weather tab disabled!')
    }
    catch (error) {
      useErrorToast('An error occurred while updating the weather tab', String(error))
    }
  }

  async function deleteAvatar() {
    try {
      await $fetch('/api/users/avatars', {
        method: 'DELETE',
      })
      useSuccessToast('Avatar successfully deleted!')
      await fetch()
    }
    catch (error) {
      useErrorToast('An error occurred while deleting your avatar', String(error))
    }
  }

  async function uploadAvatar(event: Event) {
    const file = event[0] as File

    if (!file)
      return

    const formData = new FormData()
    formData.append('file', file)

    try {
      await $fetch('/api/users/avatars', {
        method: 'POST',
        body: formData,
      })
      await fetch()
      useSuccessToast('Avatar successfully uploaded!')
    }
    catch (error) {
      useErrorToast('An error occurred while uploading your avatar', String(error))
    }
  }

  async function updateUser(user: Partial<UserInsert>) {
    try {
      await $fetch('/api/users/me', {
        method: 'PATCH',
        body: JSON.stringify(user),
      })
      await fetch()
      useSuccessToast('User successfully updated!')
    }
    catch (error) {
      useErrorToast('An error occurred while updating your user', String(error))
    }
  }

  return {
    deleteAvatar,
    uploadAvatar,
    updateUser,
    toggleWeatherTab,
  }
}
