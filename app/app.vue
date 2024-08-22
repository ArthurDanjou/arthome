<script lang="ts" setup>
useHead({
  link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }],
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
  <div>
    <NuxtLoadingIndicator color="#808080" />
    <UContainer class="my-8">
      <div v-if="date" class="flex flex-col items-center">
        <h1 class="text-6xl font-bold">
          {{ useDateFormat(date, 'HH:mm') }}
        </h1>
        <h1 class="text-2xl">
          {{ useDateFormat(date, 'dddd D MMMM YYYY', { locales: () => 'fr-FR' }) }}
        </h1>
      </div>
      <div v-if="apps" class="space-y-12">
        <Application title="Personal" :apps="perso" />
        <Application title="Social" :apps="social" />
        <Application title="Nuxt" :apps="nuxt" />
        <Application title="Mathematics" :apps="maths" />
      </div>
    </UContainer>
  </div>
</template>

<style>
body {
  font-family: 'DM Sans', sans-serif;
  @apply h-full w-full text-neutral-700 dark:text-neutral-300;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
</style>
