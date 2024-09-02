const MAX_CATEGORIES = 3
const MAX_TABS_PER_CATEGORY = 6

export async function useUserLimits() {
  const { user } = useUserSession()
  const { data: userLimits, refresh: refreshUserLimits } = await useFetch('/api/users/limits')

  const hasPaidPlan = computed(() => user.value.subscription !== 'free')

  function canCreateCategory() {
    if (hasPaidPlan.value)
      return true
    return userLimits.value.categories.length < MAX_CATEGORIES
  }

  function canCreateTabInCategory(categoryId: number): boolean {
    if (hasPaidPlan.value)
      return true
    return userLimits.value.categories.find(category => category.id === categoryId).tabs.length < MAX_TABS_PER_CATEGORY
  }

  return {
    hasPaidPlan,
    canCreateCategory,
    canCreateTabInCategory,
    refreshUserLimits,
  }
}
