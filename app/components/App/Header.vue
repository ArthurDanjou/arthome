<script setup lang="ts">
const colorMode = useColorMode()
const { user, loggedIn, clear } = await useUserSession()
const isSettingsOpen = ref(false)

const isDark = computed(() => colorMode.preference === 'dark')
const items = [
  [{
    slot: 'account',
    disabled: true,
  }],
  [{
    label: 'Home',
    icon: 'i-ph:house-line-duotone',
    action: () => navigateTo('/'),
    shortcut: 'H',
  }, {
    label: 'Settings',
    icon: 'i-ph:gear-six-duotone',
    action: () => isSettingsOpen.value = true,
    shortcut: 'S',
  }, {
    label: isDark.value ? 'Light mode' : 'Dark mode',
    icon: isDark.value ? 'i-ph:moon-duotone' : 'i-ph:sun-duotone',
    action: () => toggleColorMode(),
    shortcut: 'T',
  }],
  [{
    slot: 'logout',
    label: 'Sign out',
    icon: 'i-ph:sign-out-bold',
    shortcut: 'L',
  }],
]

async function logout() {
  await clear()
  await navigateTo('/')
  window.location.reload()
}

function toggleColorMode() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

defineShortcuts({
  t: () => toggleColorMode(),
  s: () => isSettingsOpen.value = !isSettingsOpen.value,
  l: async () => await logout(),
  h: () => navigateTo('/'),
})
</script>

<template>
  <div>
    <header
      class="fixed top-0 w-full py-4 z-50 bg-white/30 dark:bg-zinc-900/30 duration-300 backdrop-blur"
    >
      <UContainer>
        <div class="flex justify-between w-full items-center">
          <h1 class="tracking-wide text-lg font-bold text-black dark:text-white">
            ArtHome
          </h1>
          <div class="flex items-center gap-2">
            <ClientOnly>
              <UDropdown
                v-if="loggedIn"
                :items="items"
                mode="hover"
                :ui="{ item: { disabled: 'cursor-text select-text' } }"
                :popper="{ placement: 'bottom-end' }"
              >
                <AppAvatar :src="user.avatar" />

                <template #account>
                  <div class="text-left">
                    <p>
                      Signed in as
                    </p>
                    <p class="truncate font-medium text-gray-900 dark:text-white">
                      {{ user.name }}
                    </p>
                  </div>
                </template>

                <template #item="{ item }">
                  <div class="w-full flex justify-between items-center" @click.prevent="item.action()">
                    <div class="gap-2 flex items-center">
                      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                      <span class="truncate">{{ item.label }}</span>
                    </div>
                    <UKbd v-if="item.shortcut">
                      {{ item.shortcut }}
                    </UKbd>
                  </div>
                </template>

                <template #logout="{ item }">
                  <div class="w-full flex justify-between items-center" @click="logout">
                    <div class="flex gap-2 items-center">
                      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <span class="truncate">{{ item.label }}</span>
                    </div>
                    <UKbd v-if="item.shortcut">
                      {{ item.shortcut }}
                    </UKbd>
                  </div>
                </template>
              </UDropdown>
            </clientonly>
          </div>
        </div>
      </UContainer>
    </header>
    <USlideover v-model="isSettingsOpen">
      <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Settings
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isSettingsOpen = false" />
          </div>
        </template>

        <template #default>
          <div class="space-y-12 overflow-auto">
            <div>
              <AppUserSettingsForm :user="user" />
            </div>
          </div>
        </template>

        <template #footer>
          <UButton
            color="red"
            variant="solid"
            icon="i-ph:trash-duotone"
            block
          >
            Delete account
          </UButton>
        </template>
      </UCard>
    </USlideover>
  </div>
</template>
