<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <section>
    {{ router.currentRoute.value.params.user }}
  </section>
</template>

<style scoped>

</style>
