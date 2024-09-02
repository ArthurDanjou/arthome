import type { type CategoryType, CreateCategorySchema, UpdateCategorySchema } from '~~/types/types'

export async function useCategories() {
  const { data: categories, refresh }
    = await useAsyncData<CategoryType[]>(async () => await useRequestFetch()('/api/categories'))

  async function createCategory(category: CreateCategorySchema) {
    try {
      await useRequestFetch()('/api/categories', {
        method: 'POST',
        body: JSON.stringify(category),
      })
      await refresh()
      await useSuccessToast('Category successfully created!', category.color)
    }
    catch (error) {
      useErrorToast('Category creation failed!', error as string)
    }
  }

  async function updateCategory(category: UpdateCategorySchema & { id: number }) {
    try {
      await $fetch(`/api/categories/${category.id}`, {
        method: 'PUT',
        body: JSON.stringify(category),
      })
      await refresh()
      await useSuccessToast('Category successfully updated!')
    }
    catch (error) {
      useErrorToast('Category update failed!', error as string)
    }
  }

  async function deleteCategory(id: number) {
    try {
      await $fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      })
      await refresh()
      await useSuccessToast('Category successfully deleted!')
    }
    catch (error) {
      useErrorToast('Category deletion failed!', error as string)
    }
  }

  return {
    categories,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
