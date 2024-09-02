export async function useUser() {
  const { fetch } = useUserSession()

  async function deleteAvatar() {
    try {
      await useRequestFetch()('/api/users/avatars', {
        method: 'DELETE',
      })
      useSuccessToast('Avatar successfully deleted!')
      await fetch()
    }
    catch (error) {
      useErrorToast('An error occurred while deleting your avatar', error as string)
    }
  }

  async function uploadAvatar(event: Event) {
    const file = event[0] as File

    if (!file)
      return

    const formData = new FormData()
    formData.append('file', file)

    try {
      await useRequestFetch()('/api/users/avatars', {
        method: 'POST',
        body: formData,
      })
      await fetch()
      useSuccessToast('Avatar successfully uploaded!')
    }
    catch (error) {
      useErrorToast('An error occurred while uploading your avatar', error as string)
    }
  }

  return {
    deleteAvatar,
    uploadAvatar,
  }
}
