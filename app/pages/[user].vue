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

function visitLink(clickType: 'self' | 'extern') {
  window.open(props.tab.link, clickType === 'self' ? '_self' : '_blank')
}
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
      <section class="flex flex-col mb-8 md:flex-row items-center justify-center md:w-2/3 mx-auto gap-4 md:gap-8">
        <div>
          <AppAvatar size="5xl" :src="userDetails.avatar" />
        </div>
        <div class="space-y-4">
          <h1 class="font-bold text-4xl tracking-wide">
            {{ userDetails.name }}
          </h1>
          <h3 class="text-xl">
            {{ userDetails.description }}
          </h3>
        </div>
      </section>
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
            v-if="category.tabs.filter(tab => tab.categoryId === category.id).length > 0"
            class="grid grid-cols-1 auto-rows-auto sm:grid-cols-3 gap-4"
          >
            <UCard
              v-for="tab in category.tabs.filter(tab => tab.categoryId === category.id)"
              :key="tab.id"
              :ui="{
                body: { base: 'cursor-pointer h-full relative z-20' },
                background: 'h-full duration-300 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800',
              }"
              @click.left="visitLink('self')"
              @click.right="visitLink('extern')"
              @click.prevent="visitLink('self')"
              @click.middle="visitLink('extern')"
            >
              <div v-show="tab.primary" class="absolute flex h-3 w-3 -left-1 -top-1">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" :class="`bg-${tab.color}-400`" />
                <span class="relative inline-flex rounded-full h-3 w-3" :class="`bg-${tab.color}-400`" />
              </div>
              <div class="flex items-center justify-between h-full z-20">
                <div class="flex gap-4 items-center h-full">
                  <UBadge :color="tab.color" class="p-2" variant="soft">
                    <UIcon :name="tab.icon" size="32" />
                  </UBadge>
                  <div class="flex flex-col gap-1">
                    <p :class="`text-${tab.color}-400`" class="text-xl font-medium truncate">
                      {{ tab.name }}
                    </p>
                  </div>
                </div>
              </div>
            </UCard>
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
