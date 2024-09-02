<script setup lang="ts">
import type { UpdateUserSchemaType } from '~~/types/types'
import { UpdateUserSchema, locales } from '~~/types/types'
import type { FormSubmitEvent } from '#ui/types'
import type { UserSession } from '#auth-utils'

const props = defineProps<{
  user: UserSession
}>()

const state = reactive({
  name: undefined,
  username: undefined,
  email: undefined,
  private: undefined,
  description: undefined,
  language: locales[0],
  location: undefined,
})

watchEffect(() => {
  state.name = props.user.name
  state.username = props.user.username
  state.private = props.user.private
  state.description = props.user.description
  state.language = locales.find(locale => locale.locale === props.user.language).locale
  state.location = props.user.location
  state.email = props.user.email
})

const { deleteAvatar, uploadAvatar, updateUser } = await useUser()

async function handleUpdate(event: FormSubmitEvent<UpdateUserSchemaType>) {
  await updateUser({
    username: event.data.username,
    name: event.data.name,
    description: event.data.description,
    location: event.data.location,
    language: event.data.language,
    private: event.data.private,
  })
}
</script>

<template>
  <UForm :schema="UpdateUserSchema" :state="state" class="space-y-4 p-1" @submit="handleUpdate">
    <UFormGroup label="Username" name="username">
      <UInput v-model="state.username" type="text" />
    </UFormGroup>

    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" type="text" />
    </UFormGroup>

    <UFormGroup label="Avatar" name="avatar">
      <UInput type="file" size="sm" accept="image/*" hidden @change="uploadAvatar" />
    </UFormGroup>

    <UButton
      v-if="user?.avatar"
      variant="outline"
      color="red"
      label="Delete avatar"
      size="xs"
      @click.prevent="deleteAvatar"
    />

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" type="text" disabled />
    </UFormGroup>

    <UFormGroup label="Description" name="description">
      <UTextarea v-model="state.description" autoresize :rows="2" />
    </UFormGroup>

    <UFormGroup label="Language" name="language">
      <USelect v-model="state.language" :options="locales" option-attribute="label" value-attribute="locale" />
    </UFormGroup>

    <UFormGroup label="Location" name="location">
      <UInput v-model="state.location" type="text" />
    </UFormGroup>

    <UFormGroup label="Page private" name="private" :description="state.private ? 'Your page is private' : 'Your page is public'">
      <UToggle
        v-model="state.private"
        on-icon="i-ph:lock-key-duotone"
        off-icon="i-ph:users-four-duotone"
        :model-value="state.private"
        size="lg"
        color="red"
      />
    </UFormGroup>

    <UButton
      type="submit"
      block
      color="gray"
      label="Update Profile"
    />
  </UForm>
</template>

<style scoped>

</style>
