<script lang="ts" setup>
useHead({
  link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }],
  title: 'ArtHome by Arthur Danjou',
})

const { loggedIn, clear, user } = useUserSession()
const colorMode = useColorMode()

watch(loggedIn, async () => {
  if (!loggedIn.value) {
    navigateTo('/login')
  }
})

function toggleColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

async function logout() {
  await clear()
  navigateTo('/login')
  window.location.reload()
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
      <ClientOnly>
        <div class="absolute top-2 right-2 flex gap-2">
          <UTooltip v-if="loggedIn" text="Déconnexion">
            <UButton
              :label="user.name"
              color="gray"
              square
              trailing-icon="i-ph:person-arms-spread-duotone"
              variant="ghost"
              @click="logout"
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
      </ClientOnly>
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
