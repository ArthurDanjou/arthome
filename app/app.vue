<script lang="ts" setup>
useHead({
  link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }],
  title: 'ArtHome by Arthur Danjou',
})

const { loggedIn } = await useUserSession()

watch(loggedIn, async () => {
  if (!loggedIn.value) {
    navigateTo('/login')
  }
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="#808080" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>

<style>
body {
  font-family: 'DM Sans', sans-serif;
  @apply h-full w-full text-neutral-700 dark:text-neutral-300;
}
</style>
