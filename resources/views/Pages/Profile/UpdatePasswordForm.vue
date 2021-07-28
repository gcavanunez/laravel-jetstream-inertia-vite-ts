<template>
  <jet-form-section @submitted="updatePassword">
    <template #title> Update Password </template>

    <template #description>
      Ensure your account is using a long, random password to stay secure.
    </template>

    <template #form>
      <div class="col-span-6 sm:col-span-4">
        <jet-label for="current_password" value="Current Password" />
        <jet-input
          id="current_password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.current_password"
          ref="current_password"
          autocomplete="current-password"
        />
        <jet-input-error :message="form.errors.current_password" class="mt-2" />
      </div>

      <div class="col-span-6 sm:col-span-4">
        <jet-label for="password" value="New Password" />
        <jet-input
          id="password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          ref="password"
          autocomplete="new-password"
        />
        <jet-input-error :message="form.errors.password" class="mt-2" />
      </div>

      <div class="col-span-6 sm:col-span-4">
        <jet-label for="password_confirmation" value="Confirm Password" />
        <jet-input
          id="password_confirmation"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password_confirmation"
          autocomplete="new-password"
        />
        <jet-input-error
          :message="form.errors.password_confirmation"
          class="mt-2"
        />
      </div>
    </template>

    <template #actions>
      <jet-action-message :on="form.recentlySuccessful" class="mr-3">
        Saved.
      </jet-action-message>

      <jet-button
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
      >
        Save
      </jet-button>
    </template>
  </jet-form-section>
</template>

<script lang="ts">
import { ComponentPublicInstance, defineComponent, ref } from 'vue'
import JetActionMessage from '@/views/Jetstream/ActionMessage.vue'
import JetButton from '@/views/Jetstream/Button.vue'
import JetFormSection from '@/views/Jetstream/FormSection.vue'
import JetInput from '@/views/Jetstream/Input.vue'
import JetInputError from '@/views/Jetstream/InputError.vue'
import JetLabel from '@/views/Jetstream/Label.vue'
import { useForm } from '@inertiajs/inertia-vue3'
import route from 'ziggy-js'

export default defineComponent({
  components: {
    JetActionMessage,
    JetButton,
    JetFormSection,
    JetInput,
    JetInputError,
    JetLabel,
  },
  setup() {
    const form = useForm({
      current_password: '',
      password: '',
      password_confirmation: '',
    })
    const password = ref<HTMLInputElement>()
    const current_password = ref<HTMLInputElement>()

    return {
      form,

      updatePassword() {
        form.put(route('user-password.update'), {
          errorBag: 'updatePassword',
          preserveScroll: true,
          onSuccess: () => form.reset(),
          onError: () => {
            if (form.errors.password) {
              form.reset('password', 'password_confirmation')
              password.value!.focus()
            }

            if (form.errors.current_password) {
              form.reset('current_password')
              current_password.value!.focus()
            }
          },
        })
      },
    }
  },
})
</script>
