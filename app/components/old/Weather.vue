<script lang="ts" setup>
import type { WeatherType } from '~~/types/types'

const { data: weather } = await useFetch<WeatherType>('/api/weather')
</script>

<template>
  <section>
    <UCard v-if="weather" :ui="{ base: 'h-full' }">
      <template #header>
        <div class="flex items-center gap-2 text-blue-600 dark:text-blue-300">
          <UIcon name="i-ph:cloud-duotone" size="24" />
          <h3 class="font-bold text-lg">
            Météo
          </h3>
        </div>
      </template>
      <template #default>
        <div class="flex items-center h-full">
          <p class="text-lg h-full">
            Il fait actuellement
            <span class="text-blue-600 dark:text-blue-300">{{ weather.weather }}</span>
            à
            <span>{{ weather.city }}</span>,
            avec une température de
            <span class="text-blue-600 dark:text-blue-300">{{ weather.temp }}
            </span>
            °C
          </p>
        </div>
      </template>
    </UCard>
  </section>
</template>
