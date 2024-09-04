<script setup lang="ts">
import type { CategoryType } from '~~/types/types'

definePageMeta({
  middleware: 'auth',
})

const date = ref<Date>(new Date())
onMounted(() => {
  setInterval(() => date.value = new Date(), 1000)
})

const { user, loggedIn } = await useUserSession()
const { categories } = await useCategories()
const { getTabsForCategory } = await useTabs()
const { canCreateCategory } = await useUserLimits()
const { toggleWeatherTab } = await useUser()

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

// Edit Tabs
const currentEditCategory = ref<CategoryType | null>(null)

// DropDown Items
const itemsCategory = [[
  {
    label: 'Edit Category',
    icon: 'i-ph:pencil-duotone',
    color: 'green',
    click: category => openUpdateCategoryModal(category),
  },
  {
    label: 'Edit Tabs',
    icon: 'i-ph:cards-three-duotone',
    color: 'amber',
    click: category => currentEditCategory.value?.id === category.id ? currentEditCategory.value = null : currentEditCategory.value = category,
  },
  {
    label: 'Delete',
    icon: 'i-ph:trash-duotone',
    color: 'red',
    click: category => openDeleteCategoryModal(category),
  },
]]

const itemsSpecialTabs = computed(() => [[
  {
    label: user.value.weatherTab ? 'Remove Weather Tab' : 'Add Weather Tab',
    icon: user.value.weatherTab ? 'i-ph:cloud-slash-duotone' : 'i-ph:cloud-duotone',
    click: async () => await toggleWeatherTab(),
  },
  /**
   * {
   *     label: 'Add Clock tab',
   *     icon: 'i-ph:clock-duotone',
   *     click: () => console.log('Add Weather Tab'),
   *   },
   */
]])

defineShortcuts({
  c: () => {
    if (canCreateCategory()) {
      createCategoryModal.value = true
    }
  },
  escape: () => {
    if (createCategoryModal.value) {
      createCategoryModal.value = false
    }
    if (updateCategoryModal.value) {
      updateCategoryModal.value = false
    }
    if (deleteCategoryModal.value) {
      deleteCategoryModal.value = false
    }
    if (createTabModal.value) {
      createTabModal.value = false
    }
    if (currentEditCategory.value) {
      currentEditCategory.value = null
    }
  },
})
</script>

<template>
  <main v-if="user && loggedIn" class="my-12">
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
    <section class="flex flex-col md:flex-row items-center justify-center md:w-2/3 mx-auto gap-4 md:gap-8">
      <div>
        <AppAvatar size="5xl" :src="user.avatar" />
      </div>
      <div class="space-y-4">
        <h1 class="font-bold text-4xl tracking-wide">
          {{ user.name }}
        </h1>
        <h3 class="text-xl">
          {{ user.description }}
        </h3>
      </div>
    </section>
    <AppWeather v-if="user.weatherTab" />
    <div class="flex justify-end my-8 gap-4">
      <UButton
        v-if="canCreateCategory()"
        icon="i-ph:folder-simple-plus-duotone"
        color="black"
        variant="solid"
        size="lg"
        @click.prevent="createCategoryModal = true"
      >
        Create Category
        <UKbd>C</UKbd>
      </UButton>
      <UTooltip v-else text="You can't create more categories on free plan. ❌">
        <UButton
          icon="i-ph:folder-simple-plus-duotone"
          color="black"
          variant="solid"
          size="lg"
          disabled
          @click.prevent="createCategoryModal = true"
        >
          Create Category
          <UKbd>C</UKbd>
        </UButton>
      </UTooltip>
      <UDropdown
        :items="itemsSpecialTabs"
        :popper="{ placement: 'bottom-end', arrow: true }"
        :ui="{ container: 'group z-50', width: 'w-40', shadow: 'shadow-xl' }"
      >
        <UButton
          color="white"
          variant="solid"
          size="xl"
          icon="i-ph:plus-square-duotone"
        />
      </UDropdown>
    </div>
    <section v-if="categories">
      <div v-if="categories.length > 0" class="space-y-12">
        <div
          v-for="category in categories"
          :key="category.id"
        >
          <AppCategory
            :dropdown-items="itemsCategory"
            :category="category"
            @create-tab="openCreateTab(category)"
          />
          <div
            v-if="getTabsForCategory(category.id).length > 0"
            class="grid grid-cols-1 auto-rows-auto sm:grid-cols-3 gap-4"
          >
            <AppTab
              v-for="tab in getTabsForCategory(category.id)"
              :key="tab.id"
              :tab="tab"
              :edit-mode="currentEditCategory?.id === category.id"
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
