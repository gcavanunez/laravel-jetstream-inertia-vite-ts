<template>
  <jet-authentication-card>
    <template #logo>
      <jet-authentication-card-logo />
    </template>

    <div class="mb-4 text-sm text-gray-600">
      <template v-if="!recovery">
        Please confirm access to your account by entering the authentication
        code provided by your authenticator application.
      </template>

      <template v-else>
        Please confirm access to your account by entering one of your emergency
        recovery codes.
      </template>
    </div>

    <jet-validation-errors class="mb-4" />

    <form @submit.prevent="submit">
      <div v-if="!recovery">
        <jet-label for="code" value="Code" />
        <jet-input
          ref="code"
          id="code"
          type="text"
          inputmode="numeric"
          class="mt-1 block w-full"
          v-model="form.code"
          autofocus
          autocomplete="one-time-code"
        />
      </div>

      <div v-else>
        <jet-label for="recovery_code" value="Recovery Code" />
        <jet-input
          ref="recovery_code"
          id="recovery_code"
          type="text"
          class="mt-1 block w-full"
          v-model="form.recovery_code"
          autocomplete="one-time-code"
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <button
          type="button"
          class="
            text-sm text-gray-600
            hover:text-gray-900
            underline
            cursor-pointer
          "
          @click.prevent="toggleRecovery"
        >
          <template v-if="!recovery"> Use a recovery code </template>

          <template v-else> Use an authentication code </template>
        </button>

        <jet-button
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Log in
        </jet-button>
      </div>
    </form>
  </jet-authentication-card>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, ComponentPublicInstance } from 'vue'
import JetAuthenticationCard from '@/views/Jetstream/AuthenticationCard.vue'
import JetAuthenticationCardLogo from '@/views/Jetstream/AuthenticationCardLogo.vue'
import JetButton from '@/views/Jetstream/Button.vue'
import JetInput from '@/views/Jetstream/Input.vue'
import JetLabel from '@/views/Jetstream/Label.vue'
import JetValidationErrors from '@/views/Jetstream/ValidationErrors.vue'
import { useForm } from '@inertiajs/inertia-vue3'
import route from 'ziggy-js'

export default defineComponent({
  components: {
    JetAuthenticationCard,
    JetAuthenticationCardLogo,
    JetButton,
    JetInput,
    JetLabel,
    JetValidationErrors,
  },

  setup() {
    const recovery_code = ref<HTMLInputElement>()
    const code = ref<HTMLInputElement>()

    const recovery = ref(false)
    const form = useForm({
      code: '',
      recovery_code: '',
    })
    return {
      recovery_code,
      code,
      form,
      submit() {
        form.post(route('two-factor.login'))
      },
      toggleRecovery() {
        recovery.value = true
        nextTick(() => {
          if (recovery.value) {
            recovery_code.value!.focus()
            form.code = ''
          } else {
            code.value!.focus()
            form.recovery_code = ''
          }
        })
      },
    }
  },
})
</script>
