import type { type CategoryType, CreateCategorySchema, UpdateCategorySchema } from '~~/types/types'

export async function useCategories() {
  const { data: categories, refresh }
    = await useAsyncData<CategoryType[]>(async () => await useRequestFetch()('/api/categories'))

  async function getCategory(id: number) {
    return categories.data.value.find(category => category.id === id)
  }

  async function createCategory(category: CreateCategorySchema) {
    await $fetch('/api/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    })
      .catch(error => useErrorToast('Category creation failed!', `Error: ${error}`))
    await refresh()
    await useSuccessToast('Category successfully created!')
  }

  async function updateCategory(category: UpdateCategorySchema & { id: number }) {
    await $fetch(`/api/categories/${category.id}`, {
      method: 'PUT',
      body: JSON.stringify(category),
    })
      .catch(error => useErrorToast('Category update failed!', `Error: ${error}`))
    await refresh()
    await useSuccessToast('Category successfully updated!')
  }

  async function deleteCategory(id: number) {
    await $fetch(`/api/categories/${id}`, {
      method: 'DELETE',
    })
      .catch(error => useErrorToast('Category deletion failed!', `Error: ${error}`))
    await refresh()
    await useSuccessToast('Category successfully deleted!')
  }

  return {
    categories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
