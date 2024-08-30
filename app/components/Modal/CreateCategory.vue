<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { CreateCategorySchemaType } from '~~/types/types'
import { COLORS, CreateCategorySchema } from '~~/types/types'

const emit = defineEmits(['closeModal'])
const { createCategory } = await useCategories()
const state = reactive({
  name: undefined,
  icon: undefined,
  color: COLORS[0],
  nameVisible: true,
})

async function handleCreate(event: FormSubmitEvent<CreateCategorySchemaType>) {
  await createCategory(event.data)
  emit('closeModal')
  state.color = COLORS[0]
  state.nameVisible = true
  state.icon = undefined
  state.name = undefined
}

const { loading, search } = useIcons()
</script>

<template>
  <UModal :ui="{ width: 'w-full sm:max-w-md' }">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Create a new category
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
        <UForm :schema="CreateCategorySchema" :state="state" class="space-y-4" @submit="handleCreate">
          <UFormGroup label="Name" name="name">
            <UInput v-model="state.name" placeholder="Enter name" type="text" variant="outline" />
          </UFormGroup>

          <UFormGroup label="Icon " name="icon">
            <USelectMenu
              v-model="state.icon"
              :loading="loading"
              :searchable="search"
              placeholder="Select an icon"
              searchable-placeholder="Search an icon"
            >
              <template #label>
                <div v-if="state.icon" class="flex items-center gap-2">
                  <UIcon size="20" :name="`i-${state.icon}`" />
                  <span class="truncate">{{ state.icon }}</span>
                </div>
              </template>

              <template #option="{ option }">
                <div class="flex items-center gap-2">
                  <UIcon size="20" :name="`i-${option}`" />
                  <span class="truncate">{{ option }}</span>
                </div>
              </template>

              <template #empty>
                Enter an icon name, keyword or tag
              </template>
            </USelectMenu>
          </UFormGroup>

          <UFormGroup label="Color " name="color">
            <USelect v-model="state.color" :options="COLORS" variant="outline" />
          </UFormGroup>

          <UFormGroup>
            <UCheckbox v-model="state.nameVisible" :color="state.color" label="Is the category name visible?" />
          </UFormGroup>

          <UButton
            type="submit"
            :color="state.color"
            block
            label="Create category"
          />
        </UForm>
      </template>
    </UCard>
  </UModal>
</template>
