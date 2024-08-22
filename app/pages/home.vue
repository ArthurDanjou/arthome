<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})

const date = ref<Date>(new Date())
onMounted(() => {
  setInterval(() => date.value = new Date(), 1000)
})

const apps = await queryContent('/').find()
const nuxt = apps.filter(app => app._dir === 'nuxt')
const perso = apps.filter(app => app._dir === 'perso')
const maths = apps.filter(app => app._dir === 'maths')
const social = apps.filter(app => app._dir === 'social')
</script>

<template>
  <main class="my-8">
    <div v-if="date" class="flex flex-col items-center">
      <h1 class="text-6xl font-bold">
        {{ useDateFormat(date, 'HH:mm') }}
      </h1>
      <h1 class="text-2xl">
        {{ useDateFormat(date, 'dddd D MMMM YYYY', { locales: () => 'fr-FR' }) }}
      </h1>
    </div>
    <div v-if="apps" class="space-y-12">
      <Application :apps="perso" title="Personal" />
      <Application :apps="social" title="Social" />
      <Application :apps="nuxt" title="Nuxt" />
      <Application :apps="maths" title="Mathematics" />
    </div>
  </main>
</template>
