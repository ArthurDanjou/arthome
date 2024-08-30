<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { COLORS, type CategoryType, CreateTabSchema, type CreateTabSchemaType } from '~~/types/types'

const props = defineProps<{
  category: CategoryType | undefined
}>()

const emit = defineEmits(['closeModal'])
const { createTab } = await useTabs()
const { categories } = await useCategories()

const state = reactive({
  name: undefined,
  icon: undefined,
  link: undefined,
  color: COLORS[0],
  primary: false,
  categoryId: props.category?.id,
})

watchEffect(() => {
  state.categoryId = props.category?.id
})

async function handleCreate(event: FormSubmitEvent<CreateTabSchemaType>) {
  await createTab(event.data)
  emit('closeModal')
  state.name = undefined
  state.icon = undefined
  state.link = undefined
  state.color = COLORS[0]
  state.primary = false
  state.categoryId = props.category?.id
}
</script>

<template>
  <UModal :ui="{ width: 'w-full sm:max-w-md' }">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Create a new tab
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
        <UForm :schema="CreateTabSchema" :state="state" class="space-y-4" @submit="handleCreate">
          <UFormGroup label="Name" name="name">
            <UInput v-model="state.name" type="text" />
          </UFormGroup>

          <UFormGroup label="Icon " name="icon">
            <UInput v-model="state.icon" type="text" />
          </UFormGroup>

          <UFormGroup label="Color " name="color">
            <USelect v-model="state.color" :options="COLORS" />
          </UFormGroup>

          <UFormGroup label="Category " name="category">
            <USelect v-model="state.categoryId" :options="categories" option-attribute="name" value-attribute="id" />
          </UFormGroup>

          <UFormGroup label="Link " name="link">
            <UInput v-model="state.link" type="text" />
          </UFormGroup>

          <UFormGroup>
            <UCheckbox v-model="state.primary" :color="state.color" label="Is the tab primary?" />
          </UFormGroup>

          <UButton
            type="submit"
            :color="state.color"
            block
            label="Create tab"
          />
        </UForm>
      </template>
    </UCard>
  </UModal>
</template>
