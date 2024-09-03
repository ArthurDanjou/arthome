import { IconsCollection } from '~~/types/types'

export default defineEventHandler(async (event) => {
  const { query } = getQuery(event)

  const response = await $fetch('https://api.iconify.design/search', {
    params: {
      query,
      prefixes: IconsCollection.join(','),
    },
  })

  return {
    total: response.total,
    icons: response.icons && response.icons.length > 0 ? response.icons.slice(0, 25) : response.icons,
  }
})
