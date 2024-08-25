<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})

const date = ref<Date>(new Date())
onMounted(() => {
  setInterval(() => date.value = new Date(), 1000)
})

const { user, session } = useUserSession()

const { getCategories } = useCategories()
const categories = await getCategories()
</script>

<template>
  <main v-if="user" class="my-12">
    <div v-if="date" class="flex flex-col items-center">
      <h1 class="text-6xl md:text-9xl font-bold">
        {{ useDateFormat(date, 'HH') }}
        <span class="animate-pulse">:</span>
        {{ useDateFormat(date, 'mm') }}
      </h1>
      <h1 class="text-2xl md:text-5xl">
        {{ useDateFormat(date, 'dddd D MMMM YYYY', { locales: user.language }) }}
      </h1>
    </div>
    <div>
      {{ user }}
    </div>
    <div>
      {{ session }}
    </div>
    <div>
      {{ user === session.user }}
    </div>
    <div v-if="categories">
      {{ categories }}
    </div>
    <div>
      <Category>
        <Tab
          :tab="{
            name: 'Test',
            nameVisible: true,
            icon: 'i-ph:cloud-duotone',
            color: 'blue',
          }"
        />
      </Category>
    </div>
  </main>
</template>
