<script lang="ts" setup>
const { loggedIn } = useUserSession()
const authorized = await isAuthorized()

onMounted(() => {
  if (authorized) {
    navigateTo('/home')
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <UCard class="w-full md:w-1/2">
      <template #header>
        <div class="flex justify-between items-center">
          <h3>Home by Arthur Danjou</h3>
          <UButton
            v-if="!loggedIn"
            :external="true"
            color="black"
            icon="i-ph:github-logo-duotone"
            label="Login with GitHub"
            to="/auth/github"
          />
          <UButton
            v-if="authorized"
            color="black"
            icon="i-ph:house-duotone"
            label="Go Home"
            to="/home"
          />
        </div>
      </template>
      <template #default>
        <h1 class="font-bold text-black dark:text-white text-lg">
          Welcome to ArtHome
        </h1>
        <p v-if="!authorized && loggedIn">
          You're not authorized to access
        </p>
        <p>
          ArtHome is a private platform. You need to request access to be able to use it by asking to
          <a
            class="duration-300 underline-offset-2 text-md text-black dark:text-white underline decoration-gray-300 dark:decoration-neutral-700 hover:decoration-black dark:hover:decoration-white"
            href="mailto:arthurdanjou@outlook.fr"
            rel="noopener"
            target="_blank"
          >Arthur Danjou</a>
        </p>
      </template>
      <template #footer>
        <p class="italic text-sm">
          No personal informations regarding your GitHub account are stored in database.
        </p>
      </template>
    </UCard>
  </div>
</template>
