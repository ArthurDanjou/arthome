<script setup lang="ts">
import type { TabType } from '~~/types/types'

const props = defineProps<{
  tab: TabType
  editMode: boolean
}>()

const { setTabPrimary } = await useTabs()

// DropDown Items
const items = [[
  {
    label: 'Toggle favorite',
    icon: 'i-ph:star-duotone',
    color: 'yellow',
    click: tab => setTabPrimary(tab, !tab.primary),
  },
  {
    label: 'Edit',
    icon: 'i-ph:pencil-duotone',
    color: 'green',
    click: tab => openUpdateTabModal(tab),
  },
  {
    label: 'Delete',
    icon: 'i-ph:trash-duotone',
    color: 'red',
    click: tab => openDeleteTabModal(tab),
  },
]]

// Modals
const updateTabModal = ref(false)
const deleteTabModal = ref(false)

// Update Category
const currentUpdateTab = ref<TabType | null>(null)
function openUpdateTabModal(tab: TabType) {
  currentUpdateTab.value = tab
  updateTabModal.value = true
}

// Delete Category
const currentDeleteTab = ref<TabType | null>(null)
function openDeleteTabModal(tab: TabType) {
  currentDeleteTab.value = tab
  deleteTabModal.value = true
}

function visitLink() {
  if (!props.editMode) {
    window.open(props.tab.link, '_blank')
    // todo: add view count
  }
}
</script>

<template>
  <UCard
    :ui="{
      body: { base: 'h-full relative z-20' },
      background: `h-full duration-300 bg-white dark:bg-gray-900 ${editMode ? '' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`,
    }"
    :class="editMode ? 'animate-wiggle' : 'cursor-pointer'"
    @click.prevent="visitLink"
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
      <UDropdown
        :items="items"
        :popper="{ placement: 'bottom-end', arrow: true }"
        :ui="{ container: 'z-40 group', width: 'w-40', shadow: 'shadow-2xl', wrapper: 'absolute inline-flex -top-3 -right-3' }"
      >
        <UButton
          v-show="editMode"
          color="gray"
          variant="solid"
          size="md"
          :padded="false"
          :ui="{ rounded: 'rounded-full p-1' }"
          icon="i-ph:dots-three-outline-duotone"
        />

        <template #item="{ item }">
          <div class="w-full flex items-center justify-between" @click.prevent="item.click(tab)">
            <span
              class="truncate"
              :class="`text-${item.color}-500`"
            >
              {{ item.label }}
            </span>
            <UIcon
              :name="item.icon"
              class="flex-shrink-0 h-4 w-4 ms-auto"
              :class="`text-${item.color}-500`"
            />
          </div>
        </template>
      </UDropdown>
    </div>
  </UCard>
  <ModalUpdateTab
    v-if="currentUpdateTab"
    v-model="updateTabModal"
    :tab="currentUpdateTab"
    @close-modal="updateTabModal = false"
  />
  <ModalDeleteTab
    v-if="currentDeleteTab"
    v-model="deleteTabModal"
    :tab="currentDeleteTab"
    @close-modal="deleteTabModal = false"
  />
</template>

<style scoped>
@keyframes wiggle {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(1deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-1deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.animate-wiggle {
  animation: wiggle .4s ease-in-out infinite;
}
</style>
