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
    <div v-if="apps" class="grid grid-cols-5 gap-4">
      <ULink v-for="app in apps" :key="app.name" :to="app.url" target="_blank">
        <UCard :ui="{ body: { base: 'space-y-4' } }">
          <div v-if="app.nuxt" class="text-xl flex gap-1 items-center">
            <UIcon :name="app.icon" />
            <div class="flex">
              <p>{{ app.name }}</p>
              <p :class="`text-${app.color}-400 font-medium`">
                {{ app.nuxt }}
              </p>
            </div>
          </div>
          <div v-else class="text-xl flex gap-1 items-center" :class="`text-${app.color}-400 font-medium`">
            <UIcon :name="app.icon" />
            <p>{{ app.name }}</p>
          </div>
          <div class="flex gap-1">
            <UBadge
              v-for="tag in app.tags"
              :key="tag.name"
              variant="soft"
              :label="tag.name"
              :color="tag.color"
              :ui="{ rounded: 'rounded-full' }"
            />
          </div>
        </UCard>
      </ULink>
    </div>
  </div>
</template>
