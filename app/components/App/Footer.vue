<script setup lang="ts">
// todo: implement the footer
</script>

<template>
  <footer class="my-12 flex items-center justify-center gap-1">
    <h1 class="tracking-wide text-lg font-bold text-black dark:text-white">
      ArtHome
    </h1>
    <p>by</p>
    <UButton
      color="red"
      variant="link"
      to="https://twitter.com/ArthurDanj"
      icon="i-ph:x-logo-duotone"
      label="Arthur DANJOU"
      :padded="false"
      target="_blank"
    />
    <p>, made with</p>
    <UButton
      color="green"
      variant="link"
      to="https://nuxt.com/"
      icon="i-vscode-icons:file-type-nuxt"
      label="Nuxt"
      :padded="false"
      target="_blank"
    />
    <p>and</p>
    <UButton
      color="green"
      variant="link"
      to="https://hub.nuxt.com/"
      icon="i-vscode-icons:file-type-nuxt"
      label="NuxtHub"
      :padded="false"
      target="_blank"
    />
  </footer>
</template>

<style scoped>

</style>
