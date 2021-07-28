<template>
  <jet-authentication-card>
    <template #logo>
      <jet-authentication-card-logo />
    </template>

    <div class="mb-4 text-sm text-gray-600">
      Forgot your password? No problem. Just let us know your email address and
      we will email you a password reset link that will allow you to choose a
      new one.
    </div>

    <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
      {{ status }}
    </div>

    <jet-validation-errors class="mb-4" />

    <form @submit.prevent="submit">
      <div>
        <jet-label for="email" value="Email" />
        <jet-input
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          required
          autofocus
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <jet-button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Email Password Reset Link
        </jet-button>
      </div>
    </form>
  </jet-authentication-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JetAuthenticationCard from "@/views/Jetstream/AuthenticationCard.vue";
import JetAuthenticationCardLogo from "@/views/Jetstream/AuthenticationCardLogo.vue";
import JetButton from "@/views/Jetstream/Button.vue";
import JetInput from "@/views/Jetstream/Input.vue";
import JetLabel from "@/views/Jetstream/Label.vue";
import JetValidationErrors from "@/views/Jetstream/ValidationErrors.vue";
import { useForm } from "@inertiajs/inertia-vue3";
import route from "ziggy-js";

export default defineComponent({
  components: {
    JetAuthenticationCard,
    JetAuthenticationCardLogo,
    JetButton,
    JetInput,
    JetLabel,
    JetValidationErrors,
  },

  props: {
    status: String,
  },
  setup() {
    const form = useForm({
      email: "",
    });
    return {
      form,
      submit() {
        form.post(route("password.email"));
      },
    };
  },
});
</script>
