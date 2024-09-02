<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { TabType, UpdateTabSchemaType } from '~~/types/types'
import { COLORS, UpdateTabSchema } from '~~/types/types'

const props = defineProps<{
  tab: TabType | null
}>()

const emit = defineEmits(['closeModal'])
const { categories } = await useCategories()
const { updateTab } = await useTabs()
const { loading, search } = useIcons()

const state = reactive({
  name: undefined,
  icon: undefined,
  color: COLORS[0],
  primary: undefined,
  categoryId: undefined,
  link: undefined,
})

watchEffect(() => {
  state.name = props.tab?.name
  state.icon = props.tab?.icon
  state.color = props.tab?.color
  state.primary = props.tab?.primary
  state.categoryId = props.tab?.categoryId
  state.link = props.tab?.link
})

async function handleUpdate(event: FormSubmitEvent<UpdateTabSchemaType>) {
  await updateTab({
    id: props.tab!.id,
    ...event.data,
    categoryId: Number(event.data.categoryId),
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
            Update tab '{{ tab.name }}'
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="p-1"
            @click="$emit('closeModal')"
          />
        </div>
      </template>
      <template #default>
        <UForm :schema="UpdateTabSchema" :state="state" class="space-y-4" @submit="handleUpdate">
          <UFormGroup label="Name" name="name">
            <UInput v-model="state.name" type="text" />
          </UFormGroup>

          <UFormGroup label="Color " name="color">
            <USelect v-model="state.color" :options="COLORS" />
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

          <UFormGroup label="Category " name="category">
            <USelect v-model="state.categoryId" :options="categories" option-attribute="name" value-attribute="id" />
          </UFormGroup>

          <UFormGroup label="Link " name="link">
            <UInput v-model="state.link" type="text" />
          </UFormGroup>

          <UFormGroup>
            <UCheckbox v-model="state.primary" :color="state.color" label="Is the category primary?" />
          </UFormGroup>

          <UButton
            type="submit"
            :color="state.color"
            block
            label="Update tab"
          />
        </UForm>
      </template>
    </UCard>
  </UModal>
</template>
