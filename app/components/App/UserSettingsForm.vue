<script setup lang="ts">
import type { UpdateUserSchemaType } from '~~/types/types'
import { UpdateUserSchema, locales } from '~~/types/types'
import type { FormSubmitEvent } from '#ui/types'
import type { UserSession } from '#auth-utils'

const props = defineProps<{
  user: UserSession
}>()

const emit = defineEmits(['closeModal'])

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

const hasChanged = computed(() => {
  return (
    state.name !== props.user.name
    || state.username !== props.user.username
    || state.private !== props.user.private
    || state.description !== props.user.description
    || state.language !== locales.find(locale => locale.locale === props.user.language).locale
    || state.location !== props.user.location
  )
})

const loading = ref(false)
async function handleUpdate(event: FormSubmitEvent<UpdateUserSchemaType>) {
  loading.value = true
  await updateUser({
    username: event.data.username,
    name: event.data.name,
    description: event.data.description,
    location: event.data.location,
    language: event.data.language,
    private: event.data.private,
  })
  loading.value = false
}

const { user } = useUserSession()
defineShortcuts({
  escape: () => emit('closeModal'),
})
</script>

<template>
  <div class="flex flex-col md:flex-row gap-4">
    <div class="md:w-1/2 flex flex-col justify-between gap-4">
      <div class="md:mt-32 flex flex-col items-center space-y-4">
        <AppAvatar size="5xl" :src="user.avatar" />
        <h1 class="text-4xl font-bold">
          {{ user.name }}
        </h1>
        <p class="text-center">
          {{ user.description }}
        </p>
        <div class="flex items-center gap-2">
          <UIcon name="i-ph:map-pin-area-duotone" />
          <p>{{ user.location }}</p>
        </div>
      </div>

      <UButton
        class="hidden md:flex"
        color="red"
        variant="solid"
        icon="i-ph:trash-duotone"
        block
        label="Delete account"
      />
    </div>
    <UForm class="space-y-4 md:w-1/2" :schema="UpdateUserSchema" :state="state" @submit="handleUpdate">
      <UFormGroup label="Username" name="username">
        <UInput v-model="state.username" type="text" />
      </UFormGroup>

      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" type="text" />
      </UFormGroup>

      <UFormGroup label="Avatar" name="avatar" hint="Max size: 4MB">
        <UInput type="file" size="sm" accept="image/*" hidden @change="uploadAvatar" />
        <UButton
          v-if="user?.avatar"
          variant="outline"
          color="red"
          class="mt-2"
          label="Delete avatar"
          size="xs"
          @click.prevent="deleteAvatar"
        />
      </UFormGroup>

      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" type="text" disabled />
      </UFormGroup>

      <UFormGroup label="Description" name="description">
        <UTextarea v-model="state.description" autoresize :maxrows="4" />
      </UFormGroup>

      <UFormGroup label="Language" name="language">
        <USelect v-model="state.language" :options="locales" option-attribute="label" value-attribute="locale" />
      </UFormGroup>

      <UFormGroup label="Location" name="location">
        <UInput v-model="state.location" type="text" />
      </UFormGroup>

      <UFormGroup name="private" :label="state.private ? 'Your page is private' : 'Your page is public'">
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
        :disabled="!hasChanged"
        :loading="loading"
        type="submit"
        :color="hasChanged ? 'green' : 'gray'"
        label="Update Profile"
      />
    </UForm>

    <UButton
      class="md:hidden"
      color="red"
      variant="solid"
      icon="i-ph:trash-duotone"
      block
      label="Delete account"
    />
  </div>
</template>

<style scoped>

</style>
