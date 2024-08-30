<script setup lang="ts">
const colorMode = useColorMode()
const { user, loggedIn, clear } = useUserSession()

const isSettingsOpen = ref(false)

const items = [
  [{
    slot: 'account',
    disabled: true,
  }],
  [{
    label: 'Home',
    icon: 'i-ph:house-line-duotone',
    action: () => navigateTo('/'),
  }, {
    label: 'Settings',
    icon: 'i-ph:gear-six-duotone',
    action: () => {
      isSettingsOpen.value = true
    },
  }, {
    label: 'Profile',
    icon: 'i-ph:person-arms-spread-duotone',
    action: () => navigateTo('/profile'),
  }],
  [{
    slot: 'logout',
    label: 'Sign out',
    icon: 'i-ph:sign-out-bold',
  }],
]

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
              <UDropdown v-if="loggedIn" :items="items" mode="hover" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
                <UAvatar :src="user.avatar" />

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
                    <span class="truncate">{{ item.label }}</span>
                    <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                  </div>
                </template>

                <template #logout="{ item }">
                  <div class="w-full flex justify-between items-center" @click="logout()">
                    <span class="truncate">{{ item.label }}</span>
                    <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                  </div>
                </template>
              </UDropdown>
              <UButton
                :icon="$colorMode.preference === 'dark' ? 'i-ph:moon-duotone' : 'i-ph:sun-duotone'"
                color="gray"
                square
                size="md"
                variant="ghost"
                @click="toggleColorMode"
              />
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
          Hey
          Delete account
          Change user details
          {{ user }}
        </template>
      </UCard>
    </USlideover>
  </div>
</template>
