<script setup lang="ts">
import type { CategoryType } from '~~/types/types'

defineProps<{
  category: CategoryType
  dropdownItems: { label: string, icon: string, color: string, click: (category: CategoryType) => void }[]
}>()
defineEmits(['createTab'])

const { canCreateTabInCategory } = await useUserLimits()
</script>

<template>
  <div v-if="category" class="flex items-center mb-4" :class="category.nameVisible ? 'justify-between' : 'justify-end'">
    <div v-if="category.nameVisible" class="flex items-center gap-2 mb-4" :class="`text-${category.color}-500`">
      <UIcon :name="category.icon" size="28" />
      <h1 class="font-bold text-2xl">
        {{ category.name }}
      </h1>
    </div>
    <div class="flex gap-4">
      <UButton
        v-if="canCreateTabInCategory(category.id)"
        color="gray"
        variant="solid"
        label="New tab"
        icon="i-ph:plus-circle-duotone"
        @click.prevent="$emit('createTab')"
      />
      <UDropdown
        :items="dropdownItems"
        :popper="{ placement: 'bottom-end', arrow: true }"
        :ui="{ container: 'group z-50', width: 'w-40', shadow: 'shadow-xl' }"
      >
        <UButton
          color="white"
          variant="solid"
          icon="i-ph:dots-three-outline-vertical-duotone"
        />

        <template #item="{ item }">
          <div class="w-full flex items-center justify-between" @click.prevent="item.click(category)">
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
  </div>
</template>
