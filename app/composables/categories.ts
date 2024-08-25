export function useCategories() {
  async function getCategories() {
    return useAsyncData<CategoryType[]>(async () => {
      const res = await $fetch('/api/categories')
      console.log('res', res)
      return res
    })
  }

  return {
    getCategories,
  }
}
