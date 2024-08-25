<script setup lang="ts">
import type { Tab } from '~~/server/utils/db'

defineProps<{
  tab: PropType<Tab>
}>()
</script>

<template>
  <div>
    Tab
    {{ tab }}
  </div>
</template>

<style scoped>

</style>
