<script setup lang="ts">
import { COLORS, type CategoryType, UpdateCategorySchema } from '~~/types/types'
import type { FormSubmitEvent } from '#ui/types'

const props = defineProps<{
  category: CategoryType | null
}>()

const emit = defineEmits(['closeModal'])
const { updateCategory } = await useCategories()

const state = reactive({
  name: props.category?.name,
  icon: props.category?.icon,
  color: props.category?.color,
  nameVisible: props.category?.nameVisible,
})

watchEffect(() => {
  state.name = props.category?.name
  state.icon = props.category?.icon
  state.color = props.category?.color
  state.nameVisible = props.category?.nameVisible
})

async function handleUpdate(event: FormSubmitEvent<UpdateCategorySchema>) {
  await updateCategory({
    id: props.category!.id,
    ...event.data,
  })
  emit('closeModal')
}
</script>

<template>
  <UModal :ui="{ width: 'w-full sm:max-w-md' }">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Update category '{{ category.name }}'
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
        <UForm :schema="UpdateCategorySchema" :state="state" class="space-y-4" @submit="handleUpdate">
          <UFormGroup label="Name" name="name">
            <UInput v-model="state.name" type="text" />
          </UFormGroup>

          <UFormGroup label="Color " name="color">
            <USelect v-model="state.color" :options="COLORS" />
          </UFormGroup>

          <UFormGroup label="Icon " name="icon">
            <UInput v-model="state.icon" type="text" />
          </UFormGroup>

          <UFormGroup>
            <UCheckbox v-model="state.nameVisible" :color="state.color" label="Is the category name visible?" />
          </UFormGroup>

          <UButton
            type="submit"
            :color="state.color"
            block
            label="Update category"
          />
        </UForm>
      </template>
    </UCard>
  </UModal>
</template>
