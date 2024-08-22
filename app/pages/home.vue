<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})

const date = ref<Date>(new Date())
onMounted(() => {
  setInterval(() => date.value = new Date(), 1000)
})

const apps = await queryContent('/').find()
const dev = apps.filter(app => app._dir === 'dev')
const perso = apps.filter(app => app._dir === 'perso')
const maths = apps.filter(app => app._dir === 'maths')
const social = apps.filter(app => app._dir === 'social')
</script>

<template>
  <main class="my-12">
    <div v-if="date" class="flex flex-col items-center">
      <h1 class="text-6xl md:text-9xl font-bold">
        {{ useDateFormat(date, 'HH') }}
        <span class="animate-pulse">:</span>
        {{ useDateFormat(date, 'mm') }}
      </h1>
      <h1 class="text-2xl md:text-5xl">
        {{ useDateFormat(date, 'dddd D MMMM YYYY', { locales: () => 'fr-FR' }) }}
      </h1>
    </div>
    <div v-if="apps" class="space-y-12 mt-12">
      <section class="grid grid-cols-1 auto-rows-auto sm:grid-cols-3 gap-4">
        <Weather />
        <Map />
      </section>
      <Application :apps="perso" title="Personnel" />
      <Application :apps="social" title="Social" />
      <Application :apps="dev" title="Développement" />
      <Application :apps="maths" title="Mathématiques" />
    </div>
  </main>
</template>
