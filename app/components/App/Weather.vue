<script setup lang="ts">
import type { WeatherType } from '~~/types/types'

const { coords, error } = useGeolocation()

const { data, status, refresh, error: errorFe } = await useAsyncData<WeatherType>(async () => await useRequestFetch<WeatherType>()('/api/weather', {
  method: 'GET',
  query: {
    lon: coords.value.longitude,
    lat: coords.value.latitude,
  },
}), { lazy: true, immediate: false })

watchOnce(coords, async () => await refresh())

const getIcon = computed(() => {
  if (!data.value)
    return 'i-ph:cloud-fog-duotone'
  switch (data.value.weather.type.toLowerCase()) {
    case 'clouds':
      return 'i-ph:cloud-duotone'
    case 'rain':
      return 'i-ph:cloud-rain-duotone'
    case 'drizzle':
      return 'i-ph:cloud-snow-duotone'
    case 'clear':
      return 'i-ph:sun-duotone'
    case 'snow':
      return 'i-ph:cloud-snow-duotone'
    case 'thunderstorm':
      return 'i-ph:cloud-lightning-duotone'
    default:
      return 'i-ph:cloud-fog-duotone'
  }
})
</script>

<template>
  <ClientOnly>
    <UCard
      v-if="status === 'success' && !error"
      class="mt-12"
      :ui="{
        body: { base: 'h-full relative z-20' },
        background: 'h-full duration-300 bg-white dark:bg-gray-900',
      }"
    >
      <div class="flex gap-12 items-center h-full gap-4">
        <div class="flex items-center gap-2">
          <UBadge color="sky" class="p-2" variant="soft">
            <UIcon :name="getIcon" size="32" />
          </UBadge>
          <p class="text-sky-400 text-xl font-medium truncate">
            {{ data.weather.description.charAt(0).toUpperCase() + data.weather.description.slice(1) }} in {{ data.city.split(' ')[data.city.split(' ').length - 1] }}
          </p>
        </div>
        <div class="flex gap-2">
          <div class="flex gap-1">
            min. <span class="text-green-400">{{ data.temp.min }}</span>°C
          </div>
          <div class="flex gap-1">
            actual <span class="text-orange-400">{{ data.temp.feels_like }}</span> °C
          </div>
          <div class="flex gap-1">
            max.
            <span class="text-red-400">{{ data.temp.max }}</span>
            °C
          </div>
          <div class="flex gap-1">
            <span class="text-cyan-400">{{ data.wind }}</span>
            km/h
          </div>
          <div class="flex gap-1">
            rain
            <span class="text-blue-400">{{ data.temp.humidity }}</span>
            %
          </div>
        </div>
      </div>
    </UCard>
  </ClientOnly>
</template>
