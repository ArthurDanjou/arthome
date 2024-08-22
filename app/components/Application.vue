<script setup lang="ts">
import type { AppType } from '~~/types/types'

defineProps<{
  title: string
  apps: AppType[]
}>()
</script>

<template>
  <div>
    <h1 class="font-bold text-xl mb-4">
      {{ title }}
    </h1>
    <div v-if="apps" class="grid grid-cols-1 auto-rows-auto sm:grid-cols-3 md:grid-cols-4 gap-8">
      <ULink v-for="app in apps" :key="app.name" :to="app.url" class="relative" target="_blank">
        <div v-show="app.primary === true" class="absolute flex h-4 w-4 -right-2 -top-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span class="relative inline-flex rounded-full h-4 w-4 bg-green-500" />
        </div>
        <UCard
          :ui="{ body: { base: 'space-y-4 h-full' }, background: 'h-full duration-300 bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800' }"
        >
          <div class="flex gap-4 items-center h-full">
            <UBadge :color="app.color" class="p-2" variant="soft">
              <UIcon :name="app.icon" size="32" />
            </UBadge>
            <div class="flex flex-col gap-1">
              <div v-if="app.nuxt" class="text-xl flex gap-1 items-center">
                <div class="flex">
                  <p>{{ app.name }}</p>
                  <p :class="`text-${app.color}-400 font-medium`">
                    {{ app.nuxt }}
                  </p>
                </div>
              </div>
              <div v-else :class="`text-${app.color}-400`" class="text-xl font-medium">
                <p>{{ app.name }}</p>
              </div>
              <div class="flex gap-2 mt-1">
                <UBadge
                  v-for="tag in app.tags"
                  :key="tag.name"
                  :color="tag.color"
                  :label="tag.name"
                  variant="soft"
                />
              </div>
            </div>
          </div>
        </UCard>
      </ULink>
    </div>
  </div>
</template>
