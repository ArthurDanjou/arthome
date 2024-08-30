<script lang="ts" setup>
import { z } from 'zod'
import { useSession } from 'h3'
import type { FormSubmitEvent } from '#ui/types'

const { loggedIn } = useUserSession()

definePageMeta({
  middleware: 'ghost',
  layout: 'login',
})

const schema = z.object({
  email: z.string().email('Invalid email'),
})

type Schema = z.output<typeof schema>
const state = reactive({ email: undefined })

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  // todo: add login logic
  console.log(event.data)
  state.email = ''
}

const message = useState<string>('message')
if (import.meta.server) {
  const session = await useSession(useRequestEvent()!, {
    password: useRuntimeConfig().session.password,
  })

  message.value = session.data.message

  await session.update({
    message: '',
  })
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <h1 class="tracking-widest text-4xl font-bold text-black dark:text-white mb-12">
      ArtHome
    </h1>
    <div class="w-full md:w-1/3">
      <UAlert
        v-if="message"
        class="mb-8"
        color="red"
        variant="outline"
        :close-button="{ icon: 'i-ph:x-circle-duotone', color: 'red', variant: 'link', padded: false }"
        :description="message"
        @close="message = ''"
      />
    </div>
    <UCard class="w-full md:w-1/3 mt-2">
      <template #header>
        <h1 class="text-center font-bold text-black dark:text-white text-lg py-2">
          Sign in to your ArtHome account
        </h1>
      </template>
      <template #default>
        <div v-if="!loggedIn" class="flex flex-col gap-4 p-4">
          <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup name="email">
              <UInput v-model="state.email" color="gray" placeholder="arthur@arthome.com" />
            </UFormGroup>
            <UButton
              :external="true"
              color="gray"
              icon="i-ph:envelope-duotone"
              label="Continue with Email"
              block
              type="submit"
            />
          </UForm>
          <UDivider label="or" />
          <UButton
            :external="true"
            color="gray"
            icon="i-ph:github-logo-duotone"
            label="Continue with GitHub"
            block
            to="/auth/github"
          />
          <UButton
            :external="true"
            color="gray"
            icon="i-ph:google-logo-duotone"
            label="Continue With Google"
            block
            to="/auth/google"
          />
        </div>
      </template>
      <template #footer>
        <p class="italic text-xs">
          We only store your email address, name and profile picture. We will never share your data with third parties.
        </p>
      </template>
    </UCard>
  </div>
</template>
