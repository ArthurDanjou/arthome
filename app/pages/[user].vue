<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const router = useRouter()

const date = ref<Date>(new Date())
onMounted(() => {
  setInterval(() => date.value = new Date(), 1000)
})

const { user } = useUserSession()

onMounted(async () => {
  if (user.value.username.toLowerCase() === router.currentRoute.value.params.user.toLowerCase()) {
    await navigateTo('/')
  }
})
const { data: userDetails } = await useAsyncData(async () => await $fetch(`/api/users/${router.currentRoute.value.params.user}`))
onMounted(() => {
  if (userDetails.value.message) {
    useErrorToast(userDetails.value.message, 'Look for another user.')
  }
  if (userDetails.value.private) {
    useErrorToast('This user\'s profile is private.', 'Look for another user.')
  }
})
</script>

<template>
  <main class="my-12">
    <div v-if="date" class="flex flex-col items-center mb-12">
      <h1 class="text-6xl md:text-9xl font-bold">
        {{ useDateFormat(date, 'HH') }}
        <span class="animate-pulse">:</span>
        {{ useDateFormat(date, 'mm') }}
      </h1>
      <h1 class="text-2xl md:text-5xl">
        {{ useDateFormat(date, 'dddd D MMMM YYYY', { locales: userDetails.locale ? userDetails.language : user.locale }) }}
      </h1>
    </div>
    <div v-if="userDetails.message || userDetails.private" class="text-center mt-24 space-y-4">
      <div
        class="flex items-center justify-center gap-2 text-3xl"
        :class="userDetails.message ? 'text-amber-500 dark:text-amber-400' : 'text-red-500 dark:text-red-400'"
      >
        <UIcon name="i-ph:warning-circle-duotone" />
        <p>
          {{ userDetails.message ? userDetails.message : 'This user\'s profile is private.' }}
        </p>
      </div>
      <h1 class="text-lg italic text-neutral-600 dark:text-neutral-400">
        Please look for another user.
      </h1>
      <UButton
        label="Go to your page"
        :color="userDetails.message ? 'amber' : 'red'"
        size="xl"
        icon="i-ph:house-line-duotone"
        variant="outline"
        to="/"
      />
    </div>
    <section v-else>
      <div v-if="userDetails.categories.length > 0" class="space-y-12">
        <div
          v-for="category in userDetails.categories"
          :key="category.id"
        >
          <div v-if="category" class="flex items-center mb-4" :class="category.nameVisible ? 'justify-between' : 'justify-end'">
            <div v-if="category.nameVisible" class="flex items-center gap-2 mb-4" :class="`text-${category.color}-500`">
              <UIcon :name="category.icon" size="28" />
              <h1 class="font-bold text-2xl">
                {{ category.name }}
              </h1>
            </div>
          </div>
          <div
            v-if="userDetails.categories.filter(tab => tab.categoryId === category.id).length > 0"
            class="grid grid-cols-1 auto-rows-auto sm:grid-cols-3 gap-4"
          >
            {{ userDetails.categories.filter(tab => tab.categoryId === category.id) }}
          </div>
          <div v-else class="flex gap-2 items-center">
            <UIcon name="i-ph:empty-duotone" size="16" />
            <h1 class="text-sm font-medium">
              The category is empty.
            </h1>
          </div>
        </div>
      </div>
      <div v-else class="flex gap-2 items-center">
        <UIcon name="i-ph:empty-duotone" size="20" />
        <h1 class="text-lg font-medium">
          This user doesn't have any categories.
        </h1>
      </div>
    </section>
  </main>
</template>
