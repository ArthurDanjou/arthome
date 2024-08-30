export async function useUserLimit() {
  const { user } = useUserSession()
  const { categories } = await useCategories()
  const { tabs } = await useTabs()

  const hasPaidPlan = computed(() => user.value.subscription !== 'free')

  function canCreateCategory() {
    if (hasPaidPlan.value)
      return true
    return categories.value.length < 3
  }

  function canCreateTabInCategory(categoryId: number): boolean {
    if (hasPaidPlan.value)
      return true
    return tabs.filter(tab => tab.categoryId === categoryId).length < 5
  }

  return {
    hasPaidPlan,
    userLimits,
    canCreateCategory,
    canCreateTabInCategory,
  }
}
