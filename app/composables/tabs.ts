import type { CreateTabSchema, type TabType, UpdateTabSchema } from '~~/types/types'

export async function useTabs() {
  const { data: tabs, refresh }
    = await useAsyncData<TabType[]>(async () => await useRequestFetch()('/api/tabs'))

  function getTabsForCategory(categoryId: number): TabType[] {
    return tabs.value.filter(tab => tab.categoryId === categoryId)
  }

  async function createTab(tab: CreateTabSchema) {
    try {
      await $fetch('/api/tabs', {
        method: 'POST',
        body: JSON.stringify(tab),
      })
      await refresh()
      useSuccessToast('Tab successfully created!', tab.color)
    }
    catch (error) {
      useErrorToast('Tab creation failed!', String(error))
    }
  }

  async function updateTab(tab: UpdateTabSchema) {
    try {
      await $fetch(`/api/tabs/${tab.id}`, {
        method: 'PUT',
        body: JSON.stringify(tab),
      })
      await refresh()
      useSuccessToast('Tab successfully updated!')
    }
    catch (error) {
      useErrorToast('Tab update failed!', String(error))
    }
  }

  async function setTabPrimary(tab, primary: boolean) {
    try {
      await $fetch(`/api/tabs/${tab.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          primary,
          categoryId: tab.categoryId,
        }),
      })
      await refresh()
      useSuccessToast(`Tab ${tab.name} ${primary ? 'set as favorite' : 'unset as favorite'}!`, 'yellow')
    }
    catch (error) {
      useErrorToast('Cannot toggle favorite state for tab!', String(error))
    }
  }

  async function deleteTab(id: number) {
    try {
      await $fetch(`/api/tabs/${id}`, {
        method: 'DELETE',
      })
      await refresh()
      useSuccessToast('Tab successfully deleted!')
    }
    catch (error) {
      useErrorToast('Tab deletion failed!', String(error))
    }
  }

  return {
    tabs,
    createTab,
    deleteTab,
    getTabsForCategory,
    updateTab,
    setTabPrimary,
  }
}
