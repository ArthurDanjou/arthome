<script lang="ts" setup>
const config = useRuntimeConfig()

const coordinates = ref<[number, number]>([2.179040, 48.877419])
const zoom = ref(11)
</script>

<template>
  <ClientOnly>
    <UCard :ui="{ base: 'h-72 md:col-span-2', body: { padding: '' } }">
      <div class="relative">
        <MapboxMap
          :options="{
            accessToken: config.public.mapbox.accessToken,
            style: config.public.mapbox.style,
            center: coordinates,
            zoom,
            projection: 'globe',
          }"
          class="absolute h-72"
          map-id="map"
        >
          <MapboxDefaultMarker
            :lnglat="coordinates"
            :options="{
              color: '#808080',
              size: 1.5,
            }"
            marker-id="marker"
          />
        </MapboxMap>
      </div>
    </UCard>
  </ClientOnly>
</template>

<style>
.mapboxgl-control-container {
  display: none !important;
}

.mapboxgl-canvas {
  border-radius: 1rem;
}
</style>
