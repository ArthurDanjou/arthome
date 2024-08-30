export function useIcons() {
  const loading = ref(false)
  async function search(query: string) {
    if (query) {
      loading.value = true
    }
    const response = await $fetch('/api/icons/search', {
      query: { query },
    })
    loading.value = false
    return response.icons
  }

  return {
    loading,
    search,
  }
}
