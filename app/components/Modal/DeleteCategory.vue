<script setup lang="ts">
import type { CategoryType } from '~~/types/types'

const props = defineProps<{
  category: CategoryType | null
}>()

const emit = defineEmits(['closeModal'])
const { deleteCategory } = await useCategories()

async function handleDelete() {
  await deleteCategory(props.category.id)
  emit('closeModal')
}

defineShortcuts({
  enter: async () => await handleDelete(),
})
</script>

<template>
  <UModal :ui="{ width: 'w-full sm:max-w-md' }">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Confirm deletion of '{{ category.name }}'
          </h3>
          <UButton
            color="gray"
            variant="soft"
            icon="i-heroicons-x-mark-20-solid"
            class="p-1"
            @click="$emit('closeModal')"
          />
        </div>
      </template>
      <template #default>
        <div class="space-y-4">
          <UButton
            color="red"
            variant="solid"
            label="Delete"
            block
            @click.prevent="handleDelete"
          />
          <UButton
            color="gray"
            variant="solid"
            label="Cancel"
            block
            @click.prevent="$emit('closeModal')"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
