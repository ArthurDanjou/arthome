export function useTabs() {
  async function createTab(tab: TabType) {
    console.log('createTab', tab)
    return tab
  }

  async function deleteTab(tab: TabType) {
    console.log('deleteTab', tab)
    return tab
  }

  async function updateTab(tab: TabType) {
    console.log('updateTab', tab)
    return tab
  }

  return {
    createTab,
    deleteTab,
  }
}
