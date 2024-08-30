import type { CreateTabSchema, TabType, UpdateTabSchema } from '~~/types/types'

export async function useTabs() {
  const { data: tabs, refresh }
    = await useAsyncData<TabType[]>(async () => await useRequestFetch()('/api/tabs'))

  function getTabsForCategory(categoryId: number): TabType[] {
    return tabs.value.filter(tab => tab.categoryId === categoryId)
  }

  async function createTab(tab: CreateTabSchema) {
    await $fetch('/api/tabs', {
      method: 'POST',
      body: JSON.stringify(tab),
    })
      .then(async () => {
        await refresh()
        useSuccessToast('Tab successfully created!')
      })
      .catch(error => useErrorToast('Tab creation failed!', `Error: ${error}`))
  }

  async function updateTab(tab: UpdateTabSchema) {
    console.log(tab)
    await $fetch(`/api/tabs/${tab.id}`, {
      method: 'PUT',
      body: JSON.stringify(tab),
    })
      .then(async () => {
        await refresh()
        useSuccessToast('Tab successfully updated!')
      })
      .catch(error => useErrorToast('Tab update failed!', `Error: ${error}`))
  }

  async function deleteTab(id: number) {
    await $fetch(`/api/tabs/${id}`, {
      method: 'DELETE',
    })
      .catch(error => useErrorToast('Tab deletion failed!', `Error: ${error}`))
    await refresh()
    useSuccessToast('Tab successfully deleted!')
  }

  return {
    tabs,
    createTab,
    deleteTab,
    getTabsForCategory,
    updateTab,
  }
}
