<script lang="ts" setup>
useHead({
  link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }],
  title: 'Home by Arthur Danjou',
})

const { loggedIn, clear, user } = useUserSession()
const colorMode = useColorMode()
const authorized = await isAuthorized()

onMounted(async () => {
  if (!authorized) {
    navigateTo('/')
  }
})

watch(loggedIn, async () => {
  if (!loggedIn.value) {
    navigateTo('/')
  }
})

function toggleColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

defineShortcuts({
  t: () => toggleColorMode(),
  c: () => toggleColorMode(),
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="#808080" />
    <UContainer>
      <div class="absolute top-2 right-2 flex gap-2">
        <UTooltip v-if="loggedIn" text="Click to logout">
          <UButton
            :label="`Hello ${user.name}`"
            color="gray"
            square
            trailing-icon="i-ph:person-arms-spread-duotone"
            variant="ghost"
            @click="clear"
          />
        </UTooltip>
        <UButton
          :icon="$colorMode.preference === 'dark' ? 'i-ph:moon-duotone' : 'i-ph:sun-duotone'"
          color="gray"
          square
          variant="ghost"
          @click="toggleColorMode"
        />
      </div>
      <NuxtPage />
    </UContainer>
  </div>
</template>

<style>
body {
  font-family: 'DM Sans', sans-serif;
  @apply h-full w-full text-neutral-700 dark:text-neutral-300;
}
</style>
