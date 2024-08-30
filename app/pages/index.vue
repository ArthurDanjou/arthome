<script lang="ts" setup>
import type { CategoryType } from '~~/types/types'
import CategoryHeader from '~/components/CategoryHeader.vue'

definePageMeta({
  middleware: 'auth',
})

const date = ref<Date>(new Date())
onMounted(() => {
  setInterval(() => date.value = new Date(), 1000)
})

const { user } = useUserSession()
const { categories } = await useCategories()
const { getTabsForCategory } = await useTabs()

// Modals
const createCategoryModal = ref(false)
const updateCategoryModal = ref(false)
const deleteCategoryModal = ref(false)
const createTabModal = ref(false)

// Update Category
const currentUpdateCategory = ref<CategoryType | null>(null)
function openUpdateCategoryModal(category: CategoryType) {
  currentUpdateCategory.value = category
  updateCategoryModal.value = true
}

// Delete Category
const currentDeleteCategory = ref<CategoryType | null>(null)
function openDeleteCategoryModal(category: CategoryType) {
  currentDeleteCategory.value = category
  deleteCategoryModal.value = true
}

// Create Tab
const currentCategory = ref<CategoryType | null>(null)
function openCreateTab(category: CategoryType) {
  currentCategory.value = category
  createTabModal.value = true
}

// DropDown Items
const items = [[
  {
    label: 'Edit',
    icon: 'i-ph:pencil-duotone',
    color: 'green',
    click: category => openUpdateCategoryModal(category),
  },
  {
    label: 'Delete',
    icon: 'i-ph:trash-duotone',
    color: 'red',
    click: category => openDeleteCategoryModal(category),
  },
]]

defineShortcuts({
  c: () => createCategoryModal.value = true,
})
</script>

<template>
  <main v-if="user" class="my-12">
    <div v-if="date" class="flex flex-col items-center mb-12">
      <h1 class="text-6xl md:text-9xl font-bold">
        {{ useDateFormat(date, 'HH') }}
        <span class="animate-pulse">:</span>
        {{ useDateFormat(date, 'mm') }}
      </h1>
      <h1 class="text-2xl md:text-5xl">
        {{ useDateFormat(date, 'dddd D MMMM YYYY', { locales: user.language }) }}
      </h1>
    </div>
    <div class="flex justify-end mb-8 gap-4">
      <UButton
        icon="i-ph:folder-simple-plus-duotone"
        color="black"
        variant="solid"
        size="lg"
        @click.prevent="createCategoryModal = true"
      >
        Create Category
        <UKbd>C</UKbd>
      </UButton>
    </div>
    <section v-if="categories">
      <div v-if="categories.length > 0" class="space-y-12">
        <div
          v-for="category in categories"
          :key="category.id"
        >
          <CategoryHeader
            :dropdown-items="items"
            :category="category"
            @create-tab="openCreateTab(category)"
          />
          <div v-if="getTabsForCategory(category.id).length > 0" class="grid grid-cols-1 auto-rows-auto sm:grid-cols-3 md:grid-cols-5 gap-4">
            <AppTab
              v-for="tab in getTabsForCategory(category.id)"
              :key="tab.id"
              :tab="tab"
            />
          </div>
          <div v-else class="flex gap-2 items-center">
            <UIcon name="i-ph:empty-duotone" size="16" />
            <h1 class="text-sm font-medium">
              The category is empty.
            </h1>
          </div>
        </div>
      </div>
      <div v-else class="flex gap-2 items-center">
        <UIcon name="i-ph:empty-duotone" size="20" />
        <h1 class="text-lg font-medium">
          You don't have any categories.
        </h1>
      </div>
    </section>
    <ModalCreateCategory
      v-model="createCategoryModal"
      @close-modal="createCategoryModal = false"
    />
    <ModalUpdateCategory
      v-if="currentUpdateCategory"
      v-model="updateCategoryModal"
      :category="currentUpdateCategory"
      @close-modal="updateCategoryModal = false"
    />
    <ModalDeleteCategory
      v-if="currentDeleteCategory"
      v-model="deleteCategoryModal"
      :category="currentDeleteCategory"
      @close-modal="deleteCategoryModal = false"
    />
    <ModalCreateTab
      v-if="currentCategory"
      v-model="createTabModal"
      :category="currentCategory"
      @close-modal="createTabModal = false"
    />
  </main>
</template>
