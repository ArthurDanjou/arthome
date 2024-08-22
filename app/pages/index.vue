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
        <h1 class="font-bold text-black dark:text-white text-lg space-y-2">
          Welcome to ArtHome
        </h1>
      </template>
      <template #default>
        <p>
          ArtHome is a private platform. You need to request access to be able to use it by asking to
          <a
            class="duration-300 underline-offset-2 text-md text-black dark:text-white underline decoration-gray-300 dark:decoration-neutral-700 hover:decoration-black dark:hover:decoration-white"
            href="mailto:arthurdanjou@outlook.fr"
            rel="noopener"
            target="_blank"
          >Arthur Danjou</a>
        </p>
        <div v-if="!loggedIn" class="flex gap-2 mt-2">
          <UButton
            :external="true"
            color="black"
            icon="i-ph:github-logo-duotone"
            label="GitHub"
            to="/auth/github"
          />
          <UButton
            :external="true"
            color="red"
            icon="i-ph:google-logo-duotone"
            label="Google"
            to="/auth/google"
          />
        </div>
        <UButton
          v-if="authorized"
          color="black"
          icon="i-ph:house-duotone"
          label="Go Home"
          to="/home"
        />
        <p v-if="!authorized && loggedIn" class="text-red-500 font-medium">
          You're not authorized to access
        </p>
      </template>
      <template #footer>
        <p class="italic text-sm">
          No personal informations regarding your account are stored in database.
        </p>
      </template>
    </UCard>
  </div>
</template>
