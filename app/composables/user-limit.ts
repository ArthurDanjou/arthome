export function useUserLimit() {
  function hasUserFreePlan() {
    return true
  }

  function getRemainingCategories() {
    if (!hasUserFreePlan())
      return -1
    return 3
  }

  function getRemainingTabs(category_id: number) {
    if (!hasUserFreePlan())
      return -1
    return category_id * 3
  }

  return {
    getRemainingCategories,
    getRemainingTabs,
  }
}
