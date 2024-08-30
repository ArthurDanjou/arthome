<script setup lang="ts">
const { user, loggedIn, clear } = useUserSession()
</script>

<template>
  <div>
    <div>
      User: {{ user }}
    </div>
    <div>
      LoggedIn: {{ loggedIn }}
    </div>
    <div @click="clear">
      clear
    </div>
  </div>
</template>

<style scoped>

</style>
